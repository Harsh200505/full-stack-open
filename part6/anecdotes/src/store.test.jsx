import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AnecdoteList from './components/AnecdoteList'
import useAnecdoteStore from './stores/anecdoteStore'
import anecdoteService from './services/anecdotes'

vi.mock('./services/anecdotes', () => ({ default: { getAll: vi.fn(), update: vi.fn(), create: vi.fn(), remove: vi.fn() } }))
const data = [
  { id: '1', content: 'low voted anecdote', votes: 1 },
  { id: '2', content: 'high voted anecdote', votes: 5 },
  { id: '3', content: 'another low item', votes: 0 },
]

beforeEach(() => {
  vi.clearAllMocks()
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

test('state initializes with anecdotes returned by backend', async () => {
  anecdoteService.getAll.mockResolvedValue(data)
  await useAnecdoteStore.getState().initializeAnecdotes()
  expect(useAnecdoteStore.getState().anecdotes).toEqual(data)
})

test('AnecdoteList receives anecdotes sorted by votes', () => {
  useAnecdoteStore.setState({ anecdotes: data })
  render(<AnecdoteList />)
  const items = screen.getAllByRole('article')
  expect(items[0]).toHaveTextContent('high voted anecdote')
  expect(items[1]).toHaveTextContent('low voted anecdote')
})

test('AnecdoteList receives a filtered list', () => {
  useAnecdoteStore.setState({ anecdotes: data, filter: 'high' })
  render(<AnecdoteList />)
  expect(screen.getByText('high voted anecdote')).toBeVisible()
  expect(screen.queryByText('low voted anecdote')).not.toBeInTheDocument()
})

describe('voting', () => {
  test('increases votes for an anecdote', async () => {
    const user = userEvent.setup()
    useAnecdoteStore.setState({ anecdotes: data })
    anecdoteService.update.mockResolvedValue({ ...data[1], votes: 6 })
    render(<AnecdoteList />)
    await user.click(screen.getAllByRole('button', { name: 'vote' })[0])
    expect(await screen.findByText(/has 6 votes/)).toBeVisible()
  })
})
