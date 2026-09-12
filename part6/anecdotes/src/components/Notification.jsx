import useNotificationStore from '../stores/notificationStore'
const Notification = () => {
  const message = useNotificationStore((state) => state.message)
  return message ? <div className="notification">{message}</div> : null
}
export default Notification
