import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Award,
  Sparkles,
  BarChart3,
  Flame,
  ArrowRight,
  Info,
  Layers,
  FileCheck2,
} from 'lucide-react';
import {
  ExamType,
  ConfidenceLevel,
  DiagnosticAnswer,
  DiagnosticReport,
  DiagnosticBlockScore,
} from '../../types';
import {
  getQuestionsForExam,
  calculateDiagnosticReport,
} from '../../data/diagnosticData';
import { LolaMascotAvatar } from '../common/GraphicAssets';

interface DiagnosticSectionProps {
  examType: ExamType;
  onComplete: (report: DiagnosticReport) => void;
  onSkip: () => void;
}

export const DiagnosticSection: React.FC<DiagnosticSectionProps> = ({
  examType,
  onComplete,
  onSkip,
}) => {
  const questions = getQuestionsForExam(examType);

  // Sub-state: 'intro' | 'testing' | 'report'
  const [stage, setStage] = useState<'intro' | 'testing' | 'report'>('intro');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, DiagnosticAnswer>>({});
  const [generatedReport, setGeneratedReport] = useState<DiagnosticReport | null>(null);

  const currentQ = questions[currentIdx];
  const currentAnswer = answers[currentQ?.id];

  const handleSelectOption = (optIdx: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQ.id]: {
        questionId: currentQ.id,
        selectedOption: optIdx,
        confidence: prev[currentQ.id]?.confidence || 'CONFIDENT',
      },
    }));
  };

  const handleSelectConfidence = (confidence: ConfidenceLevel) => {
    if (currentAnswer) {
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: {
          ...prev[currentQ.id],
          confidence,
        },
      }));
    } else {
      // If user clicks confidence first, default to option 0 or keep empty
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: {
          questionId: currentQ.id,
          selectedOption: -1,
          confidence,
        },
      }));
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      finishTest();
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const finishTest = () => {
    const report = calculateDiagnosticReport(examType, answers);
    setGeneratedReport(report);
    setStage('report');
  };

  const getExamTitle = () => {
    if (examType === 'EGE') return '11 класса (ЕГЭ)';
    if (examType === 'OGE') return '9 класса (ОГЭ)';
    if (examType === 'GRADE_10') return '10 класса';
    return '8 класса';
  };

  // -------------------------------------------------------------
  // STAGE 1: INTRO SCREEN (PAGE 1 OF DOCUMENT)
  // -------------------------------------------------------------
  if (stage === 'intro') {
    return (
      <div className="animate-in fade-in duration-300 space-y-4">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-[#1D4ED8] text-xs font-extrabold border border-blue-100">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Методический тест входного контроля</span>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Диагностика уровня знаний по химии для {getExamTitle()}
          </h2>
          <p className="text-xs text-neutral-500 max-w-sm mx-auto">
            Определим твои стартовые баллы, сильные блоки и зоны риска для точного составления плана.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-2 bg-white p-3.5 rounded-3xl border border-neutral-200 shadow-sm text-center">
          <div className="p-2 bg-neutral-50 rounded-2xl">
            <span className="block text-[11px] text-neutral-500 font-bold">Время</span>
            <span className="text-xs font-extrabold text-neutral-900">12–15 мин</span>
          </div>
          <div className="p-2 bg-neutral-50 rounded-2xl">
            <span className="block text-[11px] text-neutral-500 font-bold">Заданий</span>
            <span className="text-xs font-extrabold text-neutral-900">12 вопросов</span>
          </div>
          <div className="p-2 bg-neutral-50 rounded-2xl">
            <span className="block text-[11px] text-neutral-500 font-bold">Формат</span>
            <span className="text-xs font-extrabold text-[#1D4ED8]">1 из 4</span>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-sm space-y-2.5 text-xs text-neutral-700">
          <div className="font-extrabold text-neutral-900 flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#1D4ED8]" />
            <span>Инструкция к прохождению:</span>
          </div>
          <ul className="space-y-2 pl-1 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0" />
              <span>В каждом задании выберите один правильный ответ.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-1.5 shrink-0" />
              <span><strong>Не используйте справочники и поиск:</strong> задача теста — увидеть реальный текущий уровень, а не получить максимум баллов.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
              <span>В каждом задании отметьте уверенность: <em>«уверен»</em>, <em>«сомневаюсь»</em> или <em>«наугад»</em>. Это поможет выявить скрытые заблуждения.</span>
            </li>
          </ul>
        </div>

        {/* Actions */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => setStage('testing')}
            className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_4px_14px_rgba(29,78,216,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>Начать диагностику</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onSkip}
            className="w-full bg-transparent hover:bg-neutral-100 text-neutral-500 font-bold py-2 px-4 rounded-xl transition text-xs cursor-pointer"
          >
            Пройти позже (заполнить базовый профиль)
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STAGE 2: ACTIVE QUESTION SCREEN (PAGES 2-3 OF DOCUMENT)
  // -------------------------------------------------------------
  if (stage === 'testing') {
    const answeredCount = Object.keys(answers).filter(
      (id) => answers[Number(id)]?.selectedOption !== undefined && answers[Number(id)]?.selectedOption >= 0
    ).length;
    const progressPercent = Math.round(((currentIdx + 1) / questions.length) * 100);

    return (
      <div className="animate-in fade-in duration-200 space-y-3.5">
        {/* Navigation / Progress header */}
        <div className="bg-white rounded-2xl p-3 border border-neutral-200 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-extrabold text-xs">
              {currentIdx + 1}
            </span>
            <div>
              <span className="text-xs font-extrabold text-neutral-900 block leading-tight">
                {currentQ.blockTitle}
              </span>
              <span className="text-[10px] text-neutral-400 font-medium">
                Вопрос {currentIdx + 1} из {questions.length} • {currentQ.points}{' '}
                {currentQ.points === 1 ? 'балл' : 'балла'}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-bold text-neutral-500">
              Отвечено: {answeredCount}/{questions.length}
            </span>
          </div>
        </div>

        {/* Progress line */}
        <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#1D4ED8] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-sm space-y-3">
          <div className="text-sm font-bold text-neutral-900 leading-relaxed">
            {currentQ.question}
          </div>

          {(currentQ.reaction || currentQ.formula) && (
            <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-center font-mono text-sm font-bold text-[#1D4ED8] tracking-wider">
              {currentQ.reaction || currentQ.formula}
            </div>
          )}

          {/* Options */}
          <div className="space-y-2 pt-1">
            {currentQ.options.map((option, idx) => {
              const letter = ['A', 'B', 'C', 'D'][idx];
              const isSelected = currentAnswer?.selectedOption === idx;

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3 rounded-2xl border-2 text-left flex items-center justify-between text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50 border-[#1D4ED8] text-[#1D4ED8] shadow-xs font-bold'
                      : 'bg-white border-neutral-200 hover:border-neutral-300 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-[#1D4ED8] text-white' : 'bg-neutral-100 text-neutral-600'
                      }`}
                    >
                      {letter}
                    </span>
                    <span>{option}</span>
                  </div>

                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      isSelected ? 'border-[#1D4ED8] bg-[#1D4ED8]' : 'border-neutral-300'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Confidence Selector (Page 1 & 5 of Document) */}
          <div className="pt-2 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-neutral-600 flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-[#1D4ED8]" />
                Уверенность в ответе:
              </span>
              <span className="text-[10px] text-neutral-400">для точной диагностики</span>
            </div>

            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'CONFIDENT', label: 'Уверен', icon: '🎯' },
                { id: 'DOUBTFUL', label: 'Сомневаюсь', icon: '🤔' },
                { id: 'RANDOM', label: 'Наугад', icon: '🎲' },
              ].map((c) => {
                const isConfSelected = (currentAnswer?.confidence || 'CONFIDENT') === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectConfidence(c.id as ConfidenceLevel)}
                    className={`py-1.5 px-2 rounded-xl border text-[11px] font-bold flex items-center justify-center gap-1 transition cursor-pointer ${
                      isConfSelected
                        ? 'bg-amber-50 border-amber-300 text-amber-900 shadow-xs'
                        : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{c.icon}</span>
                    <span>{c.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Navigator Pill */}
        <div className="flex items-center justify-between gap-1 overflow-x-auto py-1 px-0.5">
          {questions.map((q, idx) => {
            const isDone = answers[q.id]?.selectedOption !== undefined && answers[q.id]?.selectedOption >= 0;
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-7 h-7 rounded-xl text-[11px] font-extrabold flex items-center justify-center transition shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#1D4ED8] text-white shadow-xs'
                    : isDone
                    ? 'bg-blue-100 text-[#1D4ED8]'
                    : 'bg-white border border-neutral-200 text-neutral-400'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-2 pt-1">
          {currentIdx > 0 && (
            <button
              onClick={handlePrev}
              className="py-3 px-4 rounded-2xl bg-white border border-neutral-200 text-neutral-700 font-bold text-xs flex items-center gap-1 hover:bg-neutral-50 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Назад</span>
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={currentAnswer?.selectedOption === undefined || currentAnswer?.selectedOption < 0}
            className="flex-1 py-3 px-5 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(29,78,216,0.3)] transition cursor-pointer"
          >
            <span>{currentIdx + 1 < questions.length ? 'Следующий вопрос' : 'Завершить и подвести итоги'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // STAGE 3: DIAGNOSTIC REPORT (PAGES 4 & 5 OF DOCUMENT)
  // -------------------------------------------------------------
  if (stage === 'report' && generatedReport) {
    const r = generatedReport;

    return (
      <div className="animate-in fade-in duration-300 space-y-4">
        {/* Header Ribbon */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-extrabold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Диагностика успешно завершена</span>
          </div>
          <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Диагностическое заключение
          </h2>
          <p className="text-xs text-neutral-500">
            На основе результатов составлен твой индивидуальный образовательный профиль
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">
                Общий результат теста
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-3xl font-extrabold text-neutral-900">
                  {r.totalScore} / {r.maxTotalScore}
                </span>
                <span className="text-sm font-bold text-[#1D4ED8]">
                  ({r.percentage}%)
                </span>
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                Правильно {r.correctQuestionsCount} из {r.totalQuestionsCount} заданий
              </span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center font-extrabold text-lg shadow-xs">
              <Award className="w-7 h-7" />
            </div>
          </div>

          {/* Ranking conclusion (Page 4 table) */}
          <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#1D4ED8] text-white">
                {r.rankingTitle}
              </span>
              <span className="text-xs text-neutral-400 font-bold">
                Стартовый уровень
              </span>
            </div>
            <p className="text-xs text-neutral-700 leading-relaxed font-medium pt-1">
              {r.rankingConclusion}
            </p>
          </div>
        </div>

        {/* Diagnostic Blocks (Page 4) */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-neutral-900 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-[#1D4ED8]" />
              <span>Результаты по 4 диагностическим блокам</span>
            </h3>
          </div>

          <div className="space-y-3">
            {(Object.values(r.blocks) as DiagnosticBlockScore[]).map((b) => (
              <div key={b.blockId} className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-neutral-800">{b.title}</span>
                  <span className="font-extrabold text-[#1D4ED8]">
                    {b.score}/{b.maxScore} б. ({b.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      b.percentage >= 75
                        ? 'bg-emerald-500'
                        : b.percentage >= 45
                        ? 'bg-[#1D4ED8]'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${b.percentage}%` }}
                  />
                </div>
                <p className="text-[10px] text-neutral-400 leading-tight">
                  Проверяли: {b.topicsChecked}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Analysis (Page 5) */}
        <div className="bg-white rounded-3xl p-4 border border-neutral-200 shadow-sm space-y-3">
          <h3 className="text-xs font-extrabold text-neutral-900 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#1D4ED8]" />
            <span>Глубокий анализ знаний (уверенность vs ошибки)</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            {/* Strong blocks */}
            <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-emerald-950">
              <span className="font-bold block mb-0.5">💪 Сильные блоки:</span>
              <span>{r.strongBlocks.join(', ')}</span>
            </div>

            {/* Risk zones */}
            <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-amber-950">
              <span className="font-bold block mb-0.5">⚠️ Зоны риска:</span>
              <span>{r.riskZones.join(', ')}</span>
            </div>

            {/* High confidence errors (Page 5 priority zone) */}
            {r.highConfidenceErrors.length > 0 ? (
              <div className="p-2.5 rounded-2xl bg-red-50 border border-red-200 text-red-950 space-y-1">
                <span className="font-bold flex items-center gap-1 text-red-700">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  Приоритетная зона: Ошибки при высокой уверенности ({r.highConfidenceErrors.length})
                </span>
                <p className="text-[11px] text-red-800 leading-relaxed">
                  Ты был уверен в ответе, но ошибся — здесь кроется устойчивое заблуждение (мисконцепция), требующее разбора в первую очередь:
                </p>
                <div className="space-y-1.5 pt-1">
                  {r.highConfidenceErrors.slice(0, 2).map((err, i) => (
                    <div key={i} className="text-[11px] bg-white/80 p-2 rounded-xl border border-red-100">
                      <span className="font-bold text-neutral-900 block">
                        Вопрос {err.questionId}: {err.topicName}
                      </span>
                      <span className="text-red-600 block">Твой ответ: {err.selectedAnswer}</span>
                      <span className="text-emerald-700 font-bold block">Правильно: {err.correctAnswer}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-2xl bg-blue-50 border border-blue-100 text-[#1D4ED8] text-xs">
                ✨ Ошибок при высокой уверенности не обнаружено — отличная самооценка знаний!
              </div>
            )}

            {/* Start recommendations */}
            <div className="p-2.5 rounded-2xl bg-neutral-50 border border-neutral-200 text-neutral-800">
              <span className="font-bold block mb-1 text-neutral-900">
                🚀 С чего начать подготовку:
              </span>
              <ul className="list-disc list-inside space-y-1 text-neutral-600 text-[11px]">
                {r.startFromRecommendations.map((rec, i) => (
                  <li key={i}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Lola note */}
          <div className="flex items-center gap-3 bg-amber-50 p-3 rounded-2xl border border-amber-200 text-xs text-neutral-700">
            <LolaMascotAvatar size={32} />
            <p className="leading-snug">
              Лола уже скорректировала твой план подготовки и поставила приоритетные уроки в начало расписания!
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onComplete(r)}
          className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_4px_14px_rgba(29,78,216,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer"
        >
          <span>Сохранить результат и продолжить регистрацию</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return null;
};
