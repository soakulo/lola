import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot, User, Trash2, HelpCircle, Flame } from 'lucide-react';
import { LolaMascotAvatar } from '../common/GraphicAssets';
import { ChatMessage } from '../../types';

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: '1',
    sender: 'lola',
    text: 'Привет! Я кошка Лола 🐱 Твой персональный репетитор по химии. Спроси меня о любой сложной формуле, реакции или задаче из ОГЭ/ЕГЭ!',
    timestamp: 'Только что',
    suggestionChips: [
      'Объясни ОВР простыми словами',
      'Как находить степень окисления?',
      'Правило Марковникова в органике',
      'Формулы для расчета молярности',
    ],
  },
];

export const LolaChatScreen: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateLolaResponse = (userText: string): string => {
    const lower = userText.toLowerCase();

    if (lower.includes('овр') || lower.includes('окислител')) {
      return '✨ ОВР (окислительно-восстановительные реакции) — это реакции, в которых электроны переходят от одного атома к другому!\n\n💡 Главное правило Лолы:\n• ОКИСЛИТЕЛЬ — грабитель электронов! Он забирает e⁻ и ПОНИЖАЕТ свою степень окисления (сам восстанавливается).\n• ВОССТАНОВИТЕЛЬ — щедрый друг! Он отдает e⁻ и ПОВЫШАЕТ свою степень окисления (сам окисляется).\n\nЗапомни мнемонику: «Восстановитель — отдал — восстановил карму (+)!»';
    }

    if (lower.includes('степен') || lower.includes('окислени')) {
      return '🧪 Алгоритм нахождения степени окисления:\n\n1. У простых веществ (O₂, Na, Cl₂) степень ВСЕГДА = 0.\n2. У щелочных металлов (Li, Na, K) ВСЕГДА +1.\n3. У фтора (F) ВСЕГДА -1.\n4. У водорода (H) почти всегда +1 (в гидридах NaH: -1).\n5. У кислорода (O) почти всегда -2 (в перекиси H₂O₂: -1, в OF₂: +2).\n\nСумма всех степеней в нейтральной молекуле = 0! Например, для H₂SO₄:\n2(+1) + x + 4(-2) = 0 ➔ 2 + x - 8 = 0 ➔ x = +6.';
    }

    if (lower.includes('марковников') || lower.includes('органик')) {
      return '🧬 Правило В.В. Марковникова:\nПри присоединении галогеноводородов (HCl, HBr) или воды (H₂O) к несимметричным алкенам водород присоединяется к НАИБОЛЕЕ гидрированному атому углерода (где водорода уже больше: «богатый становится богаче»).\n\nПример:\nCH₃-CH=CH₂ + HCl ➔ CH₃-CH(Cl)-CH₃ (2-хлорпропан)';
    }

    if (lower.includes('молярност') || lower.includes('расчет') || lower.includes('формул')) {
      return '📐 Базовые формулы для химических расчетов:\n\n1. Количество вещества через массу: n = m / M (моль)\n2. Количество газа при н.у.: n = V / Vm, где Vm = 22.4 л/моль\n3. Количество через число частиц: n = N / Na, где Na = 6.02 × 10²³\n4. Массовая доля вещества: ω = (m(в-ва) / m(раствора)) × 100%';
    }

    return `🐾 Мур! Я поняла твой вопрос про "${userText}".\n\nЧтобы быстро справиться с этим в химии, давай разложим на 3 шага:\n1. Определи класс веществ и тип химической связи.\n2. Напиши уравнение реакции и проверь степени окисления.\n3. Не забудь расставить коэффициенты электронным балансом!\n\nХочешь потренироваться на конкретном примере?`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: 'Сейчас',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'lola',
        text: generateLolaResponse(text),
        timestamp: 'Только что',
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="relative min-h-full bg-[#FAF7F2] flex flex-col justify-between overflow-x-hidden select-none font-['Nunito',sans-serif]">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -left-12 top-16 w-36 h-36 rounded-full bg-blue-500/10 filter blur-xl" />
        <div className="absolute -right-8 bottom-24 w-32 h-32 rounded-full bg-amber-500/10 filter blur-xl" />
      </div>

      {/* Top Bar */}
      <div className="relative z-10 p-4 bg-white/90 backdrop-blur-md border-b border-neutral-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LolaMascotAvatar size={40} />
          <div>
            <h2 className="font-extrabold text-neutral-900 text-sm flex items-center gap-1">
              <span>Кошка Лола</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            </h2>
            <span className="text-xs text-[#1D4ED8] font-bold">Химический ИИ-помощник</span>
          </div>
        </div>

        <button
          onClick={() => setMessages(INITIAL_MESSAGES)}
          title="Очистить чат"
          className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition cursor-pointer"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="relative z-10 flex-1 p-4 overflow-y-auto space-y-3.5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className="flex items-end gap-2 max-w-[85%]">
              {msg.sender === 'lola' && <LolaMascotAvatar size={28} className="shrink-0 mb-1" />}

              <div
                className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#1D4ED8] text-white rounded-br-xs shadow-xs font-medium'
                    : 'bg-white text-neutral-800 border border-neutral-100 rounded-bl-xs shadow-xs font-normal whitespace-pre-wrap'
                }`}
              >
                {msg.text}
              </div>
            </div>

            {/* Suggested Chips if available */}
            {msg.suggestionChips && (
              <div className="mt-2.5 flex flex-wrap gap-1.5 pl-9">
                {msg.suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="bg-white hover:bg-blue-50 text-[#1D4ED8] border border-blue-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-2xs transition active:scale-95 text-left cursor-pointer"
                  >
                    ✨ {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2">
            <LolaMascotAvatar size={28} />
            <div className="bg-white border border-neutral-100 rounded-2xl px-4 py-2 text-xs text-neutral-400 flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 bg-[#1D4ED8] rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="relative z-10 p-3 bg-white/95 backdrop-blur-md border-t border-neutral-100">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Спроси Лолу о любой химической формуле..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="w-10 h-10 rounded-2xl bg-[#1D4ED8] hover:bg-blue-700 disabled:opacity-40 text-white flex items-center justify-center shadow-xs transition active:scale-95 shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
