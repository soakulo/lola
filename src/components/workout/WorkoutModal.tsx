import React, { useState } from 'react';
import { X, CheckCircle, AlertCircle, HelpCircle, ArrowRight, RotateCcw, Award, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppDispatch, useAppSelector } from '../../store';
import { setWorkoutModalOpen, showToast } from '../../store/uiSlice';
import { addWorkoutCompletion } from '../../store/authSlice';
import { markWorkoutCompleted } from '../../store/curriculumSlice';
import { LolaMascotAvatar } from '../common/GraphicAssets';

export const WorkoutModal: React.FC = () => {
  const dispatch = useAppDispatch();
  const workout = useAppSelector((state) => state.curriculum.todayWorkout);
  const isOpen = useAppSelector((state) => state.ui.activeWorkoutModalOpen);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQuestion = workout.questions[currentIndex] || workout.questions[0];
  const isCorrect = selectedOption === currentQuestion.correctIndex;
  const progressPercent = Math.round(((currentIndex + 1) / workout.questions.length) * 100);

  const handleSelectOption = (idx: number) => {
    if (isAnswerChecked) return;
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < workout.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setShowHint(false);
    } else {
      // Completed!
      setIsCompleted(true);
      const scorePercent = Math.round(((correctAnswersCount + (isCorrect ? 1 : 0)) / workout.questions.length) * 100);
      const xpEarned = scorePercent * 2 + 50;

      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#1D4ED8', '#60A5FA', '#A3E635', '#F59E0B'],
      });

      dispatch(addWorkoutCompletion({ scorePercent, xpEarned }));
      dispatch(markWorkoutCompleted());
    }
  };

  const handleClose = () => {
    dispatch(setWorkoutModalOpen(false));
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setShowHint(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 z-50 animate-in fade-in duration-200 font-['Nunito',sans-serif]">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-neutral-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200 select-none">
        {/* Top Header */}
        <div className="p-4 bg-white border-b border-neutral-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-bold text-xs">
              ОВР
            </span>
            <div>
              <h3 className="font-bold text-neutral-900 text-sm leading-tight">
                Тренировка: ОВР реакции
              </h3>
              <span className="text-xs text-neutral-400 font-medium">
                Вопрос {currentIndex + 1} из {workout.questions.length}
              </span>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-neutral-100 h-1.5">
          <div
            className="bg-[#1D4ED8] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto flex-1 flex flex-col justify-between">
          {!isCompleted ? (
            <div className="space-y-4">
              {/* Question card */}
              <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100">
                <p className="text-sm font-bold text-neutral-900 leading-relaxed">
                  {currentQuestion.question}
                </p>

                {/* Optional Formula / Reaction Box */}
                {(currentQuestion.formula || currentQuestion.reaction) && (
                  <div className="mt-3 p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-center">
                    <span className="font-mono text-base font-bold text-[#1D4ED8] tracking-wider">
                      {currentQuestion.reaction || currentQuestion.formula}
                    </span>
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQuestion.options.map((option, idx) => {
                  const isThisSelected = selectedOption === idx;
                  const isThisCorrect = idx === currentQuestion.correctIndex;

                  let buttonStyle = 'bg-white border-neutral-200/80 hover:border-blue-300 text-neutral-800';
                  if (isAnswerChecked) {
                    if (isThisCorrect) {
                      buttonStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500';
                    } else if (isThisSelected && !isThisCorrect) {
                      buttonStyle = 'bg-red-50 border-red-500 text-red-950 ring-1 ring-red-500';
                    } else {
                      buttonStyle = 'bg-white/60 border-neutral-200/60 text-neutral-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    buttonStyle = 'bg-blue-50 border-[#1D4ED8] text-[#1D4ED8] ring-1 ring-[#1D4ED8] shadow-xs';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswerChecked}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left font-medium text-xs sm:text-sm flex items-center justify-between transition-all duration-150 cursor-pointer ${buttonStyle}`}
                    >
                      <span>{option}</span>
                      {isAnswerChecked && isThisCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {isAnswerChecked && isThisSelected && !isThisCorrect && (
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Lola Hint Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  <LolaMascotAvatar size={22} />
                  <span>{showHint ? 'Скрыть подсказку Лолы' : 'Подсказка от кошки Лолы'}</span>
                </button>

                {showHint && (
                  <div className="mt-2 p-3 bg-white rounded-2xl border border-blue-100 text-xs text-neutral-800 flex items-start gap-2 animate-in fade-in duration-200">
                    <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{currentQuestion.lolaHint}</p>
                  </div>
                )}
              </div>

              {/* Explanation after checking */}
              {isAnswerChecked && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-in fade-in duration-200 ${
                    isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}
                >
                  <p className="font-bold mb-1">
                    {isCorrect ? 'Отлично! Всё правильно 🎉' : 'Не совсем так. Разбор задачи:'}
                  </p>
                  <p>{currentQuestion.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            // Results screen
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center shadow-inner">
                <Award className="w-9 h-9 text-[#1D4ED8]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                  Тренировка завершена!
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Ты отлично справился с блоком окислительно-восстановительных реакций
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                <div className="bg-white p-3 rounded-2xl border border-neutral-100 shadow-xs">
                  <span className="text-lg font-extrabold text-neutral-900 block">
                    {correctAnswersCount} / {workout.questions.length}
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">Правильно</span>
                </div>
                <div className="bg-white p-3 rounded-2xl border border-neutral-100 shadow-xs">
                  <span className="text-lg font-extrabold text-[#1D4ED8] block">
                    +150 XP
                  </span>
                  <span className="text-xs text-neutral-400 font-medium">Опыт начислен</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs font-bold text-neutral-800 bg-white py-2 px-4 rounded-full max-w-xs mx-auto border border-amber-200">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Ударный режим продлен на 1 день!</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6 pt-3 border-t border-neutral-100">
            {!isCompleted ? (
              !isAnswerChecked ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedOption === null}
                  className="w-full bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-40 text-white font-bold py-3 px-5 rounded-2xl shadow-sm transition active:scale-[0.98] text-sm cursor-pointer"
                >
                  Проверить ответ
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full bg-neutral-900 hover:bg-black text-white font-bold py-3 px-5 rounded-2xl shadow-sm transition active:scale-[0.98] text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{currentIndex + 1 < workout.questions.length ? 'Следующий вопрос' : 'Посмотреть результат'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                onClick={handleClose}
                className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-2xl shadow-md transition active:scale-[0.98] text-sm cursor-pointer"
              >
                Вернуться на главную
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
