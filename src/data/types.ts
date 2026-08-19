export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export interface ExplanationLayer {
  beginner: string;
  technical: string;
  analyst: string;
  hinglish?: string;
}

export interface Section {
  id: string;
  title: string;
  explanation: ExplanationLayer;
  coreConcepts?: string[];
  tables?: {
    headers: string[];
    rows: string[][];
  }[];
  examples?: string[];
}

export interface Module {
  id: string;
  day: 1 | 2;
  title: string;
  difficulty: Difficulty;
  estimatedTime: string;
  objectives: string[];
  whyItMatters: string;
  sections: Section[];
  nextTopicId?: string;
}

export interface Lab {
  id: string;
  number: number;
  title: string;
  difficulty: Difficulty;
  estimatedTime: string;
  prerequisites: string[];
  skills: string[];
  tools: string[];
  scenario: string;
  dataset: string;
  procedure: string[];
  questions: string[];
  expectedOutput: string;
}

export interface EventID {
  id: string;
  name: string;
  meaning: string;
  whyItMatters: string;
  importantFields: string[];
  socUseCase: string;
  suspiciousExample: string;
  benignExample: string;
  investigationQuestions: string[];
}
