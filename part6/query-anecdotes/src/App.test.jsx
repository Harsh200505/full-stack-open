import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import App from './App'
import { NotificationContextProvider } from './NotificationContext'
import useAnecdotes from './useAnecdotes'

vi.mock('./useAnecdotes')

const anecdotes = [
  { id: '1', content: 'testing is useful', votes: 2 },
  { id: '2', content: 'state belongs on the server', votes: 5 },
]

describe('query anecdotes application', () => {
  const createAnecdote = vi.fn()
  const voteAnecdote = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    useAnecdotes.mockReturnValue({
      query: { isPending: false, isError: false, data: anecdotes },
      createAnecdote,
      voteAnecdote,
    })
  })

  test('renders anecdotes and votes through the custom hook', async () => {
    const user = userEvent.setup()
    render(<NotificationContextProvider><App /></NotificationContextProvider>)

    expect(screen.getByText('state belongs on the server')).toBeInTheDocument()
    await user.click(screen.getAllByRole('button', { name: 'vote' })[0])

    expect(voteAnecdote).toHaveBeenCalledWith({ ...anecdotes[1], votes: 6 })
  })

  test('creates a new anecdote', async () => {
    const user = userEvent.setup()
    render(<NotificationContextProvider><App /></NotificationContextProvider>)

    await user.type(screen.getByLabelText('anecdote'), 'a new tested anecdote')
    await user.click(screen.getByRole('button', { name: 'create' }))

    expect(createAnecdote).toHaveBeenCalledWith('a new tested anecdote')
  })
})
