const dummy = (blogs) => {
  void blogs
  return 1
}

const totalLikes = (blogs) =>
  blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((favorite, blog) =>
    blog.likes > favorite.likes ? blog : favorite,
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const counts = blogs.reduce((result, blog) => {
    result[blog.author] = (result[blog.author] || 0) + 1
    return result
  }, {})

  const [author, count] = Object.entries(counts).reduce((largest, current) =>
    current[1] > largest[1] ? current : largest,
  )

  return { author, blogs: count }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  const totals = blogs.reduce((result, blog) => {
    result[blog.author] = (result[blog.author] || 0) + (blog.likes || 0)
    return result
  }, {})

  const [author, likes] = Object.entries(totals).reduce((largest, current) =>
    current[1] > largest[1] ? current : largest,
  )

  return { author, likes }
}

module.exports = { dummy, favoriteBlog, mostBlogs, mostLikes, totalLikes }
