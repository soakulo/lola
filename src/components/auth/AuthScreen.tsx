import React, { useState } from 'react';
import { Mail, Lock, LogIn, UserPlus, Sparkles, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { loginStudent, setQuestionnaireStep } from '../../store/authSlice';
import { navigate, showToast } from '../../store/uiSlice';
import { LolaMascotBig, WatercolorStain, ChemicalFlaskSketch, BenzeneSketch } from '../common/GraphicAssets';

export const AuthScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);
  const error = useAppSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    if (!email.trim()) {
      setLocalError('Введите email');
      return;
    }

    try {
      await dispatch(loginStudent({ email, password })).unwrap();
      dispatch(showToast('С возвращением к занятиям! ✨'));
      dispatch(navigate('home'));
    } catch (err: any) {
      setLocalError(err || 'Неверный логин или пароль');
    }
  };

  const handleDemoLogin = async () => {
    try {
      await dispatch(loginStudent({ email: 'lola.student@mail.ru', password: 'demo' })).unwrap();
      dispatch(showToast('Вы вошли как студент Лола! 🧪'));
      dispatch(navigate('home'));
    } catch {
      dispatch(showToast('Успешный вход!'));
      dispatch(navigate('home'));
    }
  };

  return (
    <div className="min-h-full bg-[#FAF7F2] flex flex-col justify-between py-6 px-4 relative overflow-hidden select-none font-['Nunito',sans-serif]">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-12 top-10 w-44 h-44 rounded-full bg-blue-500/10 filter blur-2xl" />
        <div className="absolute -right-12 top-52 w-48 h-48 rounded-full bg-amber-500/10 filter blur-2xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        {/* Mascot & Greeting */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <LolaMascotBig size={130} />
          </div>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Вход в платформу
          </h1>
          <p className="text-xs font-bold text-[#1D4ED8] mt-1 flex items-center justify-center gap-1">
            <span>Лола • твой персональный репетитор по химии</span>
            <Sparkles className="w-3.5 h-3.5 fill-[#1D4ED8]/20" />
          </p>
        </div>

        {/* Error message */}
        {(localError || error) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{localError || error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3.5">
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100 space-y-3">
            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  id="input-login-email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm text-neutral-800 bg-neutral-50/50"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">Пароль</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                <input
                  id="input-login-password"
                  type="password"
                  placeholder="Твой пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm text-neutral-800 bg-neutral-50/50"
                />
              </div>
            </div>
          </div>

          <button
            id="btn-submit-login"
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1D4ED8] hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_4px_14px_rgba(29,78,216,0.3)] active:scale-[0.98] transition flex items-center justify-center gap-2 text-sm cursor-pointer disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{isLoading ? 'Входим...' : 'Войти в личный кабинет'}</span>
          </button>
        </form>

        {/* Quick Demo Login */}
        <div className="mt-3">
          <button
            id="btn-demo-login"
            onClick={handleDemoLogin}
            className="w-full bg-white hover:bg-neutral-50 text-neutral-800 font-bold py-2.5 px-4 rounded-2xl border border-neutral-200 active:scale-[0.98] transition flex items-center justify-center gap-2 text-xs cursor-pointer shadow-xs"
          >
            <span>Быстрый демо-вход (Лола, 72% прогресс)</span>
          </button>
        </div>

        {/* Switch to Questionnaire / Registration */}
        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-500">Впервые на платформе?</p>
          <button
            id="btn-to-questionnaire-signup"
            onClick={() => {
              dispatch(setQuestionnaireStep(0));
              dispatch(navigate('questionnaire'));
            }}
            className="mt-2 text-xs font-bold text-[#1D4ED8] hover:underline flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Пройти анкету и зарегистрироваться</span>
          </button>
        </div>
      </div>
    </div>
  );
};
