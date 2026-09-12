import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Blog from './Blog'

const blog = {
  title: 'Testing React components',
  author: 'Harsh Wardhan',
  url: 'https://example.com/testing',
  likes: 7,
  user: { name: 'Harsh Wardhan', username: 'harsh' },
}

describe('Blog', () => {
  test('shows title and author but hides URL and likes initially', () => {
    render(<Blog blog={blog} />)

    expect(screen.getByText(/Testing React components Harsh Wardhan/)).toBeVisible()
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument()
    expect(screen.queryByText(/Likes 7/)).not.toBeInTheDocument()
  })

  test('shows URL and likes after clicking View', async () => {
    const user = userEvent.setup()
    render(<Blog blog={blog} />)

    await user.click(screen.getByRole('button', { name: 'View' }))

    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByText(/Likes 7/)).toBeVisible()
  })

  test('calls like handler twice after two clicks', async () => {
    const user = userEvent.setup()
    const updateBlog = vi.fn()
    render(<Blog blog={blog} updateBlog={updateBlog} />)

    await user.click(screen.getByRole('button', { name: 'View' }))
    const likeButton = screen.getByRole('button', { name: 'Like' })
    await user.click(likeButton)
    await user.click(likeButton)

    expect(updateBlog).toHaveBeenCalledTimes(2)
  })
})
