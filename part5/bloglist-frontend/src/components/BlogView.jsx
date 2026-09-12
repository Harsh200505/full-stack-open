import { Link, useParams } from 'react-router-dom'

const BlogView = ({ blogs, currentUser, onLike, onRemove }) => {
  const { id } = useParams()
  const blog = blogs.find((item) => item.id === id)

  if (!blog) {
    return <p className="empty-state">Blog not found or still loading.</p>
  }

  const creatorUsername = blog.user?.username
  const isCreator = Boolean(
    currentUser && creatorUsername && currentUser.username === creatorUsername,
  )

  return (
    <article className="panel blog-view">
      <Link className="back-link" to="/">
        ← Back to blogs
      </Link>
      <p className="eyebrow">Blog details</p>
      <h1>{blog.title}</h1>
      <p className="blog-author">by {blog.author || 'Unknown author'}</p>

      <dl className="blog-facts">
        <div>
          <dt>URL</dt>
          <dd>
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </dd>
        </div>
        <div>
          <dt>Likes</dt>
          <dd data-testid="likes-count">{blog.likes}</dd>
        </div>
        <div>
          <dt>Added by</dt>
          <dd>{blog.user?.name || blog.user?.username || 'Unknown user'}</dd>
        </div>
      </dl>

      {currentUser && (
        <div className="form-actions">
          <button className="button" onClick={() => onLike(blog)}>
            Like
          </button>
          {isCreator && (
            <button
              className="button button-danger"
              onClick={() => onRemove(blog)}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </article>
  )
}

export default BlogView
