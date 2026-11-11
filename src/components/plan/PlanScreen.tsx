import React from 'react';
import { CheckCircle2, Sparkles, AlertTriangle, ArrowRight, BookOpen, Target } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleMilestone } from '../../store/curriculumSlice';
import { showToast, navigate } from '../../store/uiSlice';
import { NotebookIllustration } from '../common/GraphicAssets';

export const PlanScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const studyPlan = useAppSelector((state) => state.curriculum.studyPlan);
  const user = useAppSelector((state) => state.auth.user);
  const diag = user?.diagnosticReport;

  return (
    <div className="relative min-h-full bg-[#FAF7F2] pb-8 overflow-x-hidden select-none font-['Inter',sans-serif]">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-12 top-16 w-36 h-36 rounded-full bg-[#0F3EB0]/10 filter blur-xl" />
        <div className="absolute -right-8 top-80 w-32 h-32 rounded-full bg-amber-500/10 filter blur-xl" />
      </div>

      <div className="relative z-10 pt-3 px-4 space-y-4">
        <div className="w-full max-w-[390px] mx-auto">
          <h1 className="text-[24px] font-extrabold text-[#23262F] tracking-tight">
            План подготовки
          </h1>
          <p className="text-[12px] text-[#7E8494] font-medium mt-0.5">
            {user?.grade || '11 класс'} • Персональный график к цели {user?.targetScoreLabel || '5 (отлично)'}
          </p>
        </div>

        {/* Diagnostic Status Card (if completed) */}
        {diag ? (
          <section className="w-full max-w-[390px] mx-auto bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#0F3EB0]" />
                <span className="text-[11px] font-bold text-[#0F3EB0] uppercase tracking-wider">
                  Адаптировано по диагностике
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#0F3EB0] text-white">
                {diag.rankingTitle}
              </span>
            </div>

            <p className="text-[12px] text-[#23262F] leading-relaxed font-medium">
              {diag.rankingConclusion}
            </p>

            {/* Risk Zones Pill list */}
            {diag.riskZones.length > 0 && (
              <div className="pt-1">
                <span className="text-[11px] text-[#7E8494] font-bold block mb-1">
                  Приоритетные зоны внимания:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {diag.riskZones.map((z, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 border border-amber-200 text-amber-900"
                    >
                      ⚠️ {z}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="w-full max-w-[390px] mx-auto bg-gradient-to-r from-blue-50 to-indigo-50 rounded-[24px] p-4 border border-blue-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#0F3EB0] block">
                Пройти входную диагностику
              </span>
              <p className="text-[11px] text-neutral-600 max-w-[210px]">
                Определи стартовый уровень знаний за 12 минут для точной адаптации плана
              </p>
            </div>
            <button
              onClick={() => dispatch(navigate('questionnaire'))}
              className="px-3 py-2 rounded-xl bg-[#0F3EB0] text-white font-bold text-xs shadow-xs hover:bg-blue-700 transition cursor-pointer"
            >
              Пройти
            </button>
          </section>
        )}

        {/* Current Week Header Card */}
        <section className="w-full max-w-[390px] mx-auto bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <NotebookIllustration className="w-12 h-12" />
            <div>
              <span className="text-[11px] font-bold text-[#0F3EB0] uppercase tracking-wider block">
                Текущий спринт
              </span>
              <h3 className="font-bold text-[#23262F] text-[16px]">
                {studyPlan.week}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[12px] font-bold text-[#7E8494]">4 задачи</span>
          </div>
        </section>

        {/* Milestones list */}
        <div className="w-full max-w-[390px] mx-auto space-y-2.5">
          <h3 className="text-[13px] font-bold text-[#23262F] px-1">
            Задачи на неделю
          </h3>

          {studyPlan.milestones.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                dispatch(toggleMilestone(m.id));
                dispatch(showToast(m.done ? 'Задача возвращена' : 'Задача выполнена! Отличная работа 🔥'));
              }}
              className={`w-full p-3.5 sm:p-4 rounded-[20px] border text-left flex items-center justify-between transition-all duration-150 cursor-pointer ${
                m.done
                  ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 opacity-85'
                  : 'bg-white border-neutral-100/80 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:border-[#0F3EB0]/30'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    m.done ? 'bg-[#0F3EB0] text-white' : 'border-2 border-[#7E8494]'
                  }`}
                >
                  {m.done ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h4
                    className={`text-[13px] font-bold leading-snug ${
                      m.done ? 'line-through text-[#7E8494]' : 'text-[#23262F]'
                    }`}
                  >
                    {m.title}
                  </h4>
                  <span className="text-[10px] text-[#7E8494] font-medium block mt-0.5">{m.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Step-by-Step Recommendations from Document (Page 5) */}
        {diag?.startFromRecommendations && diag.startFromRecommendations.length > 0 && (
          <section className="w-full max-w-[390px] mx-auto bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 space-y-2">
            <h3 className="text-[13px] font-bold text-[#23262F] flex items-center gap-1.5">
              <Target className="w-4 h-4 text-[#0F3EB0]" />
              <span>Рекомендации методиста (с чего начать):</span>
            </h3>
            <ul className="space-y-1.5 pl-1">
              {diag.startFromRecommendations.map((rec, i) => (
                <li key={i} className="text-[11px] text-neutral-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0F3EB0] mt-1 shrink-0" />
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
