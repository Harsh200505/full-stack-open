const baseUrl = 'http://localhost:3001/anecdotes'

const parse = async (response) => {
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || `request failed with status ${response.status}`)
  return data
}

export const getAnecdotes = async () => parse(await fetch(baseUrl))
export const createAnecdote = async (content) => parse(await fetch(baseUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ content, votes: 0 }) }))
export const updateAnecdote = async (anecdote) => parse(await fetch(`${baseUrl}/${anecdote.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(anecdote) }))
