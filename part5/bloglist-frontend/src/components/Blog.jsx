import { useState } from 'react'

const Blog = ({ blog, updateBlog = () => {}, removeBlog = () => {}, canDelete = false }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="blog" data-testid="legacy-blog">
      <div className="blog-summary">
        <span>{blog.title} {blog.author}</span>
        <button onClick={() => setVisible(!visible)}>
          {visible ? 'Hide' : 'View'}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            Likes {blog.likes}{' '}
            <button onClick={() => updateBlog(blog)}>Like</button>
          </div>
          <div>{blog.user?.name}</div>
          {canDelete && <button onClick={() => removeBlog(blog)}>Delete</button>}
        </div>
      )}
    </div>
  )
}

export default Blog
