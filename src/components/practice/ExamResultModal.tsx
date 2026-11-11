import React, { useState } from 'react';
import {
  X,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  BarChart3,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { ExamVariantAnalytics, ExamTaskResult } from '../../types';
import { LolaMascotAvatar } from '../common/GraphicAssets';

interface ExamResultModalProps {
  analytics: ExamVariantAnalytics | null;
  isOpen: boolean;
  onClose: () => void;
  onRetake: () => void;
}

export const ExamResultModal: React.FC<ExamResultModalProps> = ({
  analytics,
  isOpen,
  onClose,
  onRetake,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'mistakes' | 'correct'>('all');
  const [expandedTaskIdx, setExpandedTaskIdx] = useState<number | null>(null);

  if (!isOpen || !analytics) return null;

  const avgTimePerTask =
    analytics.totalTasks > 0
      ? Math.round(analytics.elapsedSeconds / analytics.totalTasks)
      : 0;

  const filteredTasks = analytics.taskResults.filter((r) => {
    if (activeFilter === 'mistakes') return !r.isCorrect;
    if (activeFilter === 'correct') return r.isCorrect;
    return true;
  });

  return (
    <div className="fixed inset-0 bg-neutral-900/80 backdrop-blur-xs flex items-center justify-center p-0 sm:p-4 z-50 animate-in fade-in duration-200 font-['Nunito',sans-serif] overflow-y-auto">
      <div className="bg-[#FAF7F2] w-full h-full sm:h-auto sm:max-w-xl sm:max-h-[92vh] sm:rounded-3xl rounded-none flex flex-col shadow-2xl border-0 sm:border sm:border-neutral-200 overflow-hidden">
        {/* Header */}
        <div className="bg-white px-4 py-3 sm:px-5 sm:py-4 border-b border-neutral-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xs sm:text-sm font-extrabold text-neutral-900 leading-tight truncate">
                Результат варианта
              </h3>
              <span className="text-[11px] text-neutral-400 font-medium truncate block">
                {analytics.examType} • {analytics.completedAt}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-500 flex items-center justify-center transition cursor-pointer shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Main Top Metrics Card */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#1D4ED8] block">
                  Итог выполнения
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-3xl font-black text-neutral-900">
                    {analytics.totalScore}
                  </span>
                  <span className="text-sm font-bold text-neutral-400">
                    из {analytics.maxScore} баллов ({analytics.percentage}%)
                  </span>
                </div>
              </div>

              {/* Time pill */}
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 px-3.5 py-2 rounded-2xl self-start sm:self-auto">
                <Clock className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                <div>
                  <span className="text-[10px] font-bold text-blue-700 block leading-tight">
                    Время решения:
                  </span>
                  <span className="text-xs font-black text-[#1D4ED8]">
                    {analytics.elapsedTimeFormatted}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick stats pills */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-neutral-50 p-2.5 rounded-2xl border border-neutral-100">
                <span className="text-xs text-neutral-400 block font-semibold">Верно заданий</span>
                <span className="text-sm font-extrabold text-emerald-600">
                  {analytics.correctTasks} / {analytics.totalTasks}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-2xl border border-neutral-100">
                <span className="text-xs text-neutral-400 block font-semibold">Ошибок</span>
                <span className="text-sm font-extrabold text-red-500">
                  {analytics.totalTasks - analytics.correctTasks}
                </span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-2xl border border-neutral-100">
                <span className="text-xs text-neutral-400 block font-semibold">Темп (средний)</span>
                <span className="text-sm font-extrabold text-neutral-800">
                  ~{avgTimePerTask} сек/вопр
                </span>
              </div>
            </div>

            {/* Lola advice */}
            <div className="bg-[#FFFDF7] p-3.5 rounded-2xl border border-amber-200/80 flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <LolaMascotAvatar mood="happy" size="sm" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-extrabold text-neutral-900 block">Комментарий Лолы:</span>
                <p className="text-neutral-600 leading-relaxed font-medium">
                  {analytics.lolaFeedback}
                </p>
              </div>
            </div>
          </div>

          {/* Breakdown by Task Numbers (e.g., #15 - 4/5, #20 - 1/1) */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-neutral-900 flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-[#1D4ED8]" />
                <span>Аналитика по номерам заданий</span>
              </h4>
              <span className="text-[11px] text-neutral-400 font-bold">Точность</span>
            </div>

            <div className="space-y-2.5">
              {(Object.values(analytics.byTaskNumbers) as Array<{
                taskNumber: number;
                title: string;
                total: number;
                correct: number;
                percentage: number;
              }>).map((item) => (
                <div key={item.taskNumber} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-neutral-800">
                      Задание #{item.taskNumber} • {item.title}
                    </span>
                    <span className="font-extrabold text-[#1D4ED8]">
                      {item.correct}/{item.total} ({item.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        item.percentage >= 80
                          ? 'bg-emerald-500'
                          : item.percentage >= 50
                          ? 'bg-[#1D4ED8]'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Breakdown by Chemistry Categories */}
          <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-xs space-y-3">
            <h4 className="text-xs font-extrabold text-neutral-900 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-[#1D4ED8]" />
              <span>Разделы химии</span>
            </h4>

            <div className="grid grid-cols-2 gap-2">
              {(Object.values(analytics.byCategories) as Array<{
                category: string;
                title: string;
                total: number;
                correct: number;
                percentage: number;
              }>)
                .filter((c) => c.total > 0)
                .map((cat) => (
                  <div
                    key={cat.category}
                    className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-col justify-between space-y-1.5"
                  >
                    <span className="text-[11px] font-bold text-neutral-700 leading-tight">
                      {cat.title}
                    </span>
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="text-[11px] text-neutral-400">
                        {cat.correct} из {cat.total}
                      </span>
                      <span
                        className={`font-extrabold ${
                          cat.percentage >= 75
                            ? 'text-emerald-600'
                            : cat.percentage >= 50
                            ? 'text-[#1D4ED8]'
                            : 'text-red-500'
                        }`}
                      >
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Detailed Question by Question Review */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-extrabold text-neutral-900">
                Подробный разбор каждого задания
              </h4>

              {/* Filter pills */}
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-white text-neutral-900 shadow-xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Все ({analytics.taskResults.length})
                </button>
                <button
                  onClick={() => setActiveFilter('mistakes')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                    activeFilter === 'mistakes'
                      ? 'bg-white text-red-600 shadow-xs'
                      : 'text-neutral-500 hover:text-red-600'
                  }`}
                >
                  Ошибки ({analytics.totalTasks - analytics.correctTasks})
                </button>
                <button
                  onClick={() => setActiveFilter('correct')}
                  className={`px-2 py-0.5 text-[10px] font-bold rounded-lg transition cursor-pointer ${
                    activeFilter === 'correct'
                      ? 'bg-white text-emerald-600 shadow-xs'
                      : 'text-neutral-500 hover:text-emerald-600'
                  }`}
                >
                  Верно ({analytics.correctTasks})
                </button>
              </div>
            </div>

            <div className="space-y-2.5">
              {filteredTasks.map((res, idx) => {
                const isExpanded = expandedTaskIdx === idx;
                const letter =
                  res.userAnswerIndex !== null ? ['A', 'B', 'C', 'D'][res.userAnswerIndex] : '—';
                const correctLetter = ['A', 'B', 'C', 'D'][res.task.correctIndex];

                return (
                  <div
                    key={res.task.id}
                    className={`bg-white rounded-2xl border transition-all ${
                      res.isCorrect ? 'border-neutral-200' : 'border-red-200/80'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedTaskIdx(isExpanded ? null : idx)}
                      className="w-full p-3.5 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 pr-2">
                        {res.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 font-extrabold text-[10px]">
                              #{res.task.taskNumber}
                            </span>
                            <span className="text-xs font-bold text-neutral-900 line-clamp-1">
                              {res.task.taskTitle}
                            </span>
                          </div>
                          <span className="text-[11px] text-neutral-400 font-medium line-clamp-1">
                            {res.task.question}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs font-extrabold ${
                            res.isCorrect ? 'text-emerald-600' : 'text-red-500'
                          }`}
                        >
                          {res.isCorrect ? `+${res.task.points} б.` : '0 б.'}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-neutral-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-neutral-100 space-y-3 text-xs">
                        <p className="font-bold text-neutral-800 leading-relaxed">
                          {res.task.question}
                        </p>

                        {(res.task.reaction || res.task.formula) && (
                          <div className="p-2.5 bg-neutral-50 rounded-xl font-mono text-[11px] text-[#1D4ED8] font-bold text-center">
                            {res.task.reaction || res.task.formula}
                          </div>
                        )}

                        <div className="space-y-1.5 pt-1">
                          <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-50">
                            <span className="text-neutral-500">Твой ответ:</span>
                            <span
                              className={`font-bold ${
                                res.isCorrect ? 'text-emerald-600' : 'text-red-600'
                              }`}
                            >
                              {res.userAnswerIndex !== null
                                ? `${letter}) ${res.task.options[res.userAnswerIndex]}`
                                : 'Нет ответа'}
                            </span>
                          </div>

                          {!res.isCorrect && (
                            <div className="flex items-center justify-between p-2 rounded-xl bg-emerald-50/70 border border-emerald-100">
                              <span className="text-emerald-800 font-medium">Правильный ответ:</span>
                              <span className="font-bold text-emerald-800">
                                {correctLetter}) {res.task.options[res.task.correctIndex]}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
                          <span className="font-extrabold text-[11px] text-[#1D4ED8] block">
                            💡 Разбор и подсказка Лолы:
                          </span>
                          <p className="text-[11px] text-neutral-700 leading-relaxed font-medium">
                            {res.task.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-white px-4 py-3 border-t border-neutral-200 flex items-center justify-between gap-2 shrink-0">
          <button
            onClick={onRetake}
            className="flex-1 py-2.5 px-4 rounded-2xl border border-neutral-200 hover:bg-neutral-50 text-neutral-700 font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Собрать новый вариант</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_12px_rgba(29,78,216,0.25)] transition cursor-pointer"
          >
            <span>Завершить просмотр</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
