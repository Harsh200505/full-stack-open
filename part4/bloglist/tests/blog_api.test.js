const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
let token
let user

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret123', 10)
  user = await new User({
    username: 'root',
    name: 'Test User',
    passwordHash,
  }).save()

  const blogObjects = helper.initialBlogs.map(
    (blog) => new Blog({ ...blog, user: user._id }),
  )
  const savedBlogs = await Promise.all(blogObjects.map((blog) => blog.save()))
  user.blogs = savedBlogs.map((blog) => blog._id)
  await user.save()

  const loginResponse = await api
    .post('/api/login')
    .send({ username: 'root', password: 'secret123' })

  token = loginResponse.body.token
})

describe('when blogs initially exist', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    assert.ok(response.body[0].id)
    assert.strictEqual(response.body[0]._id, undefined)
  })
})

describe('adding a blog', () => {
  test('succeeds with a valid token', async () => {
    const newBlog = {
      title: 'Async/await makes tests readable',
      author: 'Harsh Wardhan',
      url: 'https://example.com/async-await',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert.ok(blogsAtEnd.map((blog) => blog.title).includes(newBlog.title))
  })

  test('defaults likes to zero when likes is missing', async () => {
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Blog without likes',
        author: 'Test Author',
        url: 'https://example.com/no-likes',
      })
      .expect(201)

    assert.strictEqual(response.body.likes, 0)
  })

  test('fails with 400 when title is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ author: 'Test Author', url: 'https://example.com/no-title' })
      .expect(400)
  })

  test('fails with 400 when url is missing', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'No URL', author: 'Test Author' })
      .expect(400)
  })

  test('fails with 401 when token is missing', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 'Unauthorized', url: 'https://example.com/no-token' })
      .expect(401)
  })
})

describe('deleting a blog', () => {
  test('creator can delete their blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('deleting without a token fails with 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    await api.delete(`/api/blogs/${blogsAtStart[0].id}`).expect(401)
  })
})

describe('updating a blog', () => {
  test('updates the number of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blog = blogsAtStart[0]

    const response = await api
      .put(`/api/blogs/${blog.id}`)
      .send({ ...blog, likes: 42 })
      .expect(200)

    assert.strictEqual(response.body.likes, 42)
  })
})

after(async () => {
  await mongoose.connection.close()
})
