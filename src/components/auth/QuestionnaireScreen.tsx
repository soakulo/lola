import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, Sparkles, Star, FlaskConical, Award, Clock, ArrowRight, FileCheck2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  setQuestionnaireStep,
  updateQuestionnaireDraft,
  registerWithQuestionnaire,
} from '../../store/authSlice';
import { navigate, showToast } from '../../store/uiSlice';
import { ExamType, TargetScore, ChemistryLevel, StudyPace, DiagnosticReport } from '../../types';
import { LolaMascotBig, LolaMascotAvatar, WatercolorStain, ChemicalFlaskSketch, BenzeneSketch } from '../common/GraphicAssets';
import { DiagnosticSection } from './DiagnosticSection';

export const QuestionnaireScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const step = useAppSelector((state) => state.auth.questionnaireStep);
  const draft = useAppSelector((state) => state.auth.questionnaireDraft);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const [formData, setFormData] = useState<{
    examType: ExamType;
    targetScore: TargetScore;
    currentLevel: ChemistryLevel;
    studyPace: StudyPace;
    name: string;
    email: string;
    password?: string;
    diagnosticReport?: DiagnosticReport;
  }>({
    examType: draft.examType || ('OGE' as ExamType),
    targetScore: draft.targetScore || ('5_EXCELLENT' as TargetScore),
    currentLevel: draft.currentLevel || ('BASIC' as ChemistryLevel),
    studyPace: draft.studyPace || ('RECOMMENDED' as StudyPace),
    name: draft.name || '',
    email: draft.email || '',
    password: '',
    diagnosticReport: draft.diagnosticReport,
  });

  const [validationError, setValidationError] = useState<string | null>(null);

  const totalSteps = 5; // Steps 1 to 5, step 0 is welcome screen

  const handleNext = () => {
    setValidationError(null);
    if (step < totalSteps) {
      dispatch(setQuestionnaireStep(step + 1));
    }
  };

  const handleBack = () => {
    setValidationError(null);
    if (step > 0) {
      dispatch(setQuestionnaireStep(step - 1));
    } else {
      dispatch(navigate('auth'));
    }
  };

  const handleDiagnosticComplete = (report: DiagnosticReport) => {
    setFormData((prev) => ({
      ...prev,
      diagnosticReport: report,
      currentLevel: report.recommendedLevel,
    }));
    dispatch(showToast(`Диагностика завершена: ${report.rankingTitle} (${report.percentage}%)`));
    dispatch(setQuestionnaireStep(4));
  };

  const handleDiagnosticSkip = () => {
    dispatch(showToast('Диагностику можно пройти в любое время в профиле'));
    dispatch(setQuestionnaireStep(4));
  };

  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setValidationError('Пожалуйста, введи своё имя');
      return;
    }
    if (!formData.email.trim()) {
      setValidationError('Пожалуйста, укажи email');
      return;
    }

    try {
      // Fire celebration confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0F3EB0', '#CBE329', '#23262F', '#FFFFFF'],
      });

      await dispatch(
        registerWithQuestionnaire({
          examType: formData.examType,
          targetScore: formData.targetScore,
          currentLevel: formData.currentLevel,
          studyPace: formData.studyPace,
          name: formData.name,
          email: formData.email,
          password: formData.password || '123456',
          diagnosticReport: formData.diagnosticReport,
        })
      ).unwrap();

      dispatch(showToast('Добро пожаловать в команду! План составлен 🎉'));
      dispatch(navigate('home'));
    } catch (err: any) {
      setValidationError(err || 'Ошибка регистрации');
    }
  };

  return (
    <div className="min-h-full bg-[#FAF7F2] flex flex-col justify-between py-5 px-4 relative overflow-hidden select-none font-['Nunito',sans-serif]">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-12 top-10 w-44 h-44 rounded-full bg-blue-500/10 filter blur-2xl" />
        <div className="absolute -right-12 top-52 w-48 h-48 rounded-full bg-amber-500/10 filter blur-2xl" />
      </div>

      {/* Top Header bar with back button & progress */}
      <div className="relative z-10 w-full max-w-sm mx-auto flex items-center justify-between pt-1 pb-3">
        {step > 0 ? (
          <button
            onClick={handleBack}
            className="w-9 h-9 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-800 hover:bg-neutral-50 active:scale-95 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        {step > 0 && (
          <div className="flex-1 mx-3">
            <div className="flex items-center justify-between text-[11px] text-neutral-500 font-bold mb-1">
              <span>Шаг {step} из {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#1D4ED8] h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}

        <button
          onClick={() => dispatch(navigate('auth'))}
          className="text-xs font-bold text-neutral-500 hover:text-neutral-900 px-2 py-1 cursor-pointer"
        >
          {step === 0 ? 'Войти' : 'Отмена'}
        </button>
      </div>

      {/* Interactive Step Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Step 0: Welcome Splash */}
        {step === 0 && (
          <div className="text-center flex flex-col items-center py-2 animate-in fade-in duration-300">
            <div className="relative mb-5">
              <LolaMascotBig size={170} className="relative z-10" />
            </div>

            <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
              Лола
            </h1>
            <p className="text-sm font-bold text-[#1D4ED8] mt-1 flex items-center justify-center gap-1.5">
              <span>твой персональный репетитор по химии</span>
              <Sparkles className="w-4 h-4 text-[#1D4ED8] fill-[#1D4ED8]/20" />
            </p>

            <p className="text-xs text-neutral-600 max-w-xs mt-3 leading-relaxed font-medium">
              Пройди короткую анкету за 1 минуту, чтобы Лола составила для тебя персональный план подготовки к экзамену.
            </p>

            <div className="w-full mt-7 space-y-2.5">
              <button
                id="btn-onboarding-start"
                onClick={() => dispatch(setQuestionnaireStep(1))}
                className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_4px_14px_rgba(29,78,216,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Начать подготовку</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                id="btn-onboarding-to-login"
                onClick={() => dispatch(navigate('auth'))}
                className="w-full bg-white hover:bg-neutral-50 text-neutral-800 font-bold py-3.5 px-6 rounded-2xl border border-neutral-200 active:scale-[0.98] transition text-xs cursor-pointer"
              >
                У меня уже есть аккаунт
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Выбор экзамена */}
        {step === 1 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#1D4ED8] text-white font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                С каким экзаменом готовимся?
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mb-4 pl-8">
              Выбери, к какому экзамену или классу ты готовишься
            </p>

            <div className="space-y-2.5">
              {[
                { id: 'OGE', title: 'ОГЭ', subtitle: '9 класс • Основной госэкзамен' },
                { id: 'EGE', title: 'ЕГЭ', subtitle: '11 класс • Профильный госэкзамен' },
                { id: 'GRADE_10', title: '10 класс', subtitle: 'Углубленная органика и база' },
                { id: 'GRADE_8', title: '8 класс', subtitle: 'Вводный курс и основы химии' },
              ].map((item) => {
                const isSelected = formData.examType === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setFormData({ ...formData, examType: item.id as ExamType });
                    }}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#1D4ED8] shadow-[0_4px_16px_rgba(29,78,216,0.12)] ring-1 ring-[#1D4ED8]'
                        : 'bg-white/80 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-base ${
                          isSelected ? 'bg-[#1D4ED8] text-white' : 'bg-blue-50 text-neutral-800'
                        }`}
                      >
                        <FlaskConical className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-extrabold text-neutral-900 text-base leading-tight">
                          {item.title}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium mt-0.5">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white' : 'border-neutral-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Cat Mascot hint */}
            <div className="mt-4 flex items-center gap-3 bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-neutral-100 shadow-xs">
              <LolaMascotAvatar size={34} />
              <p className="text-xs text-neutral-700 leading-relaxed font-medium">
                Лола подберет банк заданий и теорию под формат твоего экзамена!
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Желаемый балл / Результат */}
        {step === 2 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#1D4ED8] text-white font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                Какой результат хочешь?
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mb-4 pl-8">
              Это поможет составить интенсивность плана подготовки
            </p>

            <div className="space-y-2.5">
              {formData.examType === 'OGE' || formData.examType === 'GRADE_8' ? (
                // OGE Score options
                [
                  { id: '3_SATISFACTORY', title: '3 (удовлетворительно)', desc: 'Минимум для сдачи экзамена' },
                  { id: '4_GOOD', title: '4 (хорошо)', desc: 'Уверенный балл и хорошая база' },
                  { id: '5_EXCELLENT', title: '5 (отлично)', desc: 'Максимум баллов для профильного класса', isTop: true },
                ].map((score) => {
                  const isSelected = formData.targetScore === score.id;
                  return (
                    <button
                      key={score.id}
                      onClick={() => setFormData({ ...formData, targetScore: score.id as TargetScore })}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#1D4ED8] shadow-[0_4px_16px_rgba(29,78,216,0.12)] ring-1 ring-[#1D4ED8]'
                          : 'bg-white/80 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-neutral-900 text-sm flex items-center gap-2">
                          <span>{score.title}</span>
                          {score.isTop && <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium mt-0.5">{score.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white' : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })
              ) : (
                // EGE Score options
                [
                  { id: 'SCORE_60_70', title: '60–70 баллов', desc: 'Базовый порог для поступления на бюджет' },
                  { id: 'SCORE_70_85', title: '70–85 баллов', desc: 'Престижный региональный или столичный ВУЗ' },
                  { id: 'SCORE_85_100', title: '85–100 баллов', desc: 'Медицинские академии и топовые химические факультеты', isTop: true },
                ].map((score) => {
                  const isSelected = formData.targetScore === score.id;
                  return (
                    <button
                      key={score.id}
                      onClick={() => setFormData({ ...formData, targetScore: score.id as TargetScore })}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-white border-[#1D4ED8] shadow-[0_4px_16px_rgba(29,78,216,0.12)] ring-1 ring-[#1D4ED8]'
                          : 'bg-white/80 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="font-extrabold text-neutral-900 text-sm flex items-center gap-2">
                          <span>{score.title}</span>
                          {score.isTop && <Award className="w-4 h-4 text-amber-500" />}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium mt-0.5">{score.desc}</div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white' : 'border-neutral-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* Step 3: Первичная диагностика уровня знаний */}
        {step === 3 && (
          <DiagnosticSection
            examType={formData.examType}
            onComplete={handleDiagnosticComplete}
            onSkip={handleDiagnosticSkip}
          />
        )}

        {/* Step 4: Время и темп */}
        {step === 4 && (
          <div className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#1D4ED8] text-white font-extrabold text-xs flex items-center justify-center">
                4
              </span>
              <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                Сколько времени уделять?
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mb-4 pl-8">
              Мы составим персональный график без перегрузок
            </p>

            <div className="space-y-2.5">
              {[
                { id: 'LIGHT', title: '1–2 часа в неделю', desc: 'Спокойный размеренный темп', icon: Clock },
                { id: 'RECOMMENDED', title: '3–5 часов в неделю', desc: 'Оптимальный темп с гарантией результата', icon: Sparkles, recommended: true },
                { id: 'INTENSIVE', title: 'Каждый день по 30 мин', desc: 'Интенсивный марафон для максимального балла', icon: Award },
              ].map((pace) => {
                const isSelected = formData.studyPace === pace.id;
                const Icon = pace.icon;
                return (
                  <button
                    key={pace.id}
                    onClick={() => setFormData({ ...formData, studyPace: pace.id as StudyPace })}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white border-[#1D4ED8] shadow-[0_4px_16px_rgba(29,78,216,0.12)] ring-1 ring-[#1D4ED8]'
                        : 'bg-white/80 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#1D4ED8]/10 text-[#1D4ED8]' : 'bg-neutral-100 text-neutral-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-neutral-900 text-sm flex items-center gap-2">
                          <span>{pace.title}</span>
                          {pace.recommended && (
                            <span className="bg-amber-100 text-amber-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                              Хит
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-neutral-500 font-medium mt-0.5">{pace.desc}</div>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-2 ${
                        isSelected ? 'border-[#1D4ED8] bg-[#1D4ED8] text-white' : 'border-neutral-300'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Регистрация профиля */}
        {step === 5 && (
          <form onSubmit={handleFinish} className="animate-in fade-in duration-300">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-lg bg-[#1D4ED8] text-white font-extrabold text-xs flex items-center justify-center">
                5
              </span>
              <h2 className="text-xl font-extrabold text-neutral-900 tracking-tight">
                Создание профиля
              </h2>
            </div>
            <p className="text-xs text-neutral-500 mb-4 pl-8">
              Сохрани свой прогресс, ударный режим и план
            </p>

            {validationError && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-semibold">
                {validationError}
              </div>
            )}

            <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 space-y-3">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Твоё имя</label>
                <input
                  id="input-reg-name"
                  type="text"
                  placeholder="Например: София или Лола"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm text-neutral-800 bg-neutral-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Email для входа</label>
                <input
                  id="input-reg-email"
                  type="email"
                  placeholder="student@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm text-neutral-800 bg-neutral-50/50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Пароль</label>
                <input
                  id="input-reg-password"
                  type="password"
                  placeholder="Придумай пароль"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm text-neutral-800 bg-neutral-50/50"
                  required
                />
              </div>
            </div>

            {/* Selected Summary Card */}
            {formData.diagnosticReport ? (
              <div className="mt-3 p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-[#1D4ED8] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-extrabold">
                    <FileCheck2 className="w-4 h-4 text-[#1D4ED8]" />
                    <span>Диагностика: {formData.diagnosticReport.rankingTitle}</span>
                  </div>
                  <span className="font-extrabold bg-[#1D4ED8] text-white px-2 py-0.5 rounded-full text-[10px]">
                    {formData.diagnosticReport.percentage}%
                  </span>
                </div>
                <p className="text-[#1D4ED8]/85 text-[11px] leading-relaxed font-medium">
                  {formData.examType === 'EGE' ? 'ЕГЭ 11 класс' : 'ОГЭ 9 класс'} • {formData.diagnosticReport.correctQuestionsCount} из {formData.diagnosticReport.totalQuestionsCount} верных заданий. План адаптирован под закрытие выявленных пробелов!
                </p>
              </div>
            ) : (
              <div className="mt-3 p-3 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between text-xs text-[#1D4ED8]">
                <div>
                  <span className="font-bold block">
                    {formData.examType === 'EGE' ? 'ЕГЭ 11 класс' : 'ОГЭ 9 класс'} • Цель: {formData.targetScore === '5_EXCELLENT' ? '5 (отлично)' : 'Высокий балл'}
                  </span>
                  <span className="text-[#1D4ED8]/80 text-xs">
                    План составлен специально под твою цель!
                  </span>
                </div>
                <LolaMascotAvatar size={30} />
              </div>
            )}

            <button
              id="btn-complete-registration"
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-2xl shadow-[0_4px_14px_rgba(29,78,216,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>Сохраняем план...</span>
              ) : (
                <>
                  <span>Завершить и начать учиться</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Bottom Action for Steps 1 to 4 (Step 3 has internal interactive actions) */}
      {step > 0 && step < totalSteps && step !== 3 && (
        <div className="relative z-10 w-full max-w-sm mx-auto pt-3">
          <button
            id={`btn-questionnaire-next-step-${step}`}
            onClick={handleNext}
            className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_4px_14px_rgba(29,78,216,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <span>Далее</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
