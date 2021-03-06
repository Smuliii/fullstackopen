const {
	ApolloServer,
	gql
} = require('apollo-server')
const { v4: uuidv4 } = require('uuid');

let authors = [{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
]

let books = [{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'The Demon ',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]

const typeDefs = gql `
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(
			author: String
			genre: String
		): [Book!]!
		allAuthors: [Author!]!
	}

	type Book {
		id: ID!
		title: String!
		author: String!
		published: Int!
		genres: [String!]!
	}

	type Author {
		id: ID!
		name: String!
		born: Int
		bookCount: Int!
	}

	type Mutation {
		addBook(
			title: String!
			author: String!
			published: Int!
			genres: [String!]!
		): Book
		editAuthor(
			name: String!
			setBornTo: Int!
		): Author
	}
`

const resolvers = {
	Query: {
		bookCount: () => books.length,
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			let filteredBooks = books;

			if (args.author) {
				filteredBooks = filteredBooks.filter(book => book.author === args.author);
			}

			if (args.genre) {
				filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
			}

			return filteredBooks;
		},
		allAuthors: () => {
			const booksByAuthor = books.reduce((obj, item) => {
				if (typeof obj[item.author] === 'undefined') {
					obj[item.author] = [];
				}
				obj[item.author].push(item);
				return obj;
			}, {});

			return authors.map(author => ({
				...author,
				bookCount: booksByAuthor[author.name]?.length || 0,
			}));
		},
	},
	Mutation: {
		addBook: (root, args) => {
			const book = {
				...args,
				id: uuidv4(),
			};

			books.push(book);

			const newAuthor = !authors.find(author => author.name === book.author);

			if (newAuthor) {
				authors.push({
					id: uuidv4(),
					name: book.author,
				});
			}

			return book;
		},
		editAuthor: (root, args) => {
			const author = authors.find(author => author.name === args.name);

			if (author) {
				author.born = args.setBornTo;
			}

			return author;
		},
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({
	url
}) => {
	console.log(`Server ready at ${url}`)
})
