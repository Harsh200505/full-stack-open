const baseUrl = 'http://localhost:3001/anecdotes'

const request = async (url, options) => {
  const response = await fetch(url, options)
  if (!response.ok) throw new Error(`request failed with status ${response.status}`)
  return response.status === 204 ? null : response.json()
}

const getAll = () => request(baseUrl)
const create = (content) => request(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, votes: 0 }) })
const update = (anecdote) => request(`${baseUrl}/${anecdote.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(anecdote) })
const remove = (id) => request(`${baseUrl}/${id}`, { method: 'DELETE' })

export default { create, getAll, remove, update }
