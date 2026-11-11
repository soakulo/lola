import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChemistryTopic, WorkoutQuestion } from '../types';

interface CurriculumState {
  topics: ChemistryTopic[];
  todayWorkout: {
    title: string;
    topicId: string;
    questionsCount: number;
    estimatedMinutes: number;
    completed: boolean;
    questions: WorkoutQuestion[];
  };
  studyPlan: {
    week: string;
    milestones: Array<{ id: string; title: string; date: string; done: boolean }>;
  };
}

const INITIAL_WORKOUT_QUESTIONS: WorkoutQuestion[] = [
  {
    id: 'q1',
    question: 'Определи степень окисления серы в соединении H₂SO₄:',
    formula: 'H₂SO₄',
    options: ['+4', '+6', '-2', '+2'],
    correctIndex: 1,
    explanation: 'Водород имеет степень окисления +1, кислород -2. В нейтральной молекуле: 2(+1) + x + 4(-2) = 0 => 2 + x - 8 = 0 => x = +6.',
    lolaHint: 'Помни: сумма всех степеней окисления в молекуле равна нулю! У кислорода почти всегда -2.',
  },
  {
    id: 'q2',
    question: 'Какой элемент является окислителем в реакции: 2Na + Cl₂ → 2NaCl ?',
    reaction: '2Na⁰ + Cl₂⁰ → 2Na⁺¹Cl⁻¹',
    options: ['Натрий (Na)', 'Хлор (Cl₂)', 'Оба элемента', 'Ни один'],
    correctIndex: 1,
    explanation: 'Окислитель принимает электроны и понижает свою степень окисления. Хлор понижает с 0 до -1 (Cl₂⁰ + 2e⁻ → 2Cl⁻), поэтому он окислитель.',
    lolaHint: 'Окислитель — это грабитель электронов! Он забирает e⁻ и понижает свою степень.',
  },
  {
    id: 'q3',
    question: 'Укажи вещество, которое может проявлять свойства ТОЛЬКО восстановителя:',
    options: ['HNO₃ (конц)', 'KMnO₄', 'H₂S', 'SO₂'],
    correctIndex: 2,
    explanation: 'В сероводороде H₂S сера находится в низшей степени окисления -2 и может только отдавать электроны (быть восстановителем).',
    lolaHint: 'Ищи элемент в минимальной для него степени окисления, ниже падать уже некуда!',
  },
  {
    id: 'q4',
    question: 'В какой из реакций азот НЕ меняет свою степень окисления?',
    options: [
      'NH₃ + HCl → NH₄Cl',
      '4NH₃ + 5O₂ → 4NO + 6H₂O',
      'Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O',
      '2NO₂ + H₂O → HNO₃ + HNO₂',
    ],
    correctIndex: 0,
    explanation: 'В реакции NH₃ + HCl → NH₄Cl степень окисления азота до и после реакции остаётся -3. Это реакция соединения без изменения степеней окисления.',
    lolaHint: 'Реакции обмена и образования солей аммония обычно не являются ОВР!',
  },
  {
    id: 'q5',
    question: 'Сколько электронов отдаёт марганец при переходе Mn⁺² → Mn⁺⁷ ?',
    reaction: 'Mn⁺² → Mn⁺⁷',
    options: ['2 электрона', '5 электронов', '7 электронов', '3 электрона'],
    correctIndex: 1,
    explanation: 'Степень окисления увеличивается на 5 единиц, следовательно, марганец отдаёт 5 электронов: Mn⁺² - 5e⁻ → Mn⁺⁷.',
    lolaHint: 'Отдача отрицательных электронов повышает заряд: (+2) - (-5) = +7.',
  },
];

const INITIAL_TOPICS: ChemistryTopic[] = [
  {
    id: 'atomic_structure',
    title: 'Строение атома',
    subtitle: 'Электронные конфигурации, квантовые числа, периоды и группы',
    progress: 85,
    category: 'general',
    iconType: 'atom',
    lessonsCount: 12,
    summary: 'Основа всей химии: уровни, подуровни, спаренные и неспаренные электроны.',
  },
  {
    id: 'organic_chemistry',
    title: 'Органическая химия',
    subtitle: 'Углеводороды, функциональные группы, полимеры и изомерия',
    progress: 75,
    category: 'organic',
    iconType: 'molecule',
    lessonsCount: 24,
    summary: 'Алканы, алкены, спирты, альдегиды, карбоновые кислоты и аминокислоты.',
  },
  {
    id: 'inorganic_chemistry',
    title: 'Неорганическая химия',
    subtitle: 'Классы неорганических веществ, ОВР, гидролиз, металлы и неметаллы',
    progress: 60,
    category: 'inorganic',
    iconType: 'flask',
    lessonsCount: 18,
    summary: 'Оксиды, кислоты, основания, соли, свойства простых веществ.',
  },
  {
    id: 'chemical_calculations',
    title: 'Химические расчеты',
    subtitle: 'Задачи на молярность, избыток/недостаток, выход продукта и смеси',
    progress: 40,
    category: 'calculations',
    iconType: 'beaker',
    lessonsCount: 15,
    summary: 'Формулы n = m/M, n = V/Vm, массовые доли и расчет по уравнениям реакций.',
  },
];

const initialState: CurriculumState = {
  topics: INITIAL_TOPICS,
  todayWorkout: {
    title: 'ОВР',
    topicId: 'inorganic_chemistry',
    questionsCount: 15,
    estimatedMinutes: 20,
    completed: false,
    questions: INITIAL_WORKOUT_QUESTIONS,
  },
  studyPlan: {
    week: 'Неделя 3 (Февраль)',
    milestones: [
      { id: 'm1', title: 'Окислительно-восстановительные реакции (ОВР)', date: 'Сегодня', done: false },
      { id: 'm2', title: 'Гидролиз солей и среда растворов (рН)', date: 'Завтра', done: false },
      { id: 'm3', title: 'Электролиз расплавов и растворов', date: 'Четверг', done: false },
      { id: 'm4', title: 'Пробный тест ОГЭ/ЕГЭ №2', date: 'Суббота', done: false },
    ],
  },
};

export const curriculumSlice = createSlice({
  name: 'curriculum',
  initialState,
  reducers: {
    markWorkoutCompleted: (state) => {
      state.todayWorkout.completed = true;
    },
    updateTopicProgress: (state, action: PayloadAction<{ topicId: string; progress: number }>) => {
      const topic = state.topics.find((t) => t.id === action.payload.topicId);
      if (topic) {
        topic.progress = action.payload.progress;
      }
    },
    toggleMilestone: (state, action: PayloadAction<string>) => {
      const milestone = state.studyPlan.milestones.find((m) => m.id === action.payload);
      if (milestone) {
        milestone.done = !milestone.done;
      }
    },
  },
});

export const { markWorkoutCompleted, updateTopicProgress, toggleMilestone } = curriculumSlice.actions;

export default curriculumSlice.reducer;
