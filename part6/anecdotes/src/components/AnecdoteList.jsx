import useAnecdoteStore, { selectVisibleAnecdotes } from '../stores/anecdoteStore'
import useNotificationStore from '../stores/notificationStore'

const AnecdoteList = () => {
  const allAnecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const anecdotes = selectVisibleAnecdotes({ anecdotes: allAnecdotes, filter })
  const voteAnecdote = useAnecdoteStore((state) => state.voteAnecdote)
  const deleteAnecdote = useAnecdoteStore((state) => state.deleteAnecdote)
  const notify = useNotificationStore((state) => state.notify)

  const vote = async (anecdote) => {
    await voteAnecdote(anecdote.id)
    notify(`you voted '${anecdote.content}'`)
  }

  return <section aria-label="anecdotes">
    {anecdotes.map((anecdote) => <article className="anecdote" key={anecdote.id}>
      <p>{anecdote.content}</p>
      <span>has {anecdote.votes} votes </span>
      <button onClick={() => vote(anecdote)}>vote</button>
      {anecdote.votes === 0 && <button className="delete" onClick={() => deleteAnecdote(anecdote.id)}>delete</button>}
    </article>)}
  </section>
}
export default AnecdoteList
