import { AsyncStorage } from './asyncStorage';
import { StudentProfile, QuestionnaireFormData, ExamType, TargetScore, ChemistryLevel, StudyPace } from '../types';

const SESSION_KEY = 'user_session';
const REGISTERED_USERS_KEY = 'registered_users_db';

const DEFAULT_MOCK_USER: StudentProfile = {
  uid: 'user_lola_demo_1',
  name: 'Лола',
  email: 'lola.student@mail.ru',
  grade: '11 класс',
  examType: 'EGE',
  targetScore: 'SCORE_85_100',
  targetScoreLabel: '90+ баллов (Топ ВУЗ)',
  currentLevel: 'INTERMEDIATE',
  studyPace: 'RECOMMENDED',
  avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&auto=format&fit=crop&q=80',
  progress: {
    overallPercentage: 72,
    topics: {
      atomicStructure: 85,
      organicChemistry: 75,
      inorganicChemistry: 60,
      chemicalCalculations: 40,
    },
    streakDays: 6,
    completedLessonsCount: 28,
    completedTasksCount: 142,
    experiencePoints: 1250,
  },
  joinedDate: 'Октябрь 2024',
  notificationsEnabled: true,
};

export const FirebaseAuthService = {
  async getStoredSession(): Promise<StudentProfile | null> {
    const session = await AsyncStorage.getObject<StudentProfile>(SESSION_KEY);
    if (!session) {
      // By default save demo user if nothing exists yet
      await AsyncStorage.setObject(SESSION_KEY, DEFAULT_MOCK_USER);
      return DEFAULT_MOCK_USER;
    }
    return session;
  },

  async signUpWithQuestionnaire(formData: QuestionnaireFormData): Promise<StudentProfile> {
    const uid = 'usr_' + Date.now();
    
    // Determine readable label for target score
    let targetScoreLabel = '5 (отлично)';
    if (formData.targetScore === '5_EXCELLENT') targetScoreLabel = '5 (отлично) ⭐️';
    else if (formData.targetScore === '4_GOOD') targetScoreLabel = '4 (хорошо)';
    else if (formData.targetScore === '3_SATISFACTORY') targetScoreLabel = '3 (удовлетворительно)';
    else if (formData.targetScore === 'SCORE_85_100') targetScoreLabel = '85–100 баллов (Топ ВУЗ)';
    else if (formData.targetScore === 'SCORE_70_85') targetScoreLabel = '70–85 баллов';
    else if (formData.targetScore === 'SCORE_60_70') targetScoreLabel = '60–70 баллов';

    let gradeText = '9 класс (ОГЭ)';
    if (formData.examType === 'EGE') gradeText = '11 класс (ЕГЭ)';
    else if (formData.examType === 'GRADE_10') gradeText = '10 класс';
    else if (formData.examType === 'GRADE_8') gradeText = '8 класс';

    let overallPercentage = formData.currentLevel === 'BEGINNER' ? 15 : formData.currentLevel === 'BASIC' ? 45 : 72;
    let atomicStructure = formData.currentLevel === 'BEGINNER' ? 30 : 85;
    let organicChemistry = formData.currentLevel === 'BEGINNER' ? 10 : 75;
    let inorganicChemistry = formData.currentLevel === 'BEGINNER' ? 20 : 60;
    let chemicalCalculations = formData.currentLevel === 'BEGINNER' ? 10 : 40;

    if (formData.diagnosticReport) {
      overallPercentage = formData.diagnosticReport.percentage;
      atomicStructure = formData.diagnosticReport.blocks.THEORY?.percentage ?? atomicStructure;
      inorganicChemistry = formData.diagnosticReport.blocks.INORGANIC?.percentage ?? inorganicChemistry;
      organicChemistry = formData.diagnosticReport.blocks.ORGANIC?.percentage ?? organicChemistry;
      chemicalCalculations = formData.diagnosticReport.blocks.CALCULATIONS?.percentage ?? chemicalCalculations;
    }

    const newUser: StudentProfile = {
      uid,
      name: formData.name.trim() || 'Ученик',
      email: formData.email.trim().toLowerCase(),
      grade: gradeText,
      examType: formData.examType,
      targetScore: formData.targetScore,
      targetScoreLabel,
      currentLevel: formData.diagnosticReport?.recommendedLevel || formData.currentLevel,
      studyPace: formData.studyPace,
      avatarUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=150&auto=format&fit=crop&q=80',
      progress: {
        overallPercentage,
        topics: {
          atomicStructure,
          organicChemistry,
          inorganicChemistry,
          chemicalCalculations,
        },
        streakDays: 1,
        completedLessonsCount: 1,
        completedTasksCount: 0,
        experiencePoints: formData.diagnosticReport ? 150 : 100,
      },
      joinedDate: 'Новый студент',
      notificationsEnabled: true,
      diagnosticReport: formData.diagnosticReport,
    };

    // Save into users list
    const users = (await AsyncStorage.getObject<Record<string, any>>(REGISTERED_USERS_KEY)) || {};
    users[newUser.email] = {
      profile: newUser,
      password: formData.password || '123456',
    };
    await AsyncStorage.setObject(REGISTERED_USERS_KEY, users);

    // Save active session
    await AsyncStorage.setObject(SESSION_KEY, newUser);
    return newUser;
  },

  async signIn(email: string, password?: string): Promise<StudentProfile> {
    const cleanEmail = email.trim().toLowerCase();
    const users = (await AsyncStorage.getObject<Record<string, any>>(REGISTERED_USERS_KEY)) || {};

    if (users[cleanEmail]) {
      const user = users[cleanEmail].profile;
      await AsyncStorage.setObject(SESSION_KEY, user);
      return user;
    }

    // If logging in as Lola or demo
    if (cleanEmail === 'lola.student@mail.ru' || cleanEmail === 'lola') {
      await AsyncStorage.setObject(SESSION_KEY, DEFAULT_MOCK_USER);
      return DEFAULT_MOCK_USER;
    }

    // Auto-generate profile for any new credentials
    const createdUser: StudentProfile = {
      ...DEFAULT_MOCK_USER,
      uid: 'usr_' + Date.now(),
      email: cleanEmail,
      name: cleanEmail.split('@')[0],
    };
    await AsyncStorage.setObject(SESSION_KEY, createdUser);
    return createdUser;
  },

  async signOut(): Promise<void> {
    await AsyncStorage.removeItem(SESSION_KEY);
  },

  async saveProfile(profile: StudentProfile): Promise<void> {
    await AsyncStorage.setObject(SESSION_KEY, profile);
    const users = (await AsyncStorage.getObject<Record<string, any>>(REGISTERED_USERS_KEY)) || {};
    if (profile.email) {
      users[profile.email] = {
        ...(users[profile.email] || {}),
        profile,
      };
      await AsyncStorage.setObject(REGISTERED_USERS_KEY, users);
    }
  },
};
