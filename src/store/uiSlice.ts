import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppScreen } from '../types';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'streak' | 'lesson' | 'tip';
}

interface UIState {
  currentScreen: AppScreen;
  screenHistory: AppScreen[];
  activeWorkoutModalOpen: boolean;
  selectedTopicId: string | null;
  notifications: NotificationItem[];
  notificationsOpen: boolean;
  toastMessage: string | null;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Тренировка ждет тебя! 🔥',
    message: 'Лола подготовила 15 заданий по теме ОВР. Твой ударный режим не должен прерываться!',
    time: '15 мин назад',
    read: false,
    type: 'streak',
  },
  {
    id: 'n2',
    title: 'Новый разбор задачи 🧪',
    message: 'Посмотри короткий видео-разбор нахождения степени окисления хрома в дихроматах.',
    time: '2 часа назад',
    read: false,
    type: 'lesson',
  },
  {
    id: 'n3',
    title: 'Совет от Лолы ✨',
    message: 'Запомни: Восстановитель — тот, кто окисляется, отдавая электроны!',
    time: 'Вчера',
    read: true,
    type: 'tip',
  },
];

const initialState: UIState = {
  currentScreen: 'home',
  screenHistory: ['home'],
  activeWorkoutModalOpen: false,
  selectedTopicId: null,
  notifications: INITIAL_NOTIFICATIONS,
  notificationsOpen: false,
  toastMessage: null,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<AppScreen>) => {
      if (state.currentScreen !== action.payload) {
        state.screenHistory.push(action.payload);
        state.currentScreen = action.payload;
      }
      state.notificationsOpen = false;
    },
    goBack: (state) => {
      if (state.screenHistory.length > 1) {
        state.screenHistory.pop();
        const prev = state.screenHistory[state.screenHistory.length - 1];
        state.currentScreen = prev;
      } else {
        state.currentScreen = 'home';
      }
    },
    setWorkoutModalOpen: (state, action: PayloadAction<boolean>) => {
      state.activeWorkoutModalOpen = action.payload;
    },
    setSelectedTopicId: (state, action: PayloadAction<string | null>) => {
      state.selectedTopicId = action.payload;
    },
    toggleNotifications: (state) => {
      state.notificationsOpen = !state.notificationsOpen;
    },
    markAllNotificationsRead: (state) => {
      state.notifications.forEach((n) => (n.read = true));
    },
    showToast: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    clearToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const {
  navigate,
  goBack,
  setWorkoutModalOpen,
  setSelectedTopicId,
  toggleNotifications,
  markAllNotificationsRead,
  showToast,
  clearToast,
} = uiSlice.actions;

export default uiSlice.reducer;
