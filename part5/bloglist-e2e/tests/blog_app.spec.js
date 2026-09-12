const { test, expect, describe, beforeEach } = require('@playwright/test')

const backendUrl = 'http://localhost:3003'

const login = async (page, username = 'harsh', password = 'secret123') => {
  await page.goto('/login')
  await page.getByLabel('Username').fill(username)
  await page.getByLabel('Password').fill(password)
  await page.getByRole('button', { name: 'Login' }).click()
}

const createBlog = async (page, title, likes = 0) => {
  await page.getByRole('link', { name: 'Create' }).click()
  await page.getByLabel('Title').fill(title)
  await page.getByLabel('Author').fill('Test Author')
  await page.getByLabel('URL').fill(`https://example.com/${title.replaceAll(' ', '-')}`)
  await page.getByRole('button', { name: 'Create' }).click()

  if (likes > 0) {
    await page.getByRole('link', { name: title }).click()
    for (let index = 0; index < likes; index += 1) {
      await page.getByRole('button', { name: 'Like' }).click()
    }
    await page.getByRole('link', { name: 'Back to blogs' }).click()
  }
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post(`${backendUrl}/api/testing/reset`)
    await request.post(`${backendUrl}/api/users`, {
      data: {
        username: 'harsh',
        name: 'Harsh Wardhan',
        password: 'secret123',
      },
    })
    await page.goto('/')
  })

  test('login link and form are shown', async ({ page }) => {
    await page.getByRole('link', { name: 'Login' }).click()
    await expect(page.getByRole('heading', { name: 'Log in to application' })).toBeVisible()
    await expect(page.getByLabel('Username')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page)
      await expect(page.getByText('Harsh Wardhan logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await login(page, 'harsh', 'wrong-password')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
      await expect(page.getByText('Harsh Wardhan logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'A Playwright blog')
      await expect(page.getByRole('link', { name: 'A Playwright blog' })).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(page, 'Blog to like')
      await page.getByRole('link', { name: 'Blog to like' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByTestId('likes-count')).toHaveText('1')
    })

    test('creator can delete a blog', async ({ page }) => {
      await createBlog(page, 'Blog to delete')
      await page.getByRole('link', { name: 'Blog to delete' }).click()
      page.once('dialog', (dialog) => dialog.accept())
      await page.getByRole('button', { name: 'Delete' }).click()
      await expect(page.getByRole('link', { name: 'Blog to delete' })).not.toBeVisible()
    })

    test('only the creator sees the delete button', async ({ page, request }) => {
      await createBlog(page, 'Creator-only deletion')
      await page.getByRole('button', { name: 'Logout' }).click()

      await request.post(`${backendUrl}/api/users`, {
        data: {
          username: 'other',
          name: 'Other User',
          password: 'secret123',
        },
      })

      await login(page, 'other', 'secret123')
      await page.getByRole('link', { name: 'Creator-only deletion' }).click()
      await expect(page.getByRole('button', { name: 'Like' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'Delete' })).not.toBeVisible()
    })

    test('blogs are sorted by likes, most liked first', async ({ page }) => {
      await createBlog(page, 'Zero likes', 0)
      await createBlog(page, 'Two likes', 2)
      await createBlog(page, 'One like', 1)

      const cards = page.getByTestId('blog-card')
      await expect(cards.nth(0)).toContainText('Two likes')
      await expect(cards.nth(1)).toContainText('One like')
      await expect(cards.nth(2)).toContainText('Zero likes')
    })
  })
})
