import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((first, second) => second.likes - first.likes)

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Community reading list</p>
          <h1>Blogs</h1>
        </div>
        <span className="count-badge">{blogs.length} saved</span>
      </div>

      <div className="blog-grid">
        {sortedBlogs.map((blog) => (
          <article className="blog-card" key={blog.id} data-testid="blog-card">
            <span className="likes-pill">{blog.likes} likes</span>
            <h2>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </h2>
            <p>by {blog.author || 'Unknown author'}</p>
          </article>
        ))}
      </div>

      {blogs.length === 0 && <p className="empty-state">No blogs saved yet.</p>}
    </section>
  )
}

export default BlogList
