import { beforeEach, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import useFeedbackStore from './store'

beforeEach(() => useFeedbackStore.setState({ good: 0, neutral: 0, bad: 0 }))

test('collects feedback and shows statistics', async () => {
  const user = userEvent.setup()
  render(<App />)
  expect(screen.getByText('No feedback given')).toBeVisible()
  await user.click(screen.getByRole('button', { name: 'good' }))
  await user.click(screen.getByRole('button', { name: 'neutral' }))
  expect(screen.getByText('all').closest('tr')).toHaveTextContent('2')
})
