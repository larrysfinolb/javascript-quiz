import { create } from 'zustand';
import type { IQuestion } from '../types.d';
import { devtools, persist } from 'zustand/middleware';
import confetti from 'canvas-confetti';

interface IState {
  questions: IQuestion[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<IState>()(
  devtools(
    persist(
      (set, get) => {
        return {
          loading: false,
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const response = await fetch('/data.json');
            const json = await response.json();

            const questions = json.sort(() => Math.random() - 0.5).slice(0, limit);
            set({ questions, currentQuestion: 0 }, false, 'FETCH_QUESTIONS');
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            const { questions } = get();
            const newQuestions = structuredClone(questions);
            const questionIndex = newQuestions.findIndex((question) => question.id === questionId);
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

            if (isCorrectUserAnswer) confetti();

            newQuestions[questionIndex] = {
              ...questionInfo,
              userSelectedAnswer: answerIndex,
              isCorrectUserAnswer,
            };

            set({ questions: newQuestions }, false, 'SELECT_ANSWER');
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get();
            const nextQuestion = currentQuestion + 1;

            if (nextQuestion < questions.length) set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION');
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get();
            const previousQuestion = currentQuestion - 1;

            if (previousQuestion >= 0) set({ currentQuestion: previousQuestion }, false, 'GO_PREVIOUS_QUESTION');
          },

          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET');
          },
        };
      },
      {
        name: 'questions',
      }
    )
  )
);
