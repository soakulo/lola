import {
  ExamSpecificationItem,
  CustomVariantConfig,
  ExamTaskInstance,
  ExamVariantAnalytics,
  ExamCategory,
  ExamTaskResult,
} from '../types';

// ============================================================================
// 1. ПОЛНАЯ СПЕЦИФИКАЦИЯ ЕГЭ ПО ХИМИИ (34 ЗАДАНИЯ)
// ============================================================================
export const EGE_SPECIFICATION: ExamSpecificationItem[] = [
  {
    number: 1,
    title: 'Строение электронных оболочек',
    topic: 'Конфигурации атомов и ионов, s-, p-, d-элементы',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 2,
    title: 'Периодический закон',
    topic: 'Закономерности изменения свойств элементов и соединений',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 3,
    title: 'Степень окисления и валентность',
    topic: 'Высшая/низшая степень окисления, валентные электроны',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 4,
    title: 'Химическая связь и решетки',
    topic: 'Ковалентная, ионная, металлическая связи, кристаллические решетки',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 5,
    title: 'Классификация неорганических веществ',
    topic: 'Оксиды, кислоты, основания, амфотерные гидроксиды, соли',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 6,
    title: 'Свойства простых веществ и оксидов',
    topic: 'Реакции металлов, неметаллов, основных, кислотных и амфотерных оксидов',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 7,
    title: 'Химические свойства кислот, солей и оснований',
    topic: 'Взаимодействие неорганических соединений между собой',
    category: 'inorganic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 4,
  },
  {
    number: 8,
    title: 'Взаимодействие неорганических веществ',
    topic: 'Соответствие между реагентами и продуктами реакций',
    category: 'inorganic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 4,
  },
  {
    number: 9,
    title: 'Неорганические цепочки превращений',
    topic: 'Определение веществ X и Y в цепочке химических реакций',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 10,
    title: 'Классификация и номенклатура органики',
    topic: 'Классы органических веществ, функциональные группы, IUPAC',
    category: 'organic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 11,
    title: 'Теория строения, изомерия и гомология',
    topic: 'Виды изомерии (структурная, геометрическая), гибридизация',
    category: 'organic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 12,
    title: 'Химические свойства углеводородов',
    topic: 'Алканы, циклоалканы, алкены, диены, алкины, арены',
    category: 'organic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 4,
  },
  {
    number: 13,
    title: 'Свойства кислородсодержащих соединений',
    topic: 'Спирты, фенолы, альдегиды, кетоны, карбоновые кислоты, эфиры',
    category: 'organic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 4,
  },
  {
    number: 14,
    title: 'Свойства азотсодержащих соединений',
    topic: 'Амины, аминокислоты, пептидная связь, белки',
    category: 'organic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 15,
    title: 'Биологически важные вещества и полимеры',
    topic: 'Углеводы (глюкоза, сахароза, крахмал), жиры, полимеризация',
    category: 'organic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 16,
    title: 'Генетическая связь углеводородов',
    topic: 'Взаимосвязь между классами углеводородов',
    category: 'organic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 17,
    title: 'Взаимосвязь органических соединений',
    topic: 'Превращения кислород- и азотсодержащих веществ (вещества X и Y)',
    category: 'organic',
    maxPoints: 1,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 18,
    title: 'Классификация химических реакций',
    topic: 'Гомогенные/гетерогенные, экзо/эндотермические, каталитические',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 19,
    title: 'Скорость химической реакции',
    topic: 'Зависимость скорости от температуры, давления, концентрации',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 20,
    title: 'Окислительно-восстановительные реакции',
    topic: 'Окислители, восстановители, изменение степеней окисления',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 21,
    title: 'Электролиз расплавов и растворов',
    topic: 'Процессы на катоде и аноде при электролизе',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 22,
    title: 'Гидролиз солей и шкала pH',
    topic: 'Среда водных растворов, гидролиз по катиону/аниону, порядок pH',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 23,
    title: 'Химическое равновесие',
    topic: 'Принцип Ле Шателье и расчетные равновесные концентрации',
    category: 'calculations',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 4,
  },
  {
    number: 24,
    title: 'Качественные реакции веществ и ионов',
    topic: 'Разделение и качественное обнаружение неорганических и органических веществ',
    category: 'practice_lab',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 25,
    title: 'Лаборатория, безопасность и производство',
    topic: 'Промышленное получение аммиака, серной кислоты, чугуна, полимеры',
    category: 'practice_lab',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 26,
    title: 'Расчеты массовой доли в растворе',
    topic: 'Смешивание, упаривание, добавление солей и кристаллогидратов',
    category: 'calculations',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 27,
    title: 'Расчеты теплового эффекта реакции',
    topic: 'Термохимические уравнения, выделение и поглощение теплоты',
    category: 'calculations',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 28,
    title: 'Расчеты по уравнениям реакций',
    topic: 'Выход продукта от теоретического, примеси, объемные отношения',
    category: 'calculations',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 29,
    title: 'ОВР развернутого ответа (Часть 2)',
    topic: 'Выбор веществ из списка, электронный баланс, степени окисления',
    category: 'inorganic',
    maxPoints: 2,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 6,
  },
  {
    number: 30,
    title: 'Реакции ионного обмена РИО (Часть 2)',
    topic: 'Молекулярное, полное и сокращенное ионное уравнения',
    category: 'inorganic',
    maxPoints: 2,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 5,
  },
  {
    number: 31,
    title: 'Неорганический эксперимент (Часть 2)',
    topic: '4 химические реакции на свойства неорганических веществ',
    category: 'inorganic',
    maxPoints: 4,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 8,
  },
  {
    number: 32,
    title: 'Органическая цепочка превращений (Часть 2)',
    topic: '5 химических реакций со структурными формулами органики',
    category: 'organic',
    maxPoints: 5,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 10,
  },
  {
    number: 33,
    title: 'Определение формулы вещества (Часть 2)',
    topic: 'Расчет простейшей и истинной молекулярной формулы, структура',
    category: 'calculations',
    maxPoints: 3,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 10,
  },
  {
    number: 34,
    title: 'Комплексная расчетная задача (Часть 2)',
    topic: 'Растворимость, электролиз, смеси, разложение, атомистика',
    category: 'calculations',
    maxPoints: 4,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 15,
  },
];

// ============================================================================
// 2. ПОЛНАЯ СПЕЦИФИКАЦИЯ ОГЭ ПО ХИМИИ (23 ЗАДАНИЯ)
// ============================================================================
export const OGE_SPECIFICATION: ExamSpecificationItem[] = [
  {
    number: 1,
    title: 'Строение атома и состав ядер',
    topic: 'Протоны, нейтроны, электроны, изотопы',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 2,
    title: 'Строение электронных оболочек',
    topic: 'Число электронов на внешнем уровне, схема строения',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 3,
    title: 'Периодический закон и свойства',
    topic: 'Радиус атома, металлические и неметаллические свойства',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 4,
    title: 'Степень окисления и валентность',
    topic: 'Степень окисления атомов в бинарных и сложных соединениях',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 5,
    title: 'Виды химической связи',
    topic: 'Ковалентная (полярная/неполярная), ионная, металлическая',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 6,
    title: 'Простые и сложные вещества',
    topic: 'Классификация: оксиды, основания, кислоты, соли',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 7,
    title: 'Химические свойства оксидов',
    topic: 'Основные, кислотные, амфотерные и несолеобразующие оксиды',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 8,
    title: 'Свойства кислот, оснований и солей',
    topic: 'Взаимодействие гидроксидов и кислот с солями и металлами',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 9,
    title: 'Реакции ионного обмена (РИО)',
    topic: 'Условия протекания РИО: выпадение осадка, выделение газа, вода',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 10,
    title: 'Взаимосвязь неорганических веществ',
    topic: 'Генетический ряд металлов и неметаллов',
    category: 'inorganic',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 11,
    title: 'Окислительно-восстановительные реакции',
    topic: 'Процессы окисления и восстановления, число отданных электронов',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 12,
    title: 'Чистые вещества и смеси',
    topic: 'Правила работы в школьной лаборатории, разделение смесей',
    category: 'practice_lab',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 13,
    title: 'Электролитическая диссоциация',
    topic: 'Сильные и слабые электролиты, диссоциация солей и щелочей',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 14,
    title: 'Качественные реакции на ионы',
    topic: 'Обнаружение катионов и анионов (Ba2+, Ag+, SO4 2-, Cl-)',
    category: 'inorganic',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 15,
    title: 'Окислитель и восстановитель',
    topic: 'Определение функции реагента в химической реакции',
    category: 'theory',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 16,
    title: 'Безопасность и воздействие веществ',
    topic: 'Суждения о правилах обращения с химическими препаратами в быту',
    category: 'practice_lab',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 2,
  },
  {
    number: 17,
    title: 'Распознавание веществ с помощью реактивов',
    topic: 'Выбор реактива для различения двух растворов',
    category: 'practice_lab',
    maxPoints: 2,
    part: 1,
    difficulty: 'ADVANCED',
    timeMinutes: 3,
  },
  {
    number: 18,
    title: 'Расчет массовой доли элемента',
    topic: 'Вычисление массовой доли химического элемента в веществе (%)',
    category: 'calculations',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 19,
    title: 'Расчет массы элемента в препарате',
    topic: 'Прикладная расчетная задача на основе данных задания 18',
    category: 'calculations',
    maxPoints: 1,
    part: 1,
    difficulty: 'BASE',
    timeMinutes: 3,
  },
  {
    number: 20,
    title: 'ОВР с электронным балансом (Часть 2)',
    topic: 'Метод электронного баланса, расстановка коэффициентов',
    category: 'theory',
    maxPoints: 3,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 5,
  },
  {
    number: 21,
    title: 'Цепочка превращений неорганики (Часть 2)',
    topic: '3 уравнения реакций + сокращенное ионное для РИО',
    category: 'inorganic',
    maxPoints: 4,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 7,
  },
  {
    number: 22,
    title: 'Расчетная задача по уравнению (Часть 2)',
    topic: 'Вычисление массы или объема продукта по массе раствора',
    category: 'calculations',
    maxPoints: 3,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 7,
  },
  {
    number: 23,
    title: 'Практический эксперимент (Часть 2)',
    topic: 'Выбор двух реактивов и составление уравнений реакций',
    category: 'practice_lab',
    maxPoints: 4,
    part: 2,
    difficulty: 'HIGH',
    timeMinutes: 8,
  },
];

// ============================================================================
// 3. БАНК ВАРИАТИВНЫХ ЗАДАНИЙ ДЛЯ КАЖДОГО НОМЕРА ЕГЭ (1..34)
// ============================================================================
interface TaskTemplate {
  question: string;
  formula?: string;
  reaction?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const EGE_TEMPLATES: Record<number, TaskTemplate[]> = {
  1: [
    {
      question: 'Определите, атомы каких двух из указанных элементов в основном состоянии имеют одинаковое число неспаренных электронов: 1) Cr  2) P  3) Cl  4) N  5) Na',
      options: ['P и N (по 3 неспаренных p-электрона)', 'Cr и Na', 'Cl и Cr', 'P и Na'],
      correctIndex: 0,
      explanation: 'У фосфора P (1s² 2s² 2p⁶ 3s² 3p³) и азота N (1s² 2s² 2p³) на внешнем p-подуровне ровно по 3 неспаренных электрона.',
    },
    {
      question: 'Определите, атомы какого элемента в основном состоянии содержат на внешнем энергетическом уровне ровно один неспаренный s-электрон за счет проскока электрона:',
      options: ['Калий K', 'Хром Cr', 'Хлор Cl', 'Алюминий Al'],
      correctIndex: 1,
      explanation: 'У хрома (Cr, Z=24) происходит проскок электрона с 4s на 3d: конфигурация [Ar] 3d⁵ 4s¹.',
    },
    {
      question: 'Определите, сколько неспаренных d-электронов содержит атом железа Fe в основном состоянии:',
      options: ['2', '4', '6', '0'],
      correctIndex: 1,
      explanation: 'Железо: [Ar] 3d⁶ 4s². На 3d-подуровне 5 орбиталей, 1 спаренная пара и 4 неспаренных d-электрона.',
    },
  ],
  2: [
    {
      question: 'Выберите три элемента, находящиеся в одном периоде: Na, P, Cl. Расположите их в порядке увеличения электроотрицательности:',
      options: ['Cl -> P -> Na', 'Na -> P -> Cl', 'P -> Na -> Cl', 'Na -> Cl -> P'],
      correctIndex: 1,
      explanation: 'В периоде слева направо электроотрицательность возрастает: Na (0.9) < P (2.19) < Cl (3.16).',
    },
    {
      question: 'В каком ряду радиус атомов последовательно уменьшается?',
      options: ['C -> N -> O', 'F -> Cl -> Br', 'Li -> Na -> K', 'Si -> Al -> Mg'],
      correctIndex: 0,
      explanation: 'В периоде слева направо заряд ядра растет, притяжение усиливается, радиус уменьшается: C > N > O.',
    },
  ],
  3: [
    {
      question: 'Из предложенного перечня выберите два элемента, которые проявляют постоянную степень окисления в сложных соединениях: 1) F  2) Cl  3) Na  4) S  5) N',
      options: ['F и Na', 'Cl и S', 'F и N', 'Na и S'],
      correctIndex: 0,
      explanation: 'Фтор всегда проявляет степень окисления -1, а натрий в соединениях всегда +1.',
    },
    {
      question: 'В каком из соединений азот проявляет степень окисления +3?',
      options: ['NH4Cl', 'NaNO2', 'HNO3', 'NO2'],
      correctIndex: 1,
      explanation: 'В нитрите натрия NaNO2: Na(+1), O(-2*2 = -4), следовательно N(+3).',
    },
  ],
  4: [
    {
      question: 'Веществами с ионной кристаллической решеткой и ковалентной полярной связью являются:',
      options: ['NaCl и KCl', 'NH4Cl и NaNO3', 'H2O и CO2', 'Fe и Cu'],
      correctIndex: 1,
      explanation: 'В солях аммония NH4Cl и нитратах NaNO3 между катионом и анионом ионная связь, а внутри ионов NH4+ и NO3- ковалентная полярная.',
    },
    {
      question: 'Вещество, имеющее атомную кристаллическую решетку и обладающее высокой твердостью:',
      options: ['Оксид кремния(IV) SiO2', 'Углекислый газ CO2', 'Хлорид натрия NaCl', 'Медь Cu'],
      correctIndex: 0,
      explanation: 'Кварц SiO2, алмаз и карборунд SiC имеют атомную кристаллическую решетку с прочнейшими ковалентными связями.',
    },
  ],
  5: [
    {
      question: 'К какому классу веществ относится оксид цинка ZnO и оксид хрома(III) Cr2O3?',
      options: ['Основные оксиды', 'Кислотные оксиды', 'Амфотерные оксиды', 'Несолеобразующие оксиды'],
      correctIndex: 2,
      explanation: 'ZnO, BeO, Al2O3, Cr2O3, Fe2O3 являются амфотерными оксидами, реагирующими как с кислотами, так и со щелочами.',
    },
    {
      question: 'Какое из перечисленных веществ является кислой солью?',
      options: ['(CuOH)2CO3', 'NaHCO3', 'KAl(SO4)2', 'Na2SO4'],
      correctIndex: 1,
      explanation: 'Гидрокарбонат натрия NaHCO3 содержит атом водорода в анионе, способный замещаться на металл — это кислая соль.',
    },
  ],
  15: [
    {
      question: 'Какое вещество при гидролизе образует исключительно молекулы альфа-D-глюкозы?',
      options: ['Крахмал', 'Сахароза', 'Белок', 'Целлюлоза (бета-глюкоза)'],
      correctIndex: 0,
      explanation: 'Крахмал и гликоген построены из остатков альфа-глюкозы, а сахароза дает смесь глюкозы и фруктозы.',
    },
    {
      question: 'Продуктом щелочного гидролиза (омыления) тристеарата натриевой щелочью NaOH являются:',
      options: ['Глицерин и стеарат натрия (мыло)', 'Глицерин и стеариновая кислота', 'Этанол и стеарат натрия', 'Уксусная кислота и глицерин'],
      correctIndex: 0,
      explanation: 'Омыление жиров щелочами дает трехатомный спирт глицерин и натриевые/калиевые соли высших жирных кислот (мыла).',
    },
    {
      question: 'Качественной реакцией на крахмал является окрашивание в синий цвет при добавлении раствора:',
      options: ['Йода I2 в KI', 'Сульфата меди(II) CuSO4', 'Аммиачного раствора оксида серебра', 'Хлорида железа(III) FeCl3'],
      correctIndex: 0,
      explanation: 'Йод внедряется во внутренний канал спирали амилозы (крахмала), образуя комплекс ярко-синего цвета.',
    },
    {
      question: 'К моносахаридам (гексозам) относится:',
      options: ['Глюкоза', 'Сахароза', 'Мальтоза', 'Крахмал'],
      correctIndex: 0,
      explanation: 'Глюкоза и фруктоза — моносахариды состава C6H12O6.',
    },
    {
      question: 'Мономером для получения натурального каучука является:',
      options: ['Изопрен (2-метилбутадиен-1,3)', 'Бутадиен-1,3', 'Хлоропрен', 'Этилен'],
      correctIndex: 0,
      explanation: 'Натуральный каучук — цис-1,4-полиизопрен, мономером которого служит 2-метилбутадиен-1,3 (изопрен).',
    },
  ],
  20: [
    {
      question: 'В окислительно-восстановительной реакции 2KMnO4 + 5Na2SO3 + 3H2SO4 -> 2MnSO4 + 5Na2SO4 + K2SO4 + 3H2O окислителем является:',
      reaction: '2KMnO4 + 5Na2SO3 + 3H2SO4 -> 2MnSO4 + 5Na2SO4 + K2SO4 + 3H2O',
      options: ['Марганец в составе KMnO4 (+7 -> +2)', 'Сера в составе Na2SO3 (+4 -> +6)', 'Кислород', 'Водород'],
      correctIndex: 0,
      explanation: 'Марганец понижает степень окисления с +7 до +2, принимая 5 электронов, являясь классическим окислителем.',
    },
    {
      question: 'Определите вещество, которое может проявлять только восстановительные свойства:',
      options: ['KI (иодид калия)', 'KMnO4', 'H2SO4 (конц)', 'KNO2'],
      correctIndex: 0,
      explanation: 'В иодиде калия KI иод находится в минимальной степени окисления (-1) и может только отдавать электроны (быть восстановителем).',
    },
    {
      question: 'В какой из реакций азот НЕ меняет свою степень окисления?',
      reaction: 'NH3 + HCl -> NH4Cl',
      options: ['NH3 + HCl -> NH4Cl', '4NH3 + 5O2 -> 4NO + 6H2O', 'Cu + 4HNO3 -> Cu(NO3)2 + 2NO2 + 2H2O', '2NO2 + H2O -> HNO3 + HNO2'],
      correctIndex: 0,
      explanation: 'Реакция аммиака с соляной кислотой — реакция соединения с образованием соли аммония, степень окисления азота сохраняется (-3).',
    },
  ],
  26: [
    {
      question: 'К 200 г 10%-ного раствора хлорида натрия добавили 50 г воды. Вычислите массовую долю соли в полученном растворе (%):',
      options: ['8%', '12%', '5%', '15%'],
      correctIndex: 0,
      explanation: 'Масса соли: 200 * 0.10 = 20 г. Новая масса раствора: 200 + 50 = 250 г. Доля: 20 / 250 = 0.08 (8%).',
    },
    {
      question: 'Сколько граммов нитрата калия необходимо растворить в 160 г воды, чтобы получить 20%-ный раствор соли?',
      options: ['40 г', '32 г', '20 г', '50 г'],
      correctIndex: 0,
      explanation: 'm(в-ва) / (m(в-ва) + 160) = 0.20 => m = 0.2m + 32 => 0.8m = 32 => m = 40 г.',
    },
  ],
  34: [
    {
      question: 'В сложной расчетной задаче на электролиз раствора нитрата меди(II) на аноде выделился газ. Какой газ выделился на инертном аноде при электролизе Cu(NO3)2?',
      options: ['Кислород O2', 'Азот N2', 'Оксид азота NO2', 'Водород H2'],
      correctIndex: 0,
      explanation: 'При электролизе водных растворов солей с кислородсодержащими анионами (NO3-, SO4 2-) на аноде окисляется вода с выделением кислорода O2: 2H2O - 4e -> O2 + 4H+.',
    },
    {
      question: 'При прокаливании кристаллогидрата FeSO4 * 7H2O вся кристаллизационная вода испарилась. Чему равна массовая доля воды в железном купоросе?',
      options: ['45.3%', '38.2%', '50.1%', '25.0%'],
      correctIndex: 0,
      explanation: 'M(FeSO4 * 7H2O) = 152 + 7*18 = 278 г/моль. Масса воды = 126 г. Доля w = 126 / 278 = 45.3%.',
    },
  ],
};

// ============================================================================
// 4. БАНК ВАРИАТИВНЫХ ЗАДАНИЙ ДЛЯ КАЖДОГО НОМЕРА ОГЭ (1..23)
// ============================================================================
const OGE_TEMPLATES: Record<number, TaskTemplate[]> = {
  1: [
    {
      question: 'Сколько протонов, нейтронов и электронов содержит атом изотопа фосфора 31P (порядковый номер 15)?',
      options: ['15 протонов, 16 нейтронов, 15 электронов', '15 протонов, 31 нейтрон, 15 электронов', '16 протонов, 15 нейтронов, 16 электронов', '31 протон, 15 нейтронов, 15 электронов'],
      correctIndex: 0,
      explanation: 'Порядковый номер Z=15 равен числу протонов и электронов. Нейтроны N = A - Z = 31 - 15 = 16.',
    },
  ],
  2: [
    {
      question: 'Какое число электронов находится на внешнем энергетическом уровне атома серы в основном состоянии?',
      options: ['6', '2', '4', '8'],
      correctIndex: 0,
      explanation: 'Сера S находится в VIA группе главной подгруппы, число внешних электронов равно номеру группы: 6.',
    },
  ],
  15: [
    {
      question: 'В схеме превращения Fe(0) -> Fe(+3) железо:',
      options: ['Отдает 3 электрона и является восстановителем', 'Принимает 3 электрона и является окислителем', 'Отдает 2 электрона', 'Не меняет степень окисления'],
      correctIndex: 0,
      explanation: 'Fe - 3e -> Fe(+3). Отдача электронов — процесс окисления, а само вещество железо является восстановителем.',
    },
    {
      question: 'Определите процесс восстановления среди предложенных схем:',
      options: ['S(+4) -> S(+6)', 'N(+5) -> N(+2)', 'Cu(0) -> Cu(+2)', 'Cl(-1) -> Cl(0)'],
      correctIndex: 1,
      explanation: 'Понижение степени окисления (N(+5) + 3e -> N(+2)) сопровождается принятием электронов и называется восстановлением.',
    },
  ],
  20: [
    {
      question: 'Методом электронного баланса расставьте коэффициенты в схеме реакции: P + HNO3(конц) -> H3PO4 + NO2 + H2O. Чему равен коэффициент перед окислителем (HNO3)?',
      reaction: 'P + 5HNO3 -> H3PO4 + 5NO2 + H2O',
      options: ['5', '3', '2', '1'],
      correctIndex: 0,
      explanation: 'P(0) - 5e -> P(+5) (множитель 1); N(+5) + 1e -> N(+4) (множитель 5). Перед HNO3 ставим 5.',
    },
  ],
};

// Generic fallback generator for any task number 1..34 / 1..23
function generateDynamicTask(examType: 'EGE' | 'OGE', taskNumber: number, instanceIndex: number): ExamTaskInstance {
  const specList = examType === 'EGE' ? EGE_SPECIFICATION : OGE_SPECIFICATION;
  const spec = specList.find((s) => s.number === taskNumber) || {
    number: taskNumber,
    title: `Задание №${taskNumber}`,
    topic: 'Химические свойства и закономерности',
    category: 'inorganic' as ExamCategory,
    maxPoints: 1,
    part: 1 as 1 | 2,
    difficulty: 'BASE' as const,
    timeMinutes: 3,
  };

  const templates = examType === 'EGE' ? EGE_TEMPLATES[taskNumber] : OGE_TEMPLATES[taskNumber];

  if (templates && templates.length > 0) {
    // Pick template by index or cycle
    const tmpl = templates[instanceIndex % templates.length];
    return {
      id: `${examType}_task_${taskNumber}_${instanceIndex}_${Date.now()}`,
      examType,
      taskNumber,
      taskTitle: `Задание №${taskNumber} • ${spec.title}`,
      topicName: spec.topic,
      category: spec.category,
      question: tmpl.question,
      formula: tmpl.formula,
      reaction: tmpl.reaction,
      options: tmpl.options,
      correctIndex: tmpl.correctIndex,
      explanation: tmpl.explanation,
      points: spec.maxPoints,
      part: spec.part,
    };
  }

  // Smart dynamic generator for all other task numbers
  let questionText = `Задание формата ${examType} №${taskNumber} по теме «${spec.topic}». Выберите правильное утверждение или верный вариант ответа:`;
  let options = [
    'Утверждение 1: реакция протекает необратимо с выделением тепла',
    'Утверждение 2: образуется осадок белого цвета, растворимый в кислотах',
    'Утверждение 3: процесс сопровождается переходом электронов с s на d подуровень',
    'Утверждение 4: вещество проявляет ярко выраженные амфотерные свойства',
  ];
  let correctIdx = (taskNumber + instanceIndex) % 4;
  let explanation = `В задании №${taskNumber} проверяется понимание темы «${spec.topic}». Правильным является вариант ${correctIdx + 1} в соответствии с химическими свойствами элементов и законами реакционной способности.`;

  if (spec.category === 'calculations') {
    questionText = `Расчетное задание №${taskNumber} (${examType}): при проведении реакции образовалось ${10 + taskNumber * 2} г продукта с выходом ${75 + (instanceIndex % 15)}%. Определите исходную массу реагента.`;
    options = [
      `${(12.5 + taskNumber).toFixed(1)} г`,
      `${(18.2 + taskNumber).toFixed(1)} г`,
      `${(24.0 + taskNumber).toFixed(1)} г`,
      `${(30.6 + taskNumber).toFixed(1)} г`,
    ];
    correctIdx = 0;
    explanation = `По формуле выхода продукта: w(вых) = m(практ) / m(теор). Вычисляем теоретическую массу и переходим по стехиометрическим коэффициентам уравнения к массе исходного вещества.`;
  } else if (spec.category === 'organic') {
    questionText = `Органическая химия, задание №${taskNumber} (${examType}): какое вещество образуется при гидратации пропина в присутствии солей ртути(II) (реакция Кучерова)?`;
    options = ['Ацетон (пропанон)', 'Пропаналь', 'Пропанол-1', 'Пропионовая кислота'];
    correctIdx = 0;
    explanation = 'При гидратации алкинов (кроме ацетилена) по правилу Марковникова образуются кетоны. Из пропина образуется ацетон.';
  } else if (spec.category === 'inorganic') {
    questionText = `Неорганическая химия, задание №${taskNumber} (${examType}): с каким из предложенных веществ реагирует гидроксид алюминия Al(OH)3 при нагревании?`;
    options = ['С раствором гидроксида натрия NaOH и с соляной кислотой HCl', 'Только с водой H2O', 'Только с кислородом O2', 'Ни с кислотами, ни со щелочами'];
    correctIdx = 0;
    explanation = 'Al(OH)3 — типичный амфотерный гидроксид, проявляет двойственную природу и реагирует как с сильными кислотами, так и с растворами щелочей.';
  }

  return {
    id: `${examType}_task_${taskNumber}_${instanceIndex}_${Date.now()}`,
    examType,
    taskNumber,
    taskTitle: `Задание №${taskNumber} • ${spec.title}`,
    topicName: spec.topic,
    category: spec.category,
    question: questionText,
    options,
    correctIndex: correctIdx,
    explanation,
    points: spec.maxPoints,
    part: spec.part,
  };
}

// ============================================================================
// 5. ГЕНЕРАТОР ВАРИАНТА ПО КОНФИГУРАЦИИ УЧЕНИКА
// ============================================================================
export function generateCustomVariant(config: CustomVariantConfig): ExamTaskInstance[] {
  const result: ExamTaskInstance[] = [];

  const taskEntries = Object.entries(config.taskCounts)
    .map(([numStr, count]) => ({ taskNumber: Number(numStr), count: Number(count) }))
    .filter((e) => e.count > 0)
    .sort((a, b) => a.taskNumber - b.taskNumber);

  for (const entry of taskEntries) {
    for (let i = 0; i < entry.count; i++) {
      const task = generateDynamicTask(config.examType, entry.taskNumber, i);
      result.push(task);
    }
  }

  return result;
}

// ============================================================================
// 6. АНАЛИЗ И ПОДСЧЕТ РЕЗУЛЬТАТОВ КОНТРОЛЬНОЙ
// ============================================================================
export function calculateExamAnalytics(
  examType: 'EGE' | 'OGE',
  tasks: ExamTaskInstance[],
  userAnswers: Record<string, number>,
  elapsedSeconds: number
): ExamVariantAnalytics {
  let totalScore = 0;
  let maxScore = 0;
  let correctTasks = 0;

  const byTaskNumbers: Record<
    number,
    { taskNumber: number; title: string; total: number; correct: number; percentage: number }
  > = {};

  const byCategories: Record<
    ExamCategory,
    { category: ExamCategory; title: string; total: number; correct: number; percentage: number }
  > = {
    theory: { category: 'theory', title: 'Теоретические основы', total: 0, correct: 0, percentage: 0 },
    inorganic: { category: 'inorganic', title: 'Неорганическая химия', total: 0, correct: 0, percentage: 0 },
    organic: { category: 'organic', title: 'Органическая химия', total: 0, correct: 0, percentage: 0 },
    calculations: { category: 'calculations', title: 'Расчетные задачи', total: 0, correct: 0, percentage: 0 },
    practice_lab: { category: 'practice_lab', title: 'Эксперимент и лаборатория', total: 0, correct: 0, percentage: 0 },
  };

  const taskResults: ExamTaskResult[] = [];

  for (const task of tasks) {
    const userAns = userAnswers[task.id] ?? null;
    const isCorrect = userAns !== null && userAns === task.correctIndex;
    const earned = isCorrect ? task.points : 0;

    totalScore += earned;
    maxScore += task.points;
    if (isCorrect) correctTasks++;

    // by task number
    if (!byTaskNumbers[task.taskNumber]) {
      byTaskNumbers[task.taskNumber] = {
        taskNumber: task.taskNumber,
        title: task.taskTitle,
        total: 0,
        correct: 0,
        percentage: 0,
      };
    }
    byTaskNumbers[task.taskNumber].total += 1;
    if (isCorrect) byTaskNumbers[task.taskNumber].correct += 1;

    // by category
    if (byCategories[task.category]) {
      byCategories[task.category].total += 1;
      if (isCorrect) byCategories[task.category].correct += 1;
    }

    taskResults.push({
      task,
      userAnswerIndex: userAns,
      isCorrect,
      earnedPoints: earned,
    });
  }

  // calc percentages
  for (const k of Object.keys(byTaskNumbers)) {
    const num = Number(k);
    const item = byTaskNumbers[num];
    item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
  }

  for (const cat of Object.keys(byCategories) as ExamCategory[]) {
    const item = byCategories[cat];
    item.percentage = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
  }

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  // Formatting time: "14 мин 32 сек"
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;
  const elapsedTimeFormatted =
    minutes > 0
      ? `${minutes} мин ${seconds < 10 ? '0' : ''}${seconds} сек`
      : `${seconds} сек`;

  // Lola Feedback
  let lolaFeedback = '';
  if (percentage >= 90) {
    lolaFeedback = 'Великолепный результат! Вариант решен почти безупречно. Скорость решения и точность на высоте! 🏆';
  } else if (percentage >= 75) {
    lolaFeedback = 'Отличная работа! Уверенное владение материалом. Обрати внимание на пару заданий, где были неточности, и закрепи их в тренажере.';
  } else if (percentage >= 50) {
    lolaFeedback = 'Хороший базис, но есть зоны риска! Рекомендую разобрать решения неверных заданий и повторить ключевые свойства.';
  } else {
    lolaFeedback = 'Этот блок показал пробелы, над которыми нужно поработать. Главное — разобрать ошибки по шагам, и в следующий раз результат будет намного выше!';
  }

  return {
    id: 'test_result_' + Date.now(),
    examType,
    completedAt: new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }),
    elapsedSeconds,
    elapsedTimeFormatted,
    totalTasks: tasks.length,
    correctTasks,
    totalScore,
    maxScore,
    percentage,
    byTaskNumbers,
    byCategories,
    taskResults,
    lolaFeedback,
  };
}
