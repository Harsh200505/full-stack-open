import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = newToken ? `Bearer ${newToken}` : null
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, {
    headers: { Authorization: token },
  })
  return response.data
}

const update = async (id, updatedBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, {
    headers: { Authorization: token },
  })
  return response.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: token },
  })
}

export default { create, getAll, remove, setToken, update }
