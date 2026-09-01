import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseUrl).then((response) => response.data)

const create = (newPerson) =>
  axios.post(baseUrl, newPerson).then((response) => response.data)

const update = (id, changedPerson) =>
  axios.put(`${baseUrl}/${id}`, changedPerson).then((response) => response.data)

const remove = (id) => axios.delete(`${baseUrl}/${id}`)

export default { getAll, create, update, remove }

