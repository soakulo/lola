import React, { useState } from 'react';
import {
  User,
  Flame,
  Award,
  CheckCircle2,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Bell,
  Edit3,
  Check,
  X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { logoutStudent, updateStudentProfile, setQuestionnaireStep } from '../../store/authSlice';
import { navigate, showToast } from '../../store/uiSlice';
import { LolaMascotAvatar, LolaMascotBig } from '../common/GraphicAssets';
import { ExamType, TargetScore, StudyPace } from '../../types';

export const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editExam, setEditExam] = useState<ExamType>(user?.examType || 'OGE');
  const [editScore, setEditScore] = useState<TargetScore>(user?.targetScore || '5_EXCELLENT');
  const [editPace, setEditPace] = useState<StudyPace>(user?.studyPace || 'RECOMMENDED');

  const streakDays = user?.progress?.streakDays ?? 6;
  const completedTasks = user?.progress?.completedTasksCount ?? 142;
  const xp = user?.progress?.experiencePoints ?? 1250;
  const lessonsCount = user?.progress?.completedLessonsCount ?? 28;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    let gradeLabel = '9 класс (ОГЭ)';
    if (editExam === 'EGE') gradeLabel = '11 класс (ЕГЭ)';
    else if (editExam === 'GRADE_10') gradeLabel = '10 класс';
    else if (editExam === 'GRADE_8') gradeLabel = '8 класс';

    let scoreLabel = '5 (отлично)';
    if (editScore === '5_EXCELLENT') scoreLabel = '5 (отлично) ⭐️';
    else if (editScore === '4_GOOD') scoreLabel = '4 (хорошо)';
    else if (editScore === 'SCORE_85_100') scoreLabel = '85–100 баллов (Топ ВУЗ)';
    else if (editScore === 'SCORE_70_85') scoreLabel = '70–85 баллов';

    await dispatch(
      updateStudentProfile({
        name: editName.trim() || user?.name,
        examType: editExam,
        targetScore: editScore,
        targetScoreLabel: scoreLabel,
        grade: gradeLabel,
        studyPace: editPace,
      })
    );

    setEditModalOpen(false);
    dispatch(showToast('Данные профиля успешно обновлены ✨'));
  };

  const handleLogout = async () => {
    if (window.confirm('Ты уверен, что хочешь выйти из аккаунта?')) {
      await dispatch(logoutStudent());
      dispatch(navigate('auth'));
      dispatch(showToast('Сессия завершена'));
    }
  };

  return (
    <div className="relative min-h-full bg-[#FAF7F2] pb-8 overflow-x-hidden select-none font-['Nunito',sans-serif]">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-12 top-20 w-36 h-36 rounded-full bg-blue-500/10 filter blur-xl" />
        <div className="absolute -right-10 top-60 w-32 h-32 rounded-full bg-amber-500/10 filter blur-xl" />
      </div>

      <div className="relative z-10 pt-3 px-4 space-y-4 pb-8">
        {/* Profile Card */}
        <section className="w-full bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
          <div className="flex items-center gap-4">
            <div className="relative">
              <LolaMascotAvatar size={64} className="border-4 border-neutral-100 shadow-xs" />
              <button
                onClick={() => setEditModalOpen(true)}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1D4ED8] text-white flex items-center justify-center shadow-xs cursor-pointer hover:bg-blue-700 transition"
              >
                <Edit3 className="w-3 h-3" />
              </button>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h2 className="text-xl font-extrabold text-neutral-900 truncate">
                  {user?.name || 'Лола'}
                </h2>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" />
              </div>
              <p className="text-xs text-neutral-500 truncate">{user?.email || 'lola.student@mail.ru'}</p>

              <div className="flex flex-wrap gap-1.5 mt-2">
                <span className="inline-flex items-center text-xs font-bold bg-blue-50 text-[#1D4ED8] px-2.5 py-0.5 rounded-full">
                  {user?.grade || '11 класс (ЕГЭ)'}
                </span>
                <span className="inline-flex items-center text-xs font-bold bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full">
                  {user?.targetScoreLabel || 'Цель: 5 (отлично)'}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Stats Cards in 2x2 grid */}
        <section className="w-full grid grid-cols-2 gap-3">
          {/* Streak */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500/20" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-neutral-900 block leading-tight">
                {streakDays} {streakDays === 1 ? 'день' : streakDays < 5 ? 'дня' : 'дней'}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Ударный режим</span>
            </div>
          </div>

          {/* XP */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5 text-[#1D4ED8]" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-neutral-900 block leading-tight">
                {xp} XP
              </span>
              <span className="text-xs text-neutral-500 font-medium">Набрано баллов</span>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-neutral-900 block leading-tight">
                {completedTasks}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Решено заданий</span>
            </div>
          </div>

          {/* Lessons */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-neutral-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <span className="text-lg font-extrabold text-neutral-900 block leading-tight">
                {lessonsCount}
              </span>
              <span className="text-xs text-neutral-500 font-medium">Пройдено тем</span>
            </div>
          </div>
        </section>

        {/* Diagnostic Assessment Card */}
        {user?.diagnosticReport ? (
          <section className="w-full bg-white rounded-3xl p-5 shadow-sm border border-neutral-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-extrabold text-[#1D4ED8] uppercase tracking-wider block">
                  Входной контроль
                </span>
                <h3 className="text-sm font-extrabold text-neutral-900">
                  Первичная диагностика: {user.diagnosticReport.rankingTitle}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-[#1D4ED8] border border-blue-100">
                {user.diagnosticReport.totalScore} / {user.diagnosticReport.maxTotalScore} б. ({user.diagnosticReport.percentage}%)
              </span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-medium">
              {user.diagnosticReport.rankingConclusion}
            </p>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="p-2.5 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-emerald-950">
                <span className="font-bold block text-[10px] text-emerald-800 uppercase">Сильные темы:</span>
                <span className="text-[11px]">{user.diagnosticReport.strongBlocks.join(', ') || 'База'}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-amber-50/70 border border-amber-100 text-amber-950">
                <span className="font-bold block text-[10px] text-amber-800 uppercase">Зоны риска:</span>
                <span className="text-[11px]">{user.diagnosticReport.riskZones.join(', ') || 'Нет'}</span>
              </div>
            </div>

            <button
              onClick={() => {
                dispatch(setQuestionnaireStep(3));
                dispatch(navigate('questionnaire'));
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-xs font-bold text-neutral-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Пройти диагностику повторно</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </section>
        ) : (
          <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-5 border border-blue-200 shadow-xs flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-[#1D4ED8] block">
                Первичная диагностика не пройдена
              </span>
              <p className="text-[11px] text-neutral-600 max-w-[210px]">
                Пройди короткий тест на 12 вопросов, чтобы выявить пробелы и оптимизировать план
              </p>
            </div>
            <button
              onClick={() => {
                dispatch(setQuestionnaireStep(3));
                dispatch(navigate('questionnaire'));
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-[#1D4ED8] text-white font-bold text-xs shadow-xs hover:bg-blue-700 transition cursor-pointer"
            >
              Пройти тест
            </button>
          </section>
        )}

        {/* Questionnaire Parameters Review & Edit */}
        <section className="w-full bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-extrabold text-neutral-900">
              Параметры анкеты обучения
            </h3>
            <button
              id="btn-edit-questionnaire-profile"
              onClick={() => setEditModalOpen(true)}
              className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Изменить</span>
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-medium">Экзамен и класс:</span>
              <span className="font-bold text-neutral-900">{user?.grade || '9 класс (ОГЭ)'}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-medium">Желаемый результат:</span>
              <span className="font-bold text-neutral-900">{user?.targetScoreLabel || '5 (отлично) ⭐️'}</span>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-500 font-medium">Темп занятий:</span>
              <span className="font-bold text-neutral-900">
                {user?.studyPace === 'INTENSIVE'
                  ? 'Каждый день (интенсив)'
                  : user?.studyPace === 'LIGHT'
                  ? '1–2 часа в неделю'
                  : '3–5 часов в неделю'}
              </span>
            </div>

            <div className="flex items-center justify-between py-2">
              <span className="text-neutral-500 font-medium">Помощник:</span>
              <span className="font-bold text-[#1D4ED8] flex items-center gap-1">
                <span>Кошка Лола 🐱</span>
              </span>
            </div>
          </div>
        </section>

        {/* Menu & Navigation Links */}
        <section className="w-full bg-white rounded-3xl p-2 shadow-sm border border-neutral-100 divide-y divide-neutral-100">
          <button
            onClick={() => {
              dispatch(setQuestionnaireStep(0));
              dispatch(navigate('questionnaire'));
            }}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-50 rounded-2xl transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#1D4ED8] flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-neutral-800">Пройти анкету заново</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            onClick={() => dispatch(navigate('lola'))}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-neutral-50 rounded-2xl transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-neutral-800">Чат с кошкой Лолой</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-400" />
          </button>

          <button
            id="btn-profile-logout"
            onClick={handleLogout}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-red-50 text-red-600 rounded-2xl transition cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">Выйти из аккаунта</span>
            </div>
            <ChevronRight className="w-4 h-4 text-red-300" />
          </button>
        </section>
      </div>

      {/* Edit Questionnaire & Profile Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-neutral-100 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <h4 className="font-bold text-neutral-900 text-base">
                Настройки профиля
              </h4>
              <button
                onClick={() => setEditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Имя</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 bg-neutral-50/50 focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none text-sm text-neutral-800"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Экзамен</label>
                <select
                  value={editExam}
                  onChange={(e) => setEditExam(e.target.value as ExamType)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none text-sm bg-neutral-50/50 text-neutral-800"
                >
                  <option value="OGE">ОГЭ (9 класс)</option>
                  <option value="EGE">ЕГЭ (11 класс)</option>
                  <option value="GRADE_10">10 класс</option>
                  <option value="GRADE_8">8 класс</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Целевой результат</label>
                <select
                  value={editScore}
                  onChange={(e) => setEditScore(e.target.value as TargetScore)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none text-sm bg-neutral-50/50 text-neutral-800"
                >
                  <option value="5_EXCELLENT">5 (отлично) ⭐️</option>
                  <option value="4_GOOD">4 (хорошо)</option>
                  <option value="3_SATISFACTORY">3 (удовлетворительно)</option>
                  <option value="SCORE_85_100">85–100 баллов (Топ ВУЗ)</option>
                  <option value="SCORE_70_85">70–85 баллов</option>
                  <option value="SCORE_60_70">60–70 баллов</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Интенсивность занятий</label>
                <select
                  value={editPace}
                  onChange={(e) => setEditPace(e.target.value as StudyPace)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 focus:ring-2 focus:ring-[#1D4ED8] focus:outline-none text-sm bg-neutral-50/50 text-neutral-800"
                >
                  <option value="LIGHT">1–2 часа в неделю</option>
                  <option value="RECOMMENDED">3–5 часов в неделю (рекомендуем)</option>
                  <option value="INTENSIVE">Каждый день по 30 мин (марафон)</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="flex-1 py-2.5 rounded-2xl border border-neutral-200 bg-white text-neutral-700 font-bold hover:bg-neutral-50 cursor-pointer"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Сохранить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
