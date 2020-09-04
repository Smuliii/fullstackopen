const tokenExtractor = (request, response, next) => {
	const { authorization } = request.headers;

	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
		request.token = authorization.slice(7);
	}

	next();
};

module.exports = {
	tokenExtractor,
}
