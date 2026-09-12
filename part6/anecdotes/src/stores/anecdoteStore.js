import { create } from 'zustand'
import anecdoteService from '../services/anecdotes'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  initializeAnecdotes: async () => set({ anecdotes: await anecdoteService.getAll() }),
  setFilter: (filter) => set({ filter }),
  createAnecdote: async (content) => {
    const anecdote = await anecdoteService.create(content)
    set((state) => ({ anecdotes: state.anecdotes.concat(anecdote) }))
    return anecdote
  },
  voteAnecdote: async (id) => {
    const anecdote = get().anecdotes.find((item) => item.id === id)
    const updated = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    set((state) => ({ anecdotes: state.anecdotes.map((item) => item.id === id ? updated : item) }))
    return updated
  },
  deleteAnecdote: async (id) => {
    const anecdote = get().anecdotes.find((item) => item.id === id)
    if (!anecdote || anecdote.votes !== 0) return false
    await anecdoteService.remove(id)
    set((state) => ({ anecdotes: state.anecdotes.filter((item) => item.id !== id) }))
    return true
  },
}))

export const selectVisibleAnecdotes = (state) => state.anecdotes
  .filter((item) => item.content.toLowerCase().includes(state.filter.toLowerCase()))
  .toSorted((first, second) => second.votes - first.votes)

export default useAnecdoteStore
