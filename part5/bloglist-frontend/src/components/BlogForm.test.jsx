import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { expect, test, vi } from 'vitest'
import BlogForm from './BlogForm'

test('submits the correct blog details', async () => {
  const user = userEvent.setup()
  const createBlog = vi.fn()

  render(
    <MemoryRouter>
      <BlogForm createBlog={createBlog} />
    </MemoryRouter>,
  )

  await user.type(screen.getByLabelText('Title'), 'A testable blog')
  await user.type(screen.getByLabelText('Author'), 'Harsh Wardhan')
  await user.type(screen.getByLabelText('URL'), 'https://example.com/testable')
  await user.click(screen.getByRole('button', { name: 'Create' }))

  expect(createBlog).toHaveBeenCalledWith({
    title: 'A testable blog',
    author: 'Harsh Wardhan',
    url: 'https://example.com/testable',
  })
})
