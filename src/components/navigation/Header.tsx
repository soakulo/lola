import React from 'react';
import { Bell, Sparkles, X, CheckCircle, Flame, BookOpen } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { navigate, toggleNotifications, markAllNotificationsRead } from '../../store/uiSlice';
import { LolaMascotAvatar } from '../common/GraphicAssets';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const notifications = useAppSelector((state) => state.ui.notifications);
  const notificationsOpen = useAppSelector((state) => state.ui.notificationsOpen);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayName = user?.name || 'Лола';

  return (
    <header className="relative w-full pt-4 pb-3 z-30 font-['Nunito',sans-serif]">
      <div className="flex items-start justify-between">
        {/* Greeting and subtitle */}
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight flex items-center gap-1.5">
            <span>Привет,</span>
            <span className="text-[#1D4ED8]">{displayName}!</span>
          </h1>
          <p className="text-xs font-semibold text-neutral-500 mt-0.5 flex items-center gap-1.5">
            <span>твой помощник в химии</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
          </p>
        </div>

        {/* Right buttons: Notifications + Avatar */}
        <div className="flex items-center gap-2 pt-0.5">
          {/* Bell Notifications */}
          <button
            id="btn-notifications-toggle"
            onClick={() => dispatch(toggleNotifications())}
            aria-label="Уведомления"
            className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-neutral-100 hover:bg-neutral-50 active:scale-95 transition cursor-pointer"
          >
            <Bell className="w-4 h-4 text-neutral-700" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#1D4ED8] rounded-full ring-2 ring-white" />
            )}
          </button>

          {/* Avatar button */}
          <button
            id="btn-profile-avatar-header"
            onClick={() => dispatch(navigate('profile'))}
            aria-label="Личный кабинет"
            className="w-10 h-10 rounded-full p-0.5 bg-white shadow-sm border border-neutral-100 hover:ring-2 hover:ring-[#1D4ED8] transition active:scale-95 flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <LolaMascotAvatar size={34} />
          </button>
        </div>
      </div>

      {/* Notifications Dropdown Panel */}
      {notificationsOpen && (
        <div className="absolute top-20 right-0 left-0 bg-white rounded-3xl p-4 shadow-xl border border-neutral-100 z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-neutral-900 text-sm">Уведомления</span>
              {unreadCount > 0 && (
                <span className="bg-blue-50 text-[#1D4ED8] text-xs px-2 py-0.5 rounded-full font-bold">
                  +{unreadCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={() => dispatch(markAllNotificationsRead())}
                  className="text-xs text-[#1D4ED8] hover:underline font-bold cursor-pointer"
                >
                  Прочитать все
                </button>
              )}
              <button
                onClick={() => dispatch(toggleNotifications())}
                className="w-7 h-7 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-2xl transition border ${
                  item.read ? 'bg-neutral-50/70 border-neutral-100' : 'bg-blue-50/50 border-blue-100'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {item.type === 'streak' && <Flame className="w-4 h-4 text-orange-500 fill-orange-500/20" />}
                    {item.type === 'lesson' && <BookOpen className="w-4 h-4 text-[#1D4ED8]" />}
                    {item.type === 'tip' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">{item.message}</p>
                    <span className="text-[10px] text-neutral-400 mt-1 block">{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

