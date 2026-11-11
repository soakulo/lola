import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight, Sparkles, Atom, Flame, FlaskConical, Calculator } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { navigate, showToast } from '../../store/uiSlice';
import { ChemistryTopic } from '../../types';
import { LolaMascotAvatar } from '../common/GraphicAssets';

export const StudyScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const topics = useAppSelector((state) => state.curriculum.topics);
  const [selectedTopic, setSelectedTopic] = useState<ChemistryTopic | null>(null);

  const getTopicIcon = (type: string) => {
    switch (type) {
      case 'atom':
        return <Atom className="w-6 h-6 text-[#0F3EB0]" />;
      case 'molecule':
        return <Sparkles className="w-6 h-6 text-[#0F3EB0]" />;
      case 'flask':
        return <FlaskConical className="w-6 h-6 text-[#0F3EB0]" />;
      case 'beaker':
        return <Calculator className="w-6 h-6 text-[#0F3EB0]" />;
      default:
        return <BookOpen className="w-6 h-6 text-[#0F3EB0]" />;
    }
  };

  return (
    <div className="relative min-h-full bg-[#FAF7F2] pb-8 overflow-x-hidden select-none font-['Nunito',sans-serif]">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-12 top-16 w-36 h-36 rounded-full bg-blue-500/10 filter blur-xl" />
        <div className="absolute -right-8 top-80 w-32 h-32 rounded-full bg-amber-500/10 filter blur-xl" />
      </div>

      <div className="relative z-10 pt-3 px-4 space-y-4 pb-8">
        {/* Header */}
        {!selectedTopic ? (
          <div className="w-full">
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight">
              Теория и уроки
            </h1>
            <p className="text-xs text-neutral-500 font-medium mt-0.5">
              Изучай основы, формулы и химические свойства шаг за шагом
            </p>
          </div>
        ) : (
          <div className="w-full flex items-center gap-3">
            <button
              onClick={() => setSelectedTopic(null)}
              className="w-10 h-10 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base font-bold text-neutral-900 leading-tight">
                {selectedTopic.title}
              </h2>
              <span className="text-xs text-neutral-500 font-medium">12 уроков • Теория и конспекты</span>
            </div>
          </div>
        )}

        {/* Topics List View */}
        {!selectedTopic ? (
          <div className="w-full space-y-3">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="w-full bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 text-left hover:border-blue-200 transition-all active:scale-[0.99] cursor-pointer"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      {getTopicIcon(topic.iconType)}
                    </div>
                    <div>
                      <h3 className="font-bold text-neutral-900 text-sm leading-tight">
                        {topic.title}
                      </h3>
                      <span className="text-xs text-neutral-500 font-medium block mt-0.5">
                        {topic.lessonsCount} уроков • {topic.progress}% пройдено
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-neutral-400" />
                </div>

                <p className="text-xs text-neutral-500 leading-relaxed line-clamp-2">
                  {topic.subtitle}
                </p>

                {/* Progress bar */}
                <div className="mt-3 w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1D4ED8] h-full rounded-full transition-all duration-500"
                    style={{ width: `${topic.progress}%` }}
                  />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Topic Detail & Lessons View */
          <div className="w-full space-y-3 animate-in fade-in duration-200">
            {/* Topic Summary Card */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100">
              <span className="text-xs font-bold text-[#1D4ED8] uppercase tracking-wider block mb-1">
                Описание раздела
              </span>
              <p className="text-xs text-neutral-800 leading-relaxed font-normal">
                {selectedTopic.summary}
              </p>
            </div>

            {/* Sub-lessons */}
            <div className="space-y-2.5">
              {[
                { id: '1', title: '1. Строение электронных оболочек и орбитали', duration: '12 мин', done: true },
                { id: '2', title: '2. s-, p-, d-элементы и валентные электроны', duration: '15 мин', done: true },
                { id: '3', title: '3. Периодический закон Д.И. Менделеева', duration: '18 мин', done: false },
                { id: '4', title: '4. Электроотрицательность и типы связей', duration: '14 мин', done: false },
                { id: '5', title: '5. Практика: решение заданий №1 и №2 ОГЭ/ЕГЭ', duration: '20 мин', done: false },
              ].map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => dispatch(showToast(`Урок "${lesson.title}" открыт!`))}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-neutral-100 flex items-center justify-between hover:border-blue-200 transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                        lesson.done ? 'bg-blue-50 text-[#1D4ED8]' : 'bg-neutral-100 text-neutral-400'
                      }`}
                    >
                      {lesson.done ? <CheckCircle className="w-4 h-4" /> : <BookOpen className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 leading-snug">{lesson.title}</h4>
                      <span className="text-[10px] text-neutral-400 font-medium">{lesson.duration}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
