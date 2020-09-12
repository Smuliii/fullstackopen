import axios from 'axios';

const baseUrl = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const addNew = async ({ data, token }) => {
	const config = {
		headers: { authorization: `bearer ${token}` }
	};
	const response = await axios.post(baseUrl, data, config);
	return response.data;
};

export default {
	getAll,
	addNew,
};
