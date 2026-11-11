import React from 'react';
import { ArrowUpRight, Flame, Sparkles, CheckCircle2, ChevronRight, Play, SlidersHorizontal } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { navigate, setWorkoutModalOpen, setSelectedTopicId } from '../../store/uiSlice';
import { Header } from '../navigation/Header';
import {
  BeakerIllustration,
  MoleculeIllustration,
  NotebookIllustration,
  AnalyticsIllustration,
  LolaMascotAvatar,
} from '../common/GraphicAssets';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const topics = useAppSelector((state) => state.curriculum.topics);
  const todayWorkout = useAppSelector((state) => state.curriculum.todayWorkout);

  const overallPercent = user?.progress?.overallPercentage ?? 72;
  const atomicPercent = user?.progress?.topics?.atomicStructure ?? 85;
  const organicPercent = user?.progress?.topics?.organicChemistry ?? 75;
  const inorganicPercent = user?.progress?.topics?.inorganicChemistry ?? 60;
  const calculationsPercent = user?.progress?.topics?.chemicalCalculations ?? 40;

  // SVG circular gauge calculation
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallPercent / 100) * circumference;

  return (
    <div className="relative min-h-full flex flex-col justify-between overflow-x-hidden bg-[#FAF7F2] pb-6 font-['Nunito',sans-serif]">
      {/* Background soft ambient accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
        <div className="absolute -left-12 top-20 w-44 h-44 rounded-full bg-[#1846C7]/10 filter blur-2xl" />
        <div className="absolute -right-8 top-56 w-48 h-48 rounded-full bg-[#1D4ED8]/10 filter blur-2xl" />
        <div className="absolute left-1/3 bottom-24 w-36 h-36 rounded-full bg-amber-400/10 filter blur-xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex flex-col px-4 pt-2">
        {/* Header */}
        <Header />

        <div className="space-y-4 pb-2">
          {/* 1. "Твой уровень" (Your Level) Card */}
          <section
            id="card-student-level"
            className="w-full bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-neutral-100 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-extrabold text-neutral-900 tracking-tight">
                Твой уровень подготовки
              </h2>
              <span className="text-xs font-bold text-[#1D4ED8] bg-blue-50 px-2.5 py-1 rounded-full">
                {user?.examType === 'EGE' ? 'ЕГЭ 11 класс' : 'ОГЭ 9 класс'}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {/* Circular Progress Gauge */}
              <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 88 88">
                  {/* Track circle */}
                  <circle
                    cx="44"
                    cy="44"
                    r={radius}
                    className="stroke-neutral-100"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="44"
                    cy="44"
                    r={radius}
                    stroke="#1D4ED8"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-700 ease-out"
                  />
                </svg>
                {/* Center Percentage */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xl font-extrabold text-neutral-900 tracking-tight">
                    {overallPercent}%
                  </span>
                  <span className="text-[10px] text-neutral-400 font-semibold">готовность</span>
                </div>
              </div>

              {/* Progress bars list */}
              <div className="flex-1 space-y-2 min-w-0">
                {/* Row 1: Строение атома */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-0.5">
                    <span className="text-neutral-700 truncate pr-1">Строение атома</span>
                    <span className="text-[#1D4ED8] shrink-0">{atomicPercent}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500"
                      style={{ width: `${atomicPercent}%` }}
                    />
                  </div>
                </div>

                {/* Row 2: Органическая химия */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-0.5">
                    <span className="text-neutral-700 truncate pr-1">Органическая химия</span>
                    <span className="text-[#1D4ED8] shrink-0">{organicPercent}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500"
                      style={{ width: `${organicPercent}%` }}
                    />
                  </div>
                </div>

                {/* Row 3: Неорганическая химия */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-0.5">
                    <span className="text-neutral-700 truncate pr-1">Неорганическая химия</span>
                    <span className="text-[#1D4ED8] shrink-0">{inorganicPercent}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500"
                      style={{ width: `${inorganicPercent}%` }}
                    />
                  </div>
                </div>

                {/* Row 4: Химические расчеты */}
                <div>
                  <div className="flex justify-between items-center text-xs font-bold mb-0.5">
                    <span className="text-neutral-700 truncate pr-1">Химические расчеты</span>
                    <span className="text-amber-600 shrink-0">{calculationsPercent}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${calculationsPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. "Твоя тренировка на сегодня" Card */}
          <section
            id="card-today-workout"
            className="w-full bg-gradient-to-br from-white to-blue-50/40 rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-blue-100/80 flex flex-col justify-between"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Тренировка на сегодня</span>
                </div>
                <h3 className="text-lg font-extrabold text-neutral-900 tracking-tight leading-snug">
                  {todayWorkout.title}
                </h3>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  {todayWorkout.questionsCount} заданий • ~{todayWorkout.estimatedMinutes} мин • Экспресс-тест
                </p>
              </div>

              <div className="w-10 h-10 rounded-2xl bg-blue-100/70 text-[#1D4ED8] flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 text-orange-500" />
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-blue-100/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LolaMascotAvatar size={28} />
                <span className="text-xs font-semibold text-neutral-600">
                  Лола готова проверить ответы!
                </span>
              </div>

              <button
                id="btn-start-daily-workout"
                onClick={() => dispatch(setWorkoutModalOpen(true))}
                className="bg-[#1D4ED8] hover:bg-blue-700 text-white px-5 py-2.5 rounded-2xl font-bold text-xs shadow-[0_4px_14px_rgba(29,78,216,0.25)] active:scale-95 transition-all duration-150 flex items-center gap-1.5 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Начать</span>
              </button>
            </div>
          </section>

          {/* Custom Exam Variant Constructor Banner */}
          <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-4 sm:p-5 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
              <SlidersHorizontal className="w-36 h-36" />
            </div>

            <div className="relative z-10 flex items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-xs">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Конструктор пробников</span>
                </span>
                <h3 className="text-sm sm:text-base font-extrabold leading-tight">
                  Собери свой вариант ЕГЭ или ОГЭ
                </h3>
                <p className="text-[11px] text-blue-100 max-w-[240px] leading-snug">
                  Выбирай любые задания (например 5 шт. #15 и 1 шт. #20), решай на время и получай разбор!
                </p>
              </div>

              <button
                id="btn-home-custom-variant"
                onClick={() => dispatch(navigate('practice'))}
                className="px-4 py-2.5 rounded-2xl bg-white text-[#1D4ED8] hover:bg-blue-50 font-extrabold text-xs shadow-md transition active:scale-95 cursor-pointer shrink-0"
              >
                Собрать
              </button>
            </div>
          </section>

          {/* 3. 2x2 Quick Action Navigation Grid */}
          <div className="grid grid-cols-2 gap-3">
            {/* 1. Темы (Изучай теорию) */}
            <button
              id="btn-nav-topics"
              onClick={() => {
                dispatch(navigate('study'));
              }}
              className="group bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-neutral-100 text-left flex flex-col justify-between h-36 hover:border-blue-200 transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start justify-between w-full">
                <BeakerIllustration className="w-12 h-12 -ml-1 -mt-1 drop-shadow-xs" />
                <div className="w-7 h-7 rounded-full bg-neutral-50 group-hover:bg-blue-50 flex items-center justify-center transition">
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1D4ED8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-base leading-tight">
                  Темы
                </h4>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Изучай теорию
                </p>
              </div>
            </button>

            {/* 2. Практика (Тренируйся) */}
            <button
              id="btn-nav-practice"
              onClick={() => {
                dispatch(navigate('practice'));
              }}
              className="group bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-neutral-100 text-left flex flex-col justify-between h-36 hover:border-blue-200 transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start justify-between w-full">
                <MoleculeIllustration className="w-12 h-12 -ml-1 -mt-1 drop-shadow-xs" />
                <div className="w-7 h-7 rounded-full bg-neutral-50 group-hover:bg-blue-50 flex items-center justify-center transition">
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1D4ED8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-base leading-tight">
                  Практика
                </h4>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Банк заданий
                </p>
              </div>
            </button>

            {/* 3. План (Твой план подготовки) */}
            <button
              id="btn-nav-plan"
              onClick={() => {
                dispatch(navigate('plan'));
              }}
              className="group bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-neutral-100 text-left flex flex-col justify-between h-36 hover:border-blue-200 transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start justify-between w-full">
                <NotebookIllustration className="w-12 h-12 -ml-1 -mt-1 drop-shadow-xs" />
                <div className="w-7 h-7 rounded-full bg-neutral-50 group-hover:bg-blue-50 flex items-center justify-center transition">
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1D4ED8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-base leading-tight">
                  План
                </h4>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Траектория учёбы
                </p>
              </div>
            </button>

            {/* 4. Аналитика (Отслеживай прогресс) */}
            <button
              id="btn-nav-analytics"
              onClick={() => {
                dispatch(navigate('analytics'));
              }}
              className="group bg-white rounded-3xl p-4 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-neutral-100 text-left flex flex-col justify-between h-36 hover:border-blue-200 transition-all active:scale-[0.98] cursor-pointer"
            >
              <div className="flex items-start justify-between w-full">
                <AnalyticsIllustration className="w-12 h-12 -ml-1 -mt-1 drop-shadow-xs" />
                <div className="w-7 h-7 rounded-full bg-neutral-50 group-hover:bg-blue-50 flex items-center justify-center transition">
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#1D4ED8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <div>
                <h4 className="font-extrabold text-neutral-900 text-base leading-tight">
                  Аналитика
                </h4>
                <p className="text-xs text-neutral-500 font-medium mt-0.5">
                  Твоя статистика
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

