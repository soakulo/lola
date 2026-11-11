import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { StudentProfile, QuestionnaireFormData, TargetScore, ExamType, ChemistryLevel, StudyPace } from '../types';
import { FirebaseAuthService } from '../services/firebaseAuth';

interface AuthState {
  user: StudentProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  questionnaireStep: number;
  questionnaireDraft: Partial<QuestionnaireFormData>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  questionnaireStep: 0,
  questionnaireDraft: {
    examType: 'OGE',
    targetScore: '5_EXCELLENT',
    currentLevel: 'BASIC',
    studyPace: 'RECOMMENDED',
    name: '',
    email: '',
  },
};

export const initializeAuthSession = createAsyncThunk(
  'auth/initialize',
  async () => {
    const user = await FirebaseAuthService.getStoredSession();
    return user;
  }
);

export const registerWithQuestionnaire = createAsyncThunk(
  'auth/registerWithQuestionnaire',
  async (formData: QuestionnaireFormData, { rejectWithValue }) => {
    try {
      const user = await FirebaseAuthService.signUpWithQuestionnaire(formData);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка при регистрации');
    }
  }
);

export const loginStudent = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password?: string }, { rejectWithValue }) => {
    try {
      const user = await FirebaseAuthService.signIn(email, password);
      return user;
    } catch (err: any) {
      return rejectWithValue(err.message || 'Ошибка входа');
    }
  }
);

export const logoutStudent = createAsyncThunk(
  'auth/logout',
  async () => {
    await FirebaseAuthService.signOut();
    return null;
  }
);

export const updateStudentProfile = createAsyncThunk(
  'auth/updateProfile',
  async (updates: Partial<StudentProfile>, { getState }) => {
    const state = getState() as { auth: AuthState };
    if (!state.auth.user) throw new Error('No user to update');
    const updatedUser: StudentProfile = {
      ...state.auth.user,
      ...updates,
    };
    await FirebaseAuthService.saveProfile(updatedUser);
    return updatedUser;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setQuestionnaireStep: (state, action: PayloadAction<number>) => {
      state.questionnaireStep = action.payload;
    },
    updateQuestionnaireDraft: (state, action: PayloadAction<Partial<QuestionnaireFormData>>) => {
      state.questionnaireDraft = {
        ...state.questionnaireDraft,
        ...action.payload,
      };
    },
    resetQuestionnaire: (state) => {
      state.questionnaireStep = 0;
      state.questionnaireDraft = {
        examType: 'OGE',
        targetScore: '5_EXCELLENT',
        currentLevel: 'BASIC',
        studyPace: 'RECOMMENDED',
        name: '',
        email: '',
      };
    },
    incrementStreak: (state) => {
      if (state.user) {
        state.user.progress.streakDays += 1;
        FirebaseAuthService.saveProfile(state.user);
      }
    },
    addWorkoutCompletion: (state, action: PayloadAction<{ scorePercent: number; xpEarned: number }>) => {
      if (state.user) {
        state.user.progress.completedTasksCount += 15;
        state.user.progress.experiencePoints += action.payload.xpEarned;
        // bump overall percentage slightly
        if (state.user.progress.overallPercentage < 100) {
          state.user.progress.overallPercentage = Math.min(100, state.user.progress.overallPercentage + 2);
        }
        // bump inorganic chemistry progress
        if (state.user.progress.topics.inorganicChemistry < 100) {
          state.user.progress.topics.inorganicChemistry = Math.min(100, state.user.progress.topics.inorganicChemistry + 5);
        }
        FirebaseAuthService.saveProfile(state.user);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Init
      .addCase(initializeAuthSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initializeAuthSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(initializeAuthSession.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      // Register
      .addCase(registerWithQuestionnaire.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerWithQuestionnaire.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.questionnaireStep = 0;
      })
      .addCase(registerWithQuestionnaire.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Login
      .addCase(loginStudent.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logoutStudent.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      // Update Profile
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const {
  setQuestionnaireStep,
  updateQuestionnaireDraft,
  resetQuestionnaire,
  incrementStreak,
  addWorkoutCompletion,
} = authSlice.actions;

export default authSlice.reducer;
