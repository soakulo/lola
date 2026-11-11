import React, { useState, useEffect } from 'react';
import {
  X,
  Clock,
  Flag,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  Play,
  Pause,
  ArrowRight,
} from 'lucide-react';
import { ExamTaskInstance, ExamVariantAnalytics } from '../../types';
import { calculateExamAnalytics } from '../../data/examVariantsData';
import { LolaMascotAvatar } from '../common/GraphicAssets';

interface ExamSessionModalProps {
  examType: 'EGE' | 'OGE';
  tasks: ExamTaskInstance[];
  isOpen: boolean;
  onClose: () => void;
  onFinish: (analytics: ExamVariantAnalytics) => void;
}

export const ExamSessionModal: React.FC<ExamSessionModalProps> = ({
  examType,
  tasks,
  isOpen,
  onClose,
  onFinish,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  // Timer interval
  useEffect(() => {
    if (!isOpen || isPaused) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isPaused]);

  if (!isOpen || tasks.length === 0) return null;

  const currentTask = tasks[currentIdx];
  const currentAnswer = answers[currentTask.id];
  const isFlagged = !!flagged[currentTask.id];

  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round(((currentIdx + 1) / tasks.length) * 100);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (idx: number) => {
    if (isPaused) return;
    setAnswers((prev) => ({
      ...prev,
      [currentTask.id]: idx,
    }));
  };

  const handleToggleFlag = () => {
    setFlagged((prev) => ({
      ...prev,
      [currentTask.id]: !prev[currentTask.id],
    }));
  };

  const handleNext = () => {
    if (currentIdx + 1 < tasks.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowConfirmFinish(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleFinishExam = () => {
    const analytics = calculateExamAnalytics(examType, tasks, answers, elapsedSeconds);
    onFinish(analytics);
  };

  return (
    <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 z-50 animate-in fade-in duration-200 font-['Nunito',sans-serif] overflow-y-auto">
      <div className="bg-[#FAF7F2] w-full h-full sm:h-auto sm:max-w-xl sm:max-h-[92vh] sm:rounded-3xl rounded-none flex flex-col shadow-2xl border-0 sm:border sm:border-neutral-200/80 overflow-hidden">
        {/* Header with timer and status */}
        <div className="bg-white px-3 py-2.5 sm:px-4 sm:py-3 border-b border-neutral-200 flex items-center justify-between shrink-0 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <div className="px-2 py-0.5 rounded-lg bg-blue-50 text-[#1D4ED8] font-extrabold text-[11px] sm:text-xs flex items-center gap-1 border border-blue-100 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>{examType}</span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-neutral-400 truncate">
              {answeredCount}/{tasks.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Live Timer */}
            <div className="flex items-center gap-1 px-2 py-1 bg-neutral-100 rounded-lg text-xs font-mono font-extrabold text-neutral-800">
              <Clock className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>{formatTimer(elapsedSeconds)}</span>
            </div>

            <button
              onClick={() => setIsPaused(!isPaused)}
              title={isPaused ? 'Продолжить' : 'Пауза'}
              className="p-1 rounded-lg hover:bg-neutral-100 text-neutral-500 transition cursor-pointer"
            >
              {isPaused ? <Play className="w-4 h-4 text-emerald-600" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowConfirmFinish(true)}
              className="px-2.5 py-1 bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-[11px] sm:text-xs rounded-lg transition cursor-pointer border border-red-200"
            >
              Завершить
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-200 h-1">
          <div
            className="bg-[#1D4ED8] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Content Area */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {isPaused ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Pause className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-extrabold text-neutral-900">Контрольная на паузе</h3>
              <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                Таймер остановлен. Когда будешь готов продолжить решение заданий, нажми кнопку ниже.
              </p>
              <button
                onClick={() => setIsPaused(false)}
                className="mt-2 px-6 py-2.5 rounded-2xl bg-[#1D4ED8] text-white font-bold text-xs shadow-md hover:bg-blue-700 transition cursor-pointer inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Продолжить выполнение</span>
              </button>
            </div>
          ) : (
            <>
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-[#1D4ED8] font-extrabold text-xs">
                      #{currentTask.taskNumber}
                    </span>
                    <span className="text-xs font-extrabold text-neutral-900">
                      {currentTask.taskTitle}
                    </span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium block mt-0.5">
                    Тема: {currentTask.topicName} • {currentTask.points} {currentTask.points === 1 ? 'балл' : 'балла'}
                  </span>
                </div>

                <button
                  onClick={handleToggleFlag}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                    isFlagged
                      ? 'bg-amber-50 border-amber-300 text-amber-800 shadow-xs'
                      : 'bg-white border-neutral-200 text-neutral-400 hover:text-neutral-700'
                  }`}
                  title="Отметить вопрос, чтобы вернуться позже"
                >
                  <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-500 text-amber-500' : ''}`} />
                  <span className="hidden sm:inline">{isFlagged ? 'Отмечен' : 'Отложить'}</span>
                </button>
              </div>

              {/* Question text box */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-neutral-200/80 shadow-xs space-y-3">
                <p className="text-sm sm:text-base font-bold text-neutral-900 leading-relaxed">
                  {currentTask.question}
                </p>

                {(currentTask.reaction || currentTask.formula) && (
                  <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-center font-mono text-xs sm:text-sm font-bold text-[#1D4ED8] tracking-wider">
                    {currentTask.reaction || currentTask.formula}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentTask.options.map((option, idx) => {
                  const letter = ['A', 'B', 'C', 'D'][idx];
                  const isSelected = currentAnswer === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-[#1D4ED8] text-[#1D4ED8] shadow-xs font-bold'
                          : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                        <span
                          className={`w-7 h-7 rounded-xl text-xs font-extrabold flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#1D4ED8] text-white' : 'bg-neutral-100 text-neutral-600'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="leading-snug break-words flex-1">{option}</span>
                      </div>

                      <div
                        className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ml-1 ${
                          isSelected ? 'border-[#1D4ED8] bg-[#1D4ED8]' : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Question Matrix Selector (horizontal scroller) */}
        {!isPaused && (
          <div className="px-4 py-2 bg-white border-t border-neutral-100 flex items-center gap-1.5 overflow-x-auto shrink-0">
            {tasks.map((t, idx) => {
              const isAnswered = answers[t.id] !== undefined;
              const isCurrent = idx === currentIdx;
              const isMarkedFlag = !!flagged[t.id];

              return (
                <button
                  key={t.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`w-8 h-8 rounded-xl text-xs font-extrabold relative flex items-center justify-center transition shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'bg-[#1D4ED8] text-white shadow-xs ring-2 ring-blue-300'
                      : isAnswered
                      ? 'bg-blue-100 text-[#1D4ED8]'
                      : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {isMarkedFlag && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-white" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Footer Navigation */}
        <div className="bg-white px-3 py-2.5 sm:px-4 sm:py-3 border-t border-neutral-200 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0 || isPaused}
            className="py-2 px-3 sm:py-2.5 sm:px-4 rounded-xl border border-neutral-200 text-neutral-700 font-bold text-xs flex items-center gap-1 hover:bg-neutral-50 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>

          <span className="text-xs font-bold text-neutral-400">
            {currentIdx + 1} / {tasks.length}
          </span>

          <button
            onClick={handleNext}
            disabled={isPaused}
            className="py-2 px-3.5 sm:py-2.5 sm:px-5 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1 shadow-[0_4px_12px_rgba(29,78,216,0.3)] transition cursor-pointer"
          >
            <span>{currentIdx + 1 < tasks.length ? 'Далее' : 'Завершить'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Confirm Finish Modal */}
        {showConfirmFinish && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
            <div className="bg-white rounded-3xl p-5 max-w-sm w-full space-y-3 shadow-2xl border border-neutral-200">
              <div className="flex items-center gap-2.5 text-neutral-900">
                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                <h4 className="font-extrabold text-base">Завершить контрольную?</h4>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed">
                Ты ответил на <strong>{answeredCount}</strong> из <strong>{tasks.length}</strong> заданий.
                {answeredCount < tasks.length && (
                  <span className="text-amber-700 block mt-1 font-semibold">
                    Осталось неотвеченных заданий: {tasks.length - answeredCount}.
                  </span>
                )}
                Затраченное время: <strong>{formatTimer(elapsedSeconds)}</strong>.
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setShowConfirmFinish(false)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-neutral-200 text-neutral-700 font-bold text-xs hover:bg-neutral-50 transition cursor-pointer"
                >
                  Продолжить тест
                </button>
                <button
                  onClick={handleFinishExam}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
                >
                  Да, завершить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
