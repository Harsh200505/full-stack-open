const Notification = ({ notification }) => {
  if (!notification) return null

  return (
    <div className={`notification ${notification.type}`} role="status">
      {notification.message}
    </div>
  )
}

export default Notification
