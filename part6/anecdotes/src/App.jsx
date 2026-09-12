import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import useAnecdoteStore from './stores/anecdoteStore'

const App = () => {
  const initializeAnecdotes = useAnecdoteStore((state) => state.initializeAnecdotes)
  useEffect(() => { initializeAnecdotes() }, [initializeAnecdotes])
  return <main>
    <h1>Anecdotes</h1>
    <Notification />
    <Filter />
    <AnecdoteList />
    <AnecdoteForm />
  </main>
}
export default App
