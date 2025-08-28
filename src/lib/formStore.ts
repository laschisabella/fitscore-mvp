import { create } from "zustand";
import { persist } from "zustand/middleware";

type Answer = string | string[];

interface FormState {
  candidateName: string;
  candidateEmail: string;
  answers: Record<string, Answer>;
  classificationScore?: number;

  progressStep: number;
  setProgressStep: (step: number) => void;

  setAnswer: (question: string, answer: Answer) => void;
  setCandidateInfo: (name: string, email: string) => void;
  setClassificationScore: (score: number) => void;
  reset: () => void;
}

export const useFormStore = create<FormState>()(
  persist(
    (set) => ({
      candidateName: "",
      candidateEmail: "",
      answers: {},
      classificationScore: undefined,

      progressStep: 1,
      setProgressStep: (step) => set({ progressStep: step }),

      setAnswer: (question, answer) =>
        set((state) => ({
          answers: { ...state.answers, [question]: answer },
        })),

      setCandidateInfo: (name, email) =>
        set(() => ({ candidateName: name, candidateEmail: email })),

      setClassificationScore: (score) =>
        set(() => ({ classificationScore: score })),

      reset: () =>
        set({
          candidateName: "",
          candidateEmail: "",
          answers: {},
          classificationScore: undefined,
          progressStep: 1,
        }),
    }),
    {
      name: "form-storage",
    }
  )
);
