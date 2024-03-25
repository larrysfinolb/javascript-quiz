export interface IQuestion {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}
