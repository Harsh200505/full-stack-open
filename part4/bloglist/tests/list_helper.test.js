const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const blogs = [
  { title: 'React patterns', author: 'Michael Chan', likes: 7 },
  { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', likes: 5 },
  { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', likes: 12 },
  { title: 'First class tests', author: 'Robert C. Martin', likes: 10 },
  { title: 'TDD harms architecture', author: 'Robert C. Martin', likes: 0 },
  { title: 'Type wars', author: 'Robert C. Martin', likes: 2 },
]

test('dummy returns one', () => {
  assert.strictEqual(listHelper.dummy([]), 1)
})

describe('total likes', () => {
  test('of an empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })

  test('of a list with one blog equals that blog likes', () => {
    assert.strictEqual(listHelper.totalLikes([blogs[0]]), 7)
  })

  test('of a larger list is calculated correctly', () => {
    assert.strictEqual(listHelper.totalLikes(blogs), 36)
  })
})

describe('favorite blog', () => {
  test('returns null for an empty list', () => {
    assert.strictEqual(listHelper.favoriteBlog([]), null)
  })

  test('returns the blog with the most likes', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(blogs), blogs[2])
  })
})

describe('most blogs', () => {
  test('returns the author with the largest number of blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(blogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('most likes', () => {
  test('returns the author with the greatest total likes', () => {
    assert.deepStrictEqual(listHelper.mostLikes(blogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})
