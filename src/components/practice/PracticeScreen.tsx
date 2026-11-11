import React, { useState } from 'react';
import {
  ArrowLeft,
  Atom,
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleX,
  FlaskConical,
  Calculator,
  SquarePen,
  TestTube,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  goBack,
  navigate,
  setWorkoutModalOpen,
  toggleNotifications,
} from '../../store/uiSlice';
import { LolaMascotAvatar } from '../common/GraphicAssets';
import { VariantBuilder } from './VariantBuilder';
import { ExamSessionModal } from './ExamSessionModal';
import { ExamResultModal } from './ExamResultModal';
import { ExamTaskInstance, ExamVariantAnalytics } from '../../types';

const taskTopics = [
  { title: 'Строение атома', completed: 24, total: 30, progress: 80, icon: Atom },
  { title: 'Периодический закон', completed: 18, total: 25, progress: 72, icon: CircleX },
  { title: 'Неорганическая химия', completed: 20, total: 30, progress: 66, icon: FlaskConical },
  { title: 'Органическая химия', completed: 15, total: 30, progress: 50, icon: Atom },
  { title: 'Химические реакции', completed: 12, total: 30, progress: 40, icon: Atom },
];

const taskTypes = [
  { label: 'Расчётные задачи', icon: Calculator },
  { label: 'ОВР', icon: TestTube },
  { label: 'Тесты', icon: CheckCircle2 },
  { label: 'Практика', icon: SquarePen },
];

export const PracticeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState<'tasks' | 'builder'>('tasks');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedTaskType, setSelectedTaskType] = useState('Расчётные задачи');
  const [taskAmount, setTaskAmount] = useState(20);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [activeExamType, setActiveExamType] = useState<'EGE' | 'OGE'>('EGE');
  const [activeTasks, setActiveTasks] = useState<ExamTaskInstance[]>([]);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  const [latestAnalytics, setLatestAnalytics] = useState<ExamVariantAnalytics | null>(null);

  const defaultExamType: 'EGE' | 'OGE' = user?.examType === 'OGE' ? 'OGE' : 'EGE';

  const handleStartCustomExam = (examType: 'EGE' | 'OGE', tasks: ExamTaskInstance[]) => {
    setActiveExamType(examType);
    setActiveTasks(tasks);
    setIsExamModalOpen(true);
  };

  const handleFinishExam = (analytics: ExamVariantAnalytics) => {
    setIsExamModalOpen(false);
    setLatestAnalytics(analytics);
    setIsResultModalOpen(true);
  };

  return (
    <div className="relative min-h-full bg-[#FAF7F2] pb-6 overflow-x-hidden font-['Nunito',sans-serif]">
      <div className="relative z-10 px-4 pt-3 pb-8 space-y-4">
        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Назад"
            onClick={() => dispatch(goBack())}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Уведомления"
              onClick={() => dispatch(toggleNotifications())}
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <Bell className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Профиль"
              onClick={() => dispatch(navigate('profile'))}
              className="w-9 h-9 rounded-full bg-white p-0.5 shadow-sm overflow-hidden"
            >
              <LolaMascotAvatar size={32} />
            </button>
          </div>
        </div>

        <h1 className="px-3 text-2xl font-extrabold tracking-tight text-neutral-900">
          Практика
        </h1>

        <div className="flex gap-2 rounded-2xl bg-white p-2">
          {([
            ['tasks', 'Задачи'],
            ['builder', 'Конструктор'],
          ] as const).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`flex-1 rounded-2xl py-2.5 text-sm font-bold transition ${
                activeTab === tab
                  ? 'bg-[#DCE4FC] text-[#0F3EB0]'
                  : 'bg-[#EEF1F9] text-[#0F3EB0]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'tasks' ? (
          <div className="space-y-4">
            <h2 className="pt-1 text-center text-2xl font-extrabold">Выбери тему</h2>

            <section className="space-y-3 rounded-2xl bg-white px-4 py-4 shadow-sm">
              {taskTopics.map((topic) => {
                const TopicIcon = topic.icon;
                const isSelected = selectedTopic === topic.title;

                return (
                  <button
                    key={topic.title}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedTopic(isSelected ? null : topic.title)}
                    className="flex w-full items-center gap-3 text-left"
                  >
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        isSelected ? 'bg-[#DCE4FC]' : 'bg-[#EEF1F9]'
                      } text-[#3155D5]`}
                    >
                      <TopicIcon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="truncate text-sm font-bold">{topic.title}</span>
                        <span className="shrink-0 text-xs font-bold text-slate-500">
                          {topic.progress}%
                        </span>
                      </span>
                      <span className="mt-1 flex items-center gap-2">
                        <span className="h-[3px] flex-1 overflow-hidden rounded-full bg-[#E8EDF8]">
                          <span
                            className="block h-full rounded-full bg-[#3155D5]"
                            style={{ width: `${topic.progress}%` }}
                          />
                        </span>
                        <span className="shrink-0 text-[11px] text-slate-400">
                          {topic.completed} из {topic.total} заданий
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-slate-500" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-bold">Выбери тип задания</h3>
              <div className="grid grid-cols-4 gap-1.5">
                {taskTypes.map((type) => {
                  const TypeIcon = type.icon;
                  const isSelected = selectedTaskType === type.label;

                  return (
                    <button
                      key={type.label}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => setSelectedTaskType(type.label)}
                      className={`flex min-h-[112px] flex-col items-center justify-center gap-1 rounded-xl px-1 text-center ${
                        isSelected ? 'bg-white text-[#3155D5] shadow-sm' : 'bg-white text-slate-500'
                      }`}
                    >
                      <TypeIcon className="h-8 w-8 stroke-[1.5]" />
                      <span className="text-[11px] leading-tight">{type.label}</span>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm font-bold">Количество заданий</h3>
              <div className="grid grid-cols-3 gap-2 rounded-2xl bg-white p-2">
                {[10, 20, 50].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    aria-pressed={taskAmount === amount}
                    onClick={() => setTaskAmount(amount)}
                    className={`rounded-xl py-4 text-sm font-extrabold ${
                      taskAmount === amount
                        ? 'bg-[#3155D5] text-white'
                        : 'bg-[#EEF1F9] text-neutral-800'
                    }`}
                  >
                    {amount}
                  </button>
                ))}
              </div>
            </section>

            <button
              type="button"
              onClick={() => dispatch(setWorkoutModalOpen(true))}
              className="w-full rounded-xl bg-[#22242A] py-4 text-base font-extrabold text-white"
            >
              Начать
            </button>
          </div>
        ) : (
          <VariantBuilder
            initialExamType={defaultExamType}
            onStartExam={handleStartCustomExam}
          />
        )}
      </div>

      <ExamSessionModal
        isOpen={isExamModalOpen}
        examType={activeExamType}
        tasks={activeTasks}
        onClose={() => setIsExamModalOpen(false)}
        onFinish={handleFinishExam}
      />
      <ExamResultModal
        isOpen={isResultModalOpen}
        analytics={latestAnalytics}
        onClose={() => setIsResultModalOpen(false)}
        onRetake={() => {
          setIsResultModalOpen(false);
          setActiveTab('builder');
        }}
      />
    </div>
  );
};
