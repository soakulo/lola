import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { navigate } from '../../store/uiSlice';
import { AppScreen } from '../../types';
import {
  HandDrawnHomeIcon,
  HandDrawnBookIcon,
  HandDrawnFlaskIcon,
  HandDrawnCatIcon,
  HandDrawnProfileIcon,
} from '../common/GraphicAssets';

export const TabBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentScreen = useAppSelector((state) => state.ui.currentScreen);

  const tabs: Array<{
    id: AppScreen;
    label: string;
    icon: React.FC<{ className?: string; active?: boolean }>;
  }> = [
    { id: 'home', label: 'Главная', icon: HandDrawnHomeIcon },
    { id: 'study', label: 'Учёба', icon: HandDrawnBookIcon },
    { id: 'practice', label: 'Практика', icon: HandDrawnFlaskIcon },
    { id: 'lola', label: 'Лола', icon: HandDrawnCatIcon },
    { id: 'profile', label: 'Профиль', icon: HandDrawnProfileIcon },
  ];

  return (
    <nav
      id="bottom-tab-bar"
      className="w-full bg-white/95 backdrop-blur-md border-t border-neutral-100 px-1 py-1.5 flex items-center justify-around select-none shrink-0"
    >
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        const IconComponent = tab.icon;

        return (
          <button
            key={tab.id}
            id={`tab-btn-${tab.id}`}
            onClick={() => dispatch(navigate(tab.id))}
            className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2.5 rounded-xl transition-all duration-150 cursor-pointer min-w-0 ${
              isActive ? 'text-[#1D4ED8]' : 'text-neutral-400 hover:text-neutral-700'
            }`}
          >
            <div className="relative">
              <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" active={isActive} />
              {tab.id === 'lola' && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse ring-2 ring-white" />
              )}
            </div>
            <span
              className={`text-[10px] mt-0.5 leading-tight font-medium tracking-tight whitespace-nowrap transition-all duration-150 ${
                isActive ? 'text-[#1D4ED8] font-extrabold' : 'text-neutral-500'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

