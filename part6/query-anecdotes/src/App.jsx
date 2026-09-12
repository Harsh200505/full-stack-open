import useAnecdotes from './useAnecdotes'
import { useNotification, useNotify } from './NotificationContext'

const Notification = () => {
  const notification = useNotification()
  return notification ? <div className={`notification ${notification.type}`}>{notification.message}</div> : null
}

const App = () => {
  const { query, createAnecdote, voteAnecdote } = useAnecdotes()
  const notify = useNotify()

  if (query.isPending) return <div>loading data...</div>
  if (query.isError) return <div>anecdote service not available due to problems in server</div>

  const add = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const content = form.elements.namedItem('anecdote').value.trim()
    try {
      await createAnecdote(content)
      form.reset()
      notify(`anecdote '${content}' created`)
    } catch (error) {
      notify(error.message, 'error')
    }
  }

  const vote = async (anecdote) => {
    await voteAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    notify(`you voted '${anecdote.content}'`)
  }

  return <main>
    <h1>Anecdote app</h1>
    <Notification />
    <section>
      {query.data.toSorted((a, b) => b.votes - a.votes).map((anecdote) => <article key={anecdote.id}>
        <p>{anecdote.content}</p><span>has {anecdote.votes} votes </span><button onClick={() => vote(anecdote)}>vote</button>
      </article>)}
    </section>
    <h2>Create new</h2>
    <form onSubmit={add}><input name="anecdote" aria-label="anecdote" /><button type="submit">create</button></form>
  </main>
}
export default App
