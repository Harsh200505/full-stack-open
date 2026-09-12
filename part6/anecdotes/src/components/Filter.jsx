import useAnecdoteStore from '../stores/anecdoteStore'
const Filter = () => {
  const filter = useAnecdoteStore((state) => state.filter)
  const setFilter = useAnecdoteStore((state) => state.setFilter)
  return <div className="filter">filter <input aria-label="filter" value={filter} onChange={(event) => setFilter(event.target.value)} /></div>
}
export default Filter
