import axios from 'axios'

const baseUrl = '/api/blogs'

const addAuth = token => ({
  headers: { authorization: `bearer ${token}` }
})

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addNew = async ({ data, token }) => {
  try {
    const config = addAuth(token)
    const response = await axios.post(baseUrl, data, config)
    return response.data
  } catch (e) {
    throw Error(e.response.data.error)
  }
}

const update = async ({ id, data, token }) => {
  try {
    const config = addAuth(token)
    const response = await axios.put(`${baseUrl}/${id}`, data, config)
    return response.data
  } catch (e) {
    throw Error(e.response.data.error)
  }
}

const remove = async ({ id, token }) => {
  try {
    const config = addAuth(token)
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
  } catch (e) {
    throw Error(e.response.data.error)
  }
}

export default {
  getAll,
  addNew,
  update,
  remove,
}
