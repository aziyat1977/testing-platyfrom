export type ThemeType = 'microbiome' | 'airbear' | 'economy';

export interface VocabItem {
  word: string;
  pos: string; // part of speech
  ipa: string;
  definition: string;
  translations?: string;
}

export interface QuizItem {
  question: string;
  answer?: string; // For fill in blank
  options?: string[]; // For multiple choice
  correctOption?: number; // Index
  matchPair?: { left: string; right: string }; // For matching
}

export interface SlideContent {
  heading?: string;
  subheading?: string;
  text?: string[];
  vocabList?: VocabItem[];
  quizList?: QuizItem[];
  visualPrompt?: string; // Description for placeholder image
}

export interface Slide {
  id: number;
  type: 'title' | 'vocab' | 'content' | 'quiz' | 'grammar' | 'activity';
  title: string;
  content: SlideContent;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  theme: ThemeType;
  slides: Slide[];
}