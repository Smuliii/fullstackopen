import axios from 'axios'

const baseUrl = '//localhost:3001/persons'

const get = () => axios.get(baseUrl).then(response => response.data)
const add = data => axios.post(baseUrl, data).then(response => response.data)
const update = (id, data) => axios.put(`${baseUrl}/${id}`, data).then(response => response.data)
const remove = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data)

export default {
	get,
	add,
	update,
	remove,
}