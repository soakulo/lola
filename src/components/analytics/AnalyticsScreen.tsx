import React from 'react';
import { useAppSelector } from '../../store';
import { AnalyticsIllustration } from '../common/GraphicAssets';
import { DiagnosticBlockScore } from '../../types';

export const AnalyticsScreen: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);

  const overallPercent = user?.progress?.overallPercentage ?? 72;
  const streakDays = user?.progress?.streakDays ?? 6;
  const completedTasks = user?.progress?.completedTasksCount ?? 142;
  const xp = user?.progress?.experiencePoints ?? 1250;

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
            Аналитика и прогресс
          </h1>
          <p className="text-[12px] text-[#7E8494] font-medium mt-0.5">
            Детальная статистика твоей подготовки по темам
          </p>
        </div>

        {/* Overall Readiness Card */}
        <section className="w-full max-w-[390px] mx-auto bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-[#0F3EB0] uppercase tracking-wider block">
              Готовность к экзамену
            </span>
            <div className="text-[32px] font-extrabold text-[#23262F] tracking-tight">
              {overallPercent}%
            </div>
            <span className="text-[12px] text-[#7E8494] font-medium">
              Цель: {user?.targetScoreLabel || '5 (отлично)'}
            </span>
          </div>

          <AnalyticsIllustration className="w-20 h-20 shrink-0" />
        </section>

        {/* 3 Metric Cards */}
        <div className="w-full max-w-[390px] mx-auto grid grid-cols-3 gap-2">
          <div className="bg-white p-3 rounded-[20px] border border-neutral-100/80 text-center shadow-xs">
            <span className="text-[18px] font-extrabold text-[#23262F] block">{streakDays} дн</span>
            <span className="text-[10px] text-[#7E8494] font-medium">Ударный темп</span>
          </div>
          <div className="bg-white p-3 rounded-[20px] border border-neutral-100/80 text-center shadow-xs">
            <span className="text-[18px] font-extrabold text-[#0F3EB0] block">{completedTasks}</span>
            <span className="text-[10px] text-[#7E8494] font-medium">Задач решено</span>
          </div>
          <div className="bg-white p-3 rounded-[20px] border border-neutral-100/80 text-center shadow-xs">
            <span className="text-[18px] font-extrabold text-[#23262F] block">{xp} XP</span>
            <span className="text-[10px] text-[#7E8494] font-medium">Опыт</span>
          </div>
        </div>

        {/* Diagnostic Results Card (from Document) */}
        {user?.diagnosticReport && (
          <section className="w-full max-w-[390px] mx-auto bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-[#23262F] text-[14px]">
                Первичная диагностика
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-[#0F3EB0] text-white">
                {user.diagnosticReport.rankingTitle}
              </span>
            </div>

            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200/80 text-[11px] text-[#23262F] leading-relaxed font-medium">
              {user.diagnosticReport.rankingConclusion}
            </div>

            <div className="space-y-2.5 pt-1">
              {(Object.values(user.diagnosticReport.blocks) as DiagnosticBlockScore[]).map((b) => (
                <div key={b.blockId}>
                  <div className="flex justify-between items-center text-[11px] mb-1 font-medium">
                    <span className="text-[#23262F] font-bold">{b.title}</span>
                    <span className="font-extrabold text-[#0F3EB0]">
                      {b.score}/{b.maxScore} б. ({b.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-[#EDE9DD] h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        b.percentage >= 70
                          ? 'bg-emerald-500'
                          : b.percentage >= 45
                          ? 'bg-[#0F3EB0]'
                          : 'bg-amber-500'
                      }`}
                      style={{ width: `${b.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-neutral-100 text-[11px]">
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-950">
                <span className="font-bold block text-[10px] text-emerald-800 uppercase">Сильные темы:</span>
                <span>{user.diagnosticReport.strongBlocks.join(', ') || 'Требуется практика'}</span>
              </div>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-950">
                <span className="font-bold block text-[10px] text-amber-800 uppercase">Зоны риска:</span>
                <span>{user.diagnosticReport.riskZones.join(', ') || 'Без критических зон'}</span>
              </div>
            </div>
          </section>
        )}

        {/* Mastery by Sections */}
        <section className="w-full max-w-[390px] mx-auto bg-white rounded-[24px] p-4 sm:p-5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-neutral-100/80 space-y-3">
          <h3 className="font-bold text-[#23262F] text-[14px]">
            Усвоение тем
          </h3>

          <div className="space-y-3">
            {[
              { label: 'Строение атома и связи', value: user?.progress?.topics?.atomicStructure ?? 85, color: 'bg-[#0F3EB0]' },
              { label: 'Органическая химия', value: user?.progress?.topics?.organicChemistry ?? 75, color: 'bg-[#0F3EB0]' },
              { label: 'Неорганическая химия и ОВР', value: user?.progress?.topics?.inorganicChemistry ?? 60, color: 'bg-[#0F3EB0]' },
              { label: 'Химические расчеты и задачи', value: user?.progress?.topics?.chemicalCalculations ?? 40, color: 'bg-amber-500' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center text-[11px] mb-1 font-medium">
                  <span className="text-[#23262F]">{item.label}</span>
                  <span className="font-bold text-[#23262F]">{item.value}%</span>
                </div>
                <div className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
