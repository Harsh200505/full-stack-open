import jsonServer from 'json-server'

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)
server.post('/anecdotes', (request, response, next) => {
  if (!request.body.content || request.body.content.length < 5) {
    return response.status(400).json({ error: 'anecdote content must be at least 5 characters long' })
  }
  return next()
})
server.use(router)
server.listen(3001, () => console.log('JSON Server running on port 3001'))
