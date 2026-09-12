import { useEffect, useState } from 'react'
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import BlogView from './components/BlogView'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    window.setTimeout(() => setNotification(null), 4000)
  }

  useEffect(() => {
    blogService
      .getAll()
      .then(setBlogs)
      .catch(() => showNotification('Could not load blogs', 'error'))
  }, [])

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedBlogappUser')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loggedUser),
      )
      blogService.setToken(loggedUser.token)
      setUser(loggedUser)
      showNotification(`Welcome ${loggedUser.name || loggedUser.username}`)
      navigate('/')
    } catch {
      showNotification('Wrong username or password', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    showNotification('Logged out')
    navigate('/')
  }

  const createBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      setBlogs((currentBlogs) => currentBlogs.concat(createdBlog))
      showNotification(
        `A new blog '${createdBlog.title}' by ${createdBlog.author} added`,
      )
      navigate('/')
    } catch (error) {
      showNotification(
        error.response?.data?.error || 'Could not create blog',
        'error',
      )
    }
  }

  const likeBlog = async (blog) => {
    try {
      const blogToUpdate = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user?.id || blog.user,
      }
      const updatedBlog = await blogService.update(blog.id, blogToUpdate)
      setBlogs((currentBlogs) =>
        currentBlogs.map((item) =>
          item.id === updatedBlog.id ? updatedBlog : item,
        ),
      )
    } catch {
      showNotification('Could not like blog', 'error')
    }
  }

  const removeBlog = async (blog) => {
    const confirmed = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`,
    )
    if (!confirmed) return

    try {
      await blogService.remove(blog.id)
      setBlogs((currentBlogs) =>
        currentBlogs.filter((item) => item.id !== blog.id),
      )
      showNotification(`Removed '${blog.title}'`)
      navigate('/')
    } catch (error) {
      showNotification(
        error.response?.data?.error || 'Could not remove blog',
        'error',
      )
    }
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link className="brand" to="/">
          Bloglist
        </Link>
        <nav aria-label="Main navigation">
          <Link to="/">Blogs</Link>
          {user && <Link to="/create">Create</Link>}
          {!user && <Link to="/login">Login</Link>}
        </nav>
        <div className="session-area">
          {user && (
            <>
              <span>{user.name || user.username} logged in</span>
              <button className="button button-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <Notification notification={notification} />

      <main>
        <Routes>
          <Route path="/" element={<BlogList blogs={blogs} />} />
          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace /> : <LoginForm onLogin={handleLogin} />
            }
          />
          <Route
            path="/create"
            element={
              user ? <BlogForm createBlog={createBlog} /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blogs={blogs}
                currentUser={user}
                onLike={likeBlog}
                onRemove={removeBlog}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
