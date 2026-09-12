import { create } from 'zustand'

const useFeedbackStore = create((set) => ({
  good: 0,
  neutral: 0,
  bad: 0,
  giveGood: () => set((state) => ({ good: state.good + 1 })),
  giveNeutral: () => set((state) => ({ neutral: state.neutral + 1 })),
  giveBad: () => set((state) => ({ bad: state.bad + 1 })),
  reset: () => set({ good: 0, neutral: 0, bad: 0 }),
}))

export default useFeedbackStore
