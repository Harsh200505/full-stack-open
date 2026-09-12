import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const navigate = useNavigate()

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <section className="panel form-panel">
      <p className="eyebrow">Share something useful</p>
      <h1>Create new blog</h1>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
        />

        <label htmlFor="url">URL</label>
        <input
          id="url"
          name="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
        />

        <div className="form-actions">
          <button className="button" type="submit">
            Create
          </button>
          <button
            className="button button-secondary"
            type="button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}

export default BlogForm
