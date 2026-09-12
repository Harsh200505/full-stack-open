const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('secret123', 10)
  await new User({ username: 'root', name: 'Root User', passwordHash }).save()
})

describe('creating a user', () => {
  test('succeeds with valid data', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send({ username: 'harsh', name: 'Harsh Wardhan', password: 'password' })
      .expect(201)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
  })

  test('fails when username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const response = await api
      .post('/api/users')
      .send({ username: 'root', name: 'Duplicate', password: 'password' })
      .expect(400)

    assert.match(response.body.error, /unique/)
    assert.strictEqual((await helper.usersInDb()).length, usersAtStart.length)
  })

  test('fails when username is shorter than three characters', async () => {
    await api
      .post('/api/users')
      .send({ username: 'ab', name: 'Short', password: 'password' })
      .expect(400)
  })

  test('fails when password is shorter than three characters', async () => {
    await api
      .post('/api/users')
      .send({ username: 'validname', name: 'Short Password', password: '12' })
      .expect(400)
  })
})

after(async () => {
  await mongoose.connection.close()
})
