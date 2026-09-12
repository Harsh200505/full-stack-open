import useAnecdoteStore from '../stores/anecdoteStore'
import useNotificationStore from '../stores/notificationStore'

const AnecdoteForm = () => {
  const createAnecdote = useAnecdoteStore((state) => state.createAnecdote)
  const notify = useNotificationStore((state) => state.notify)
  const submit = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value.trim()
    if (!content) return
    await createAnecdote(content)
    event.target.reset()
    notify(`you created '${content}'`)
  }
  return <section className="form-section"><h2>Create new</h2><form onSubmit={submit}>
    <input name="anecdote" aria-label="anecdote" />
    <button type="submit">create</button>
  </form></section>
}
export default AnecdoteForm
