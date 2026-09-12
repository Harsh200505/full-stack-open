const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Test Author',
    url: 'https://example.com/html',
    likes: 5,
  },
  {
    title: 'Browser can execute only JavaScript',
    author: 'Test Author Two',
    url: 'https://example.com/javascript',
    likes: 10,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = { blogsInDb, initialBlogs, usersInDb }
