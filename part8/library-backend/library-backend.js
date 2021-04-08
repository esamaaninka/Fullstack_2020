const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')

let authors = [
  {
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

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
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

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }
    type Book {
        title: String!
        published: Int!
        author: String!
        id: ID!
        genres: [String!]
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
    }
    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
    }

`
// miksi tuossa type Mutation addBook jos 
//  author: Author  
// niin kaatuu käännös, valittaa haluaa author mutta sai Author



const resolvers = {
  Query: {
      bookCount: () => books.length,
      authorCount: () => authors.length,
      allAuthors: () => authors,
      allBooks: (root, args) => {
        // 4 cases, no filter or author, genre or both as parameter 
        // no args return all books
        if(!Object.keys(args).length) {
            return books
        } 
        else { 
            if(args.author){
                const authorFilteredBooks = 
                    books.filter(function(book) {
                        if(!book.author.localeCompare(args.author)) {
                            return true
                        }
                        else {
                            return false
                        }
                    })
                    
                if(args.genre) {
                     const genreFilteredAuthorBooks = authorFilteredBooks.filter(function(book){
                        if(book.genres.includes(args.genre)) {
                            return true
                        }
                        else {
                            return false
                        }
                    })
                    return genreFilteredAuthorBooks
                }
                // if no genre return author filtered books
                return authorFilteredBooks
                
            }
            // if genre as only parameter
            if(args.genre){
                return books.filter(function(book){
                    if(book.genres.includes(args.genre)) {
                        return true
                    }
                    else {
                        return false
                    }
                })
            }   
        }
    }
  },
  Author: {
        bookCount: (root) => {
            const countAuthorBooks = books.filter(function(book){
                if(!book.author.localeCompare(root.name)) {
                    return true
                }
                else {
                    return false
                }
            })
            
            return countAuthorBooks.length
        }
  },
  Mutation: {
        addBook: (root, args) => {
          console.log('Mutation addBook:', args.title,args.author, args.genres)
          //console.log('Mutated books: ', books)
          if(!authors.find(a => a.name.includes(args.author) )) {
              // create new author first
              const newAuthor =  {name: args.author, id: uuid()}
              //console.log('creating new author: ', newAuthor)
              authors = authors.concat(newAuthor)
              args.author = newAuthor.name // save only the name of the author to the book author field
          }
          const book = {...args, id: uuid() }
          //console.log('Mutation addBook new book: ', book)
          books = books.concat(book)
              
          return book
          },
        editAuthor: (root, args) => {
            //console.log('editAuthor editing: ',args.name, args.setBornTo)
            const author = authors.find(a => !a.name.localeCompare(args.name))
            if(author) {
                author.born = args.setBornTo
                return author
            }
            return null // author not in system

        }
          
      },
} // Resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})