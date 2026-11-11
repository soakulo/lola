import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store';
import { initializeAuthSession } from './store/authSlice';
import { clearToast } from './store/uiSlice';
import { DeviceFrame } from './components/common/DeviceFrame';
import { TabBar } from './components/navigation/TabBar';
import { HomeScreen } from './components/home/HomeScreen';
import { QuestionnaireScreen } from './components/auth/QuestionnaireScreen';
import { AuthScreen } from './components/auth/AuthScreen';
import { ProfileScreen } from './components/profile/ProfileScreen';
import { StudyScreen } from './components/study/StudyScreen';
import { PracticeScreen } from './components/practice/PracticeScreen';
import { LolaChatScreen } from './components/lola/LolaChatScreen';
import { PlanScreen } from './components/plan/PlanScreen';
import { AnalyticsScreen } from './components/analytics/AnalyticsScreen';
import { WorkoutModal } from './components/workout/WorkoutModal';

const AppNavigator: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const toastMessage = useAppSelector((state) => state.ui.toastMessage);

  useEffect(() => {
    dispatch(initializeAuthSession());
  }, [dispatch]);

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage, dispatch]);

  const showTabBar =
    currentScreen !== 'auth' &&
    currentScreen !== 'questionnaire';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'questionnaire':
        return <QuestionnaireScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'study':
        return <StudyScreen />;
      case 'practice':
        return <PracticeScreen />;
      case 'lola':
        return <LolaChatScreen />;
      case 'plan':
        return <PlanScreen />;
      case 'analytics':
        return <AnalyticsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <DeviceFrame>
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Active Screen - independently scrollable area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col">
          {renderScreen()}
        </main>

        {/* Bottom Tab Bar - docked at bottom of mobile view */}
        {showTabBar && (
          <div className="shrink-0 z-40">
            <TabBar />
          </div>
        )}

        {/* Global Today's Workout Modal */}
        <WorkoutModal />

        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-14 left-1/2 transform -translate-x-1/2 z-50 bg-[#1D4ED8] text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-lg border border-blue-400 flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
