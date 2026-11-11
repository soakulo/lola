export type ExamType = 'OGE' | 'EGE' | 'GRADE_10' | 'GRADE_8';

export type TargetScore = '5_EXCELLENT' | '4_GOOD' | '3_SATISFACTORY' | 'SCORE_85_100' | 'SCORE_70_85' | 'SCORE_60_70';

export type ChemistryLevel = 'BEGINNER' | 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';

export type StudyPace = 'LIGHT' | 'RECOMMENDED' | 'INTENSIVE';

export type ConfidenceLevel = 'CONFIDENT' | 'DOUBTFUL' | 'RANDOM';

export type DiagnosticBlockId = 'THEORY' | 'INORGANIC' | 'ORGANIC' | 'CALCULATIONS';

export interface DiagnosticQuestion {
  id: number;
  blockId: DiagnosticBlockId;
  blockTitle: string;
  points: number; // 1 or 2
  question: string;
  reaction?: string;
  formula?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  topicName: string;
}

export interface DiagnosticAnswer {
  questionId: number;
  selectedOption: number;
  confidence: ConfidenceLevel;
}

export interface DiagnosticBlockScore {
  blockId: DiagnosticBlockId;
  title: string;
  topicsChecked: string;
  score: number;
  maxScore: number;
  percentage: number;
  status: 'STRONG' | 'NEEDS_WORK' | 'CRITICAL';
}

export interface DiagnosticReport {
  completedAt: string;
  examType: ExamType;
  totalScore: number;
  maxTotalScore: number;
  percentage: number;
  correctQuestionsCount: number;
  totalQuestionsCount: number;
  rankingLevel: 'NO_BASE' | 'FRAGMENTED' | 'FORMED' | 'CONFIDENT' | 'STRONG';
  rankingTitle: string;
  rankingConclusion: string;
  blocks: Record<DiagnosticBlockId, DiagnosticBlockScore>;
  strongBlocks: string[];
  riskZones: string[];
  highConfidenceErrors: Array<{
    questionId: number;
    questionTitle: string;
    topicName: string;
    selectedAnswer: string;
    correctAnswer: string;
  }>;
  luckyGuesses: Array<{
    questionId: number;
    topicName: string;
  }>;
  startFromRecommendations: string[];
  nextDiagnosticCheck: string;
  recommendedLevel: ChemistryLevel;
}

export interface UserProgress {
  overallPercentage: number;
  topics: {
    atomicStructure: number; // Строение атома
    organicChemistry: number; // Органическая химия
    inorganicChemistry: number; // Неорганическая химия
    chemicalCalculations: number; // Химические расчеты
  };
  streakDays: number;
  completedLessonsCount: number;
  completedTasksCount: number;
  experiencePoints: number;
}

export interface StudentProfile {
  uid: string;
  name: string;
  email: string;
  grade: string;
  examType: ExamType;
  targetScore: TargetScore;
  targetScoreLabel: string;
  currentLevel: ChemistryLevel;
  studyPace: StudyPace;
  avatarUrl: string;
  progress: UserProgress;
  joinedDate: string;
  notificationsEnabled: boolean;
  diagnosticReport?: DiagnosticReport;
}

export interface QuestionnaireFormData {
  examType: ExamType;
  targetScore: TargetScore;
  currentLevel: ChemistryLevel;
  studyPace: StudyPace;
  name: string;
  email: string;
  password?: string;
  diagnosticReport?: DiagnosticReport;
}

export interface ChemistryTopic {
  id: string;
  title: string;
  subtitle: string;
  progress: number;
  category: 'inorganic' | 'organic' | 'general' | 'calculations';
  iconType: 'flask' | 'atom' | 'molecule' | 'beaker' | 'flame';
  lessonsCount: number;
  summary: string;
}

export interface WorkoutQuestion {
  id: string;
  question: string;
  formula?: string;
  reaction?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  lolaHint: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'lola';
  text: string;
  timestamp: string;
  suggestionChips?: string[];
  reactionFormula?: string;
}

export type AppScreen =
  | 'home'
  | 'study'
  | 'practice'
  | 'lola'
  | 'profile'
  | 'plan'
  | 'analytics'
  | 'auth'
  | 'questionnaire';

export type ExamCategory = 'theory' | 'inorganic' | 'organic' | 'calculations' | 'practice_lab';

export interface ExamSpecificationItem {
  number: number;
  title: string;
  topic: string;
  category: ExamCategory;
  maxPoints: number;
  part: 1 | 2;
  difficulty: 'BASE' | 'ADVANCED' | 'HIGH';
  timeMinutes: number;
}

export interface CustomVariantConfig {
  examType: 'EGE' | 'OGE';
  taskCounts: Record<number, number>; // task number -> count
}

export interface ExamTaskInstance {
  id: string;
  examType: 'EGE' | 'OGE';
  taskNumber: number;
  taskTitle: string;
  topicName: string;
  category: ExamCategory;
  question: string;
  formula?: string;
  reaction?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
  part: 1 | 2;
}

export interface ExamTaskResult {
  task: ExamTaskInstance;
  userAnswerIndex: number | null;
  isCorrect: boolean;
  earnedPoints: number;
}

export interface ExamVariantAnalytics {
  id: string;
  examType: 'EGE' | 'OGE';
  completedAt: string;
  elapsedSeconds: number;
  elapsedTimeFormatted: string;
  totalTasks: number;
  correctTasks: number;
  totalScore: number;
  maxScore: number;
  percentage: number;
  byTaskNumbers: Record<number, {
    taskNumber: number;
    title: string;
    total: number;
    correct: number;
    percentage: number;
  }>;
  byCategories: Record<ExamCategory, {
    category: ExamCategory;
    title: string;
    total: number;
    correct: number;
    percentage: number;
  }>;
  taskResults: ExamTaskResult[];
  lolaFeedback: string;
}
