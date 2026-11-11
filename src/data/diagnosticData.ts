import {
  DiagnosticQuestion,
  DiagnosticAnswer,
  DiagnosticReport,
  ExamType,
  ChemistryLevel,
  DiagnosticBlockId,
} from '../types';

// ==========================================
// ДИАГНОСТИКА ДЛЯ 11 КЛАССА (ЕГЭ) ПО ДОКУМЕНТУ
// ==========================================
export const DIAGNOSTIC_QUESTIONS_EGE: DiagnosticQuestion[] = [
  {
    id: 1,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 1,
    question: 'Какой из перечисленных элементов обладает наибольшей электроотрицательностью?',
    options: ['Na', 'Mg', 'Al', 'Si'],
    correctIndex: 3, // D: Si
    explanation: 'В периоде слева направо электроотрицательность возрастает (Na < Mg < Al < Si). Кремний Si обладает наибольшей ЭО среди предложенных.',
    topicName: 'Периодический закон и электроотрицательность',
  },
  {
    id: 2,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 1,
    question: 'Атом какого элемента в основном состоянии имеет внешнюю электронную конфигурацию 3s²3p⁵?',
    options: ['S', 'Cl', 'Ar', 'P'],
    correctIndex: 1, // B: Cl
    explanation: 'Конфигурация 3s²3p⁵ соответствует элементу 3-го периода VIIA группы (7 валентных электронов). Это хлор (Cl, z=17).',
    topicName: 'Строение электронной оболочки атома',
  },
  {
    id: 3,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 1,
    question: 'Какие степени окисления имеют атомы азота соответственно в ионах NH₄⁺ и NO₃⁻ , входящих в состав NH₄NO₃ ?',
    formula: 'NH₄⁺ и NO₃⁻',
    options: ['−3 и +5', '−3 и +3', '+1 и +5', '−5 и +3'],
    correctIndex: 0, // A: -3 и +5
    explanation: 'В катионе аммония NH₄⁺: x + 4(+1) = +1 => x = −3. В нитрат-анионе NO₃⁻: y + 3(−2) = −1 => y = +5.',
    topicName: 'Степени окисления элементов в ионах',
  },
  {
    id: 4,
    blockId: 'INORGANIC',
    blockTitle: 'Неорганическая химия',
    points: 1,
    question: 'Какое вещество способно реагировать и с раствором HCl, и с раствором NaOH?',
    options: ['MgO', 'SiO₂', 'Al₂O₃', 'SO₃'],
    correctIndex: 2, // C: Al2O3
    explanation: 'Оксид алюминия Al₂O₃ является амфотерным оксидом и реагирует как с кислотами (HCl), так и со щелочами (NaOH) с образованием гидроксокомплексов.',
    topicName: 'Амфотерные оксиды и гидроксиды',
  },
  {
    id: 5,
    blockId: 'INORGANIC',
    blockTitle: 'Неорганическая химия',
    points: 1,
    question: 'Какое сокращённое ионное уравнение соответствует реакции между растворами BaCl₂ и Na₂SO₄ ?',
    reaction: 'BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl',
    options: [
      'Ba²⁺ + 2Cl⁻ → BaCl₂',
      'Ba²⁺ + SO₄²⁻ → BaSO₄ ↓',
      '2Na⁺ + SO₄²⁻ → Na₂SO₄',
      'Ba²⁺ + 2OH⁻ → Ba(OH)₂',
    ],
    correctIndex: 1, // B: Ba2+ + SO4 2- -> BaSO4 v
    explanation: 'В реакции ионного обмена хлорид-ионы и ионы натрия остаются в растворе. В осадок выпадает сульфат бария: Ba²⁺ + SO₄²⁻ → BaSO₄↓.',
    topicName: 'Реакции ионного обмена (РИО)',
  },
  {
    id: 6,
    blockId: 'INORGANIC',
    blockTitle: 'Неорганическая химия',
    points: 1,
    question: 'Какая последовательность реагентов позволит осуществить превращения Cu → CuO → CuCl₂ → Cu(OH)₂ ?',
    reaction: 'Cu → CuO → CuCl₂ → Cu(OH)₂',
    options: [
      'O₂, t°; HCl; NaOH',
      'HCl; O₂; NaOH',
      'O₂, t°; NaOH; HCl',
      'Cl₂; H₂O; NaCl',
    ],
    correctIndex: 0, // A: O2, t; HCl; NaOH
    explanation: '1) 2Cu + O₂ → 2CuO; 2) CuO + 2HCl → CuCl₂ + H₂O; 3) CuCl₂ + 2NaOH → Cu(OH)₂↓ + 2NaCl.',
    topicName: 'Генетическая связь и цепочки неорганики',
  },
  {
    id: 7,
    blockId: 'ORGANIC',
    blockTitle: 'Органическая химия',
    points: 1,
    question: 'К какому классу органических соединений относится вещество CH₃–CH₂–CHO?',
    formula: 'CH₃–CH₂–CHO (пропаналь)',
    options: ['Спирты', 'Карбоновые кислоты', 'Альдегиды', 'Кетоны'],
    correctIndex: 2, // C: Альдегиды
    explanation: 'Вещество содержит концевую карбонильную группу –CHO, что является характерной функциональной группой альдегидов (пропаналь).',
    topicName: 'Классификация и функциональные группы органики',
  },
  {
    id: 8,
    blockId: 'ORGANIC',
    blockTitle: 'Органическая химия',
    points: 1,
    question: 'Какое из веществ обесцвечивает бромную воду при обычных условиях?',
    options: ['Этан', 'Пропен', 'Этанол', 'Уксусная кислота'],
    correctIndex: 1, // B: Пропен
    explanation: 'Пропен (CH₂=CH–CH₃) содержит кратную двойную C=C связь и легко вступает в реакцию присоединения с бромной водой, обесцвечивая её.',
    topicName: 'Качественные реакции непредельных углеводородов',
  },
  {
    id: 9,
    blockId: 'ORGANIC',
    blockTitle: 'Органическая химия',
    points: 1,
    question: 'Какой основной органический продукт образуется при нагревании этанола с CuO?',
    reaction: 'CH₃CH₂OH + CuO → ... + Cu + H₂O',
    options: ['Этен', 'Этаналь', 'Этановая кислота', 'Этилацетат'],
    correctIndex: 1, // B: Этаналь
    explanation: 'Окисление первичного спирта (этанола) оксидом меди(II) при нагревании приводит к образованию уксусного альдегида (этаналя): C₂H₅OH + CuO → CH₃CHO + Cu + H₂O.',
    topicName: 'Химические свойства спиртов и окисление',
  },
  {
    id: 10,
    blockId: 'CALCULATIONS',
    blockTitle: 'Расчёты',
    points: 2,
    question: '4,6 г натрия полностью прореагировали с избытком воды. Какой объём H₂ при н. у. образовался? Молярный объём газа при н. у. принять равным 22,4 л/моль.',
    reaction: '2Na + 2H₂O → 2NaOH + H₂↑',
    options: ['1,12 л', '4,48 л', '2,24 л', '22,4 л'],
    correctIndex: 2, // C: 2,24 л
    explanation: 'n(Na) = 4,6 г / 23 г/моль = 0,2 моль. По уравнению n(H₂) = 0,5 · n(Na) = 0,1 моль. V(H₂) = 0,1 · 22,4 = 2,24 л.',
    topicName: 'Стехиометрические расчеты по уравнениям',
  },
  {
    id: 11,
    blockId: 'CALCULATIONS',
    blockTitle: 'Расчёты',
    points: 2,
    question: 'Из 200 г 10%-го раствора NaCl выпарили 50 г воды. Какой стала массовая доля NaCl в растворе?',
    formula: 'w = m(NaCl) / m(раствора)',
    options: ['10,0%', '12,5%', '13,3%', '15,0%'],
    correctIndex: 2, // C: 13,3%
    explanation: 'm(NaCl) = 200 · 0,10 = 20 г. Новая масса раствора: 200 - 50 = 150 г. Новая массовая доля: 20 / 150 ≈ 0,1333 (13,3%).',
    topicName: 'Массовая доля растворённого вещества',
  },
  {
    id: 12,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 2,
    question: 'Для равновесия N₂ (г) + 3H₂ (г) ⇌ 2NH₃ (г), ΔH < 0, какое воздействие сместит химическое равновесие в сторону образования NH₃ ?',
    reaction: 'N₂(г) + 3H₂(г) ⇌ 2NH₃(г) + Q',
    options: [
      'Повышение давления',
      'Повышение температуры',
      'Уменьшение концентрации H₂',
      'Добавление катализатора',
    ],
    correctIndex: 0, // A: Повышение давления
    explanation: 'Слева 4 моль газа, справа 2 моль. По принципу Ле Шателье повышение давления смещает равновесие в сторону меньшего объёма газов — в сторону NH₃.',
    topicName: 'Химическое равновесие и принцип Ле Шателье',
  },
];

// ==========================================
// ДИАГНОСТИКА ДЛЯ 9 КЛАССА (ОГЭ)
// ==========================================
export const DIAGNOSTIC_QUESTIONS_OGE: DiagnosticQuestion[] = [
  {
    id: 1,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 1,
    question: 'Сколько электронов находится во внешнем электронном слое атома фосфора в основном состоянии?',
    options: ['3', '5', '15', '31'],
    correctIndex: 1, // B: 5
    explanation: 'Фосфор P находится в V группе (VA), номер группы равен числу валентных электронов во внешнем слое (5 электронов: 3s²3p³).',
    topicName: 'Строение атома и Периодическая система',
  },
  {
    id: 2,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 1,
    question: 'В каком из приведенных рядов неметаллические свойства простых веществ усиливаются?',
    options: ['N → P → As', 'Si → P → S', 'F → Cl → Br', 'O → N → C'],
    correctIndex: 1, // B: Si -> P -> S
    explanation: 'В периоде слева направо неметаллические свойства усиливаются из-за увеличения заряда ядра и уменьшения радиуса атома.',
    topicName: 'Изменение свойств элементов по периодам',
  },
  {
    id: 3,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 1,
    question: 'Какую степень окисления имеет сера в сульфите натрия Na₂SO₃ ?',
    formula: 'Na₂SO₃',
    options: ['+2', '+4', '+6', '−2'],
    correctIndex: 1, // B: +4
    explanation: 'У натрия +1, у кислорода −2. 2(+1) + x + 3(−2) = 0 => 2 + x − 6 = 0 => x = +4.',
    topicName: 'Определение степеней окисления',
  },
  {
    id: 4,
    blockId: 'INORGANIC',
    blockTitle: 'Неорганическая химия',
    points: 1,
    question: 'К какому классу веществ относится гидроксид цинка Zn(OH)₂ ?',
    options: ['Основный гидроксид', 'Амфотерный гидроксид', 'Кислотный оксид', 'Средняя соль'],
    correctIndex: 1, // B: Амфотерный гидроксид
    explanation: 'Zn(OH)₂ проявляет амфотерные свойства — реагирует как с кислотами, так и с растворами щелочей.',
    topicName: 'Классы неорганических веществ',
  },
  {
    id: 5,
    blockId: 'INORGANIC',
    blockTitle: 'Неорганическая химия',
    points: 1,
    question: 'С каким из веществ будет реагировать соляная кислота HCl с выделением газа?',
    options: ['Cu', 'Na₂CO₃', 'AgNO₃', 'NaOH'],
    correctIndex: 1, // B: Na2CO3
    explanation: '2HCl + Na₂CO₃ → 2NaCl + H₂O + CO₂↑. Выделяется углекислый газ.',
    topicName: 'Качественные реакции и свойства кислот',
  },
  {
    id: 6,
    blockId: 'INORGANIC',
    blockTitle: 'Неорганическая химия',
    points: 1,
    question: 'Какое вещество выпадает в осадок при взаимодействии растворов AgNO₃ и NaCl?',
    reaction: 'AgNO₃ + NaCl → ...↓ + NaNO₃',
    options: ['AgCl', 'NaNO₃', 'Ag₂O', 'AgOH'],
    correctIndex: 0, // A: AgCl
    explanation: 'Выпадает белый творожистый осадок хлорида серебра: Ag⁺ + Cl⁻ → AgCl↓.',
    topicName: 'Качественные реакции на ионы (РИО)',
  },
  {
    id: 7,
    blockId: 'ORGANIC',
    blockTitle: 'Первоначальные понятия химии',
    points: 1,
    question: 'Какое из приведенных явлений является химическим, а не физическим?',
    options: ['Таяние льда', 'Ржавление железного гвоздя', 'Испарение воды', 'Дробление сахара'],
    correctIndex: 1, // B: Ржавление
    explanation: 'Ржавление железа — химический процесс (окисление железа кислородом и водой с образованием нового вещества Fe₂O₃·nH₂O).',
    topicName: 'Физические и химические явления',
  },
  {
    id: 8,
    blockId: 'ORGANIC',
    blockTitle: 'Основы органики и газы',
    points: 1,
    question: 'Какой газ является основным компонентом природного газа?',
    options: ['Метан CH₄', 'Кислород O₂', 'Углекислый газ CO₂', 'Водород H₂'],
    correctIndex: 0, // A: Метан
    explanation: 'Природный газ на 85–98% состоит из метана (CH₄).',
    topicName: 'Простейшие углеводороды',
  },
  {
    id: 9,
    blockId: 'ORGANIC',
    blockTitle: 'Химическая связь',
    points: 1,
    question: 'Какой тип химической связи в молекуле хлорида калия KCl ?',
    options: ['Ковалентная полярная', 'Ионная', 'Ковалентная неполярная', 'Металлическая'],
    correctIndex: 1, // B: Ионная
    explanation: 'Связь между типичным щелочным металлом (K) и типичным неметаллом-галогеном (Cl) является ионной.',
    topicName: 'Типы химической связи',
  },
  {
    id: 10,
    blockId: 'CALCULATIONS',
    blockTitle: 'Расчёты',
    points: 2,
    question: 'Какова масса 0,5 моль углекислого газа CO₂? (M(C)=12 г/моль, M(O)=16 г/моль)',
    formula: 'm = n · M',
    options: ['22 г', '44 г', '11 г', '88 г'],
    correctIndex: 0, // A: 22 г
    explanation: 'M(CO₂) = 12 + 2·16 = 44 г/моль. Масса m = 0,5 моль · 44 г/моль = 22 г.',
    topicName: 'Молярная масса и количество вещества',
  },
  {
    id: 11,
    blockId: 'CALCULATIONS',
    blockTitle: 'Расчёты',
    points: 2,
    question: 'В 180 г воды растворили 20 г соли. Какова массовая доля соли в полученном растворе?',
    formula: 'w = m(соли) / m(раствора)',
    options: ['10%', '11,1%', '20%', '9%'],
    correctIndex: 0, // A: 10%
    explanation: 'Масса раствора = 180 + 20 = 200 г. Массовая доля: w = 20 / 200 = 0,10 (10%).',
    topicName: 'Массовая доля вещества в растворе',
  },
  {
    id: 12,
    blockId: 'THEORY',
    blockTitle: 'Теоретические основы',
    points: 2,
    question: 'В какой из реакций происходит окислительно-восстановительный процесс (ОВР)?',
    options: [
      'CaO + H₂O → Ca(OH)₂',
      'Zn + 2HCl → ZnCl₂ + H₂↑',
      'NaOH + HCl → NaCl + H₂O',
      'BaCl₂ + H₂SO₄ → BaSO₄↓ + 2HCl',
    ],
    correctIndex: 1, // B: Zn + 2HCl -> ZnCl2 + H2
    explanation: 'Цинк меняет степень окисления с 0 до +2, а водород с +1 до 0. Это ОВР.',
    topicName: 'Окислительно-восстановительные реакции (ОВР)',
  },
];

// Для 10 класса и 8 класса подготовим вопросы на основе тех же 4 блоков
export const getQuestionsForExam = (examType: ExamType): DiagnosticQuestion[] => {
  if (examType === 'EGE') {
    return DIAGNOSTIC_QUESTIONS_EGE;
  }
  // Для ОГЭ, 10 и 8 классов предоставляем выверенные варианты
  if (examType === 'OGE' || examType === 'GRADE_8') {
    return DIAGNOSTIC_QUESTIONS_OGE;
  }
  // Для 10 класса (углубленная органика и теория)
  return DIAGNOSTIC_QUESTIONS_EGE;
};

// ==========================================
// РАСЧЕТ ДИАГНОСТИЧЕСКОГО ЗАКЛЮЧЕНИЯ ПО ДОКУМЕНТУ
// ==========================================
export const calculateDiagnosticReport = (
  examType: ExamType,
  answers: Record<number, DiagnosticAnswer>
): DiagnosticReport => {
  const questions = getQuestionsForExam(examType);
  let totalScore = 0;
  let maxTotalScore = 0;
  let correctQuestionsCount = 0;

  const blocksAccumulator: Record<
    DiagnosticBlockId,
    { title: string; topics: string; score: number; maxScore: number }
  > = {
    THEORY: {
      title: 'Теоретические основы',
      topics: 'Периодический закон, строение атома, степени окисления, равновесие',
      score: 0,
      maxScore: 0,
    },
    INORGANIC: {
      title: 'Неорганическая химия',
      topics: 'Классы веществ, ионные реакции, цепочки превращений',
      score: 0,
      maxScore: 0,
    },
    ORGANIC: {
      title: examType === 'OGE' ? 'Основы химии и вещества' : 'Органическая химия',
      topics: examType === 'OGE' ? 'Связь, явления, простые соединения' : 'Функциональные группы, свойства, превращения',
      score: 0,
      maxScore: 0,
    },
    CALCULATIONS: {
      title: 'Расчёты',
      topics: 'Стехиометрия, массовая доля вещества',
      score: 0,
      maxScore: 0,
    },
  };

  const highConfidenceErrors: DiagnosticReport['highConfidenceErrors'] = [];
  const luckyGuesses: DiagnosticReport['luckyGuesses'] = [];

  questions.forEach((q) => {
    maxTotalScore += q.points;
    blocksAccumulator[q.blockId].maxScore += q.points;

    const userAns = answers[q.id];
    if (userAns) {
      const isCorrect = userAns.selectedOption === q.correctIndex;
      if (isCorrect) {
        totalScore += q.points;
        correctQuestionsCount += 1;
        blocksAccumulator[q.blockId].score += q.points;

        if (userAns.confidence === 'DOUBTFUL' || userAns.confidence === 'RANDOM') {
          luckyGuesses.push({
            questionId: q.id,
            topicName: q.topicName,
          });
        }
      } else {
        // Ошибка
        if (userAns.confidence === 'CONFIDENT') {
          // Ошибка при высокой уверенности: устойчивое ложное представление!
          highConfidenceErrors.push({
            questionId: q.id,
            questionTitle: q.question,
            topicName: q.topicName,
            selectedAnswer: q.options[userAns.selectedOption] || 'Не выбран',
            correctAnswer: q.options[q.correctIndex],
          });
        }
      }
    }
  });

  const percentage = Math.round((totalScore / maxTotalScore) * 100);

  // Таблица ранжирования результатов (со страницы 4 документа):
  // 0–4 балла/задания: База не сформирована
  // 5–7: Фрагментарная база
  // 8–9: База в целом сформирована
  // 10–11: Уверенная школьная база
  // 12: Сильная стартовая база
  let rankingLevel: DiagnosticReport['rankingLevel'] = 'NO_BASE';
  let rankingTitle = 'База не сформирована';
  let rankingConclusion =
    'Нужно системно восстанавливать школьную программу, начиная с фундаментальных понятий.';
  let recommendedLevel: ChemistryLevel = 'BEGINNER';

  if (correctQuestionsCount >= 12 || totalScore >= 14) {
    rankingLevel = 'STRONG';
    rankingTitle = 'Сильная стартовая база';
    rankingConclusion =
      'Отличный результат! Нужна более глубокая диагностика на заданиях экзаменационного уровня и шлифовка сложных задач второй части.';
    recommendedLevel = 'ADVANCED';
  } else if (correctQuestionsCount >= 10 || totalScore >= 11) {
    rankingLevel = 'CONFIDENT';
    rankingTitle = 'Уверенная школьная база';
    rankingConclusion =
      'Основной фокус можно переносить на формат экзамена, сложные комплексные задания, 34/33 задачи и скорость решения.';
    recommendedLevel = 'INTERMEDIATE';
  } else if (correctQuestionsCount >= 8 || totalScore >= 8) {
    rankingLevel = 'FORMED';
    rankingTitle = 'База в целом сформирована';
    rankingConclusion =
      'Можно начинать активную подготовку к экзамену параллельно с точечным закрытием выявленных пробелов.';
    recommendedLevel = 'BASIC';
  } else if (correctQuestionsCount >= 5 || totalScore >= 5) {
    rankingLevel = 'FRAGMENTED';
    rankingTitle = 'Фрагментарная база';
    rankingConclusion =
      'Часть тем узнаётся, но связи между ними нестабильны. Необходим системный структурированный повтор разделов.';
    recommendedLevel = 'BASIC';
  } else {
    rankingLevel = 'NO_BASE';
    rankingTitle = 'База не сформирована';
    rankingConclusion =
      'Нужно системно восстанавливать школьную программу шаг за шагом, начиная со строения атома и базовых реакций.';
    recommendedLevel = 'BEGINNER';
  }

  // Расчет по блокам
  const blocksResult: Record<DiagnosticBlockId, any> = {} as any;
  const strongBlocks: string[] = [];
  const riskZones: string[] = [];
  const startFromRecommendations: string[] = [];

  (Object.keys(blocksAccumulator) as DiagnosticBlockId[]).forEach((bId) => {
    const b = blocksAccumulator[bId];
    const bPercent = b.maxScore > 0 ? Math.round((b.score / b.maxScore) * 100) : 0;
    let status: 'STRONG' | 'NEEDS_WORK' | 'CRITICAL' = 'NEEDS_WORK';

    if (bPercent >= 75) {
      status = 'STRONG';
      strongBlocks.push(b.title);
    } else if (bPercent <= 35) {
      status = 'CRITICAL';
      riskZones.push(b.title);
      startFromRecommendations.push(`Изучить раздел «${b.title}» (${b.topics})`);
    } else {
      status = 'NEEDS_WORK';
      riskZones.push(b.title);
    }

    blocksResult[bId] = {
      blockId: bId,
      title: b.title,
      topicsChecked: b.topics,
      score: b.score,
      maxScore: b.maxScore,
      percentage: bPercent,
      status,
    };
  });

  if (startFromRecommendations.length === 0) {
    startFromRecommendations.push(
      'Закрепить сложные комбинированные задания и задачи высокого уровня сложности'
    );
  }

  let nextDiagnosticCheck = 'Комплексный пробный тест на время через 3 недели занятий';
  if (riskZones.length > 0) {
    nextDiagnosticCheck = `Тематический срез по разделам: ${riskZones.join(', ')}`;
  }

  return {
    completedAt: new Date().toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    examType,
    totalScore,
    maxTotalScore,
    percentage,
    correctQuestionsCount,
    totalQuestionsCount: questions.length,
    rankingLevel,
    rankingTitle,
    rankingConclusion,
    blocks: blocksResult,
    strongBlocks: strongBlocks.length > 0 ? strongBlocks : ['Требуется комплексная проработка'],
    riskZones: riskZones.length > 0 ? riskZones : ['Явных зон риска не обнаружено'],
    highConfidenceErrors,
    luckyGuesses,
    startFromRecommendations,
    nextDiagnosticCheck,
    recommendedLevel,
  };
};
