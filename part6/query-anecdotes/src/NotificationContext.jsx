import { createContext, useContext, useRef, useState } from 'react'

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState(null)
  const timer = useRef(null)
  const notify = (message, type = 'success', seconds = 5) => {
    clearTimeout(timer.current)
    setNotification({ message, type })
    timer.current = setTimeout(() => setNotification(null), seconds * 1000)
  }
  return <NotificationContext.Provider value={{ notification, notify }}>{children}</NotificationContext.Provider>
}

export const useNotify = () => useContext(NotificationContext).notify
export const useNotification = () => useContext(NotificationContext).notification
