import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, test, vi } from 'vitest'
import BlogView from './BlogView'

const blog = {
  id: 'blog-1',
  title: 'Routed React applications',
  author: 'Harsh Wardhan',
  url: 'https://example.com/router',
  likes: 12,
  user: { id: 'user-1', username: 'harsh', name: 'Harsh Wardhan' },
}

const renderView = (currentUser) =>
  render(
    <MemoryRouter initialEntries={['/blogs/blog-1']}>
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={[blog]}
              currentUser={currentUser}
              onLike={vi.fn()}
              onRemove={vi.fn()}
            />
          }
        />
      </Routes>
    </MemoryRouter>,
  )

describe('routed BlogView', () => {
  test('unauthenticated user sees information but no buttons', () => {
    renderView(null)
    expect(screen.getByText(blog.title)).toBeVisible()
    expect(screen.getByText(blog.url)).toBeVisible()
    expect(screen.getByTestId('likes-count')).toHaveTextContent('12')
    expect(screen.queryByRole('button', { name: 'Like' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument()
  })

  test('logged-in non-creator sees only Like', () => {
    renderView({ username: 'another-user' })
    expect(screen.getByRole('button', { name: 'Like' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument()
  })

  test('creator sees Like and Delete', () => {
    renderView({ username: 'harsh' })
    expect(screen.getByRole('button', { name: 'Like' })).toBeVisible()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeVisible()
  })
})
