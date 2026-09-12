import { create } from 'zustand'

let timeoutId
const useNotificationStore = create((set) => ({
  message: '',
  notify: (message, seconds = 5) => {
    clearTimeout(timeoutId)
    set({ message })
    timeoutId = setTimeout(() => set({ message: '' }), seconds * 1000)
  },
}))

export default useNotificationStore
