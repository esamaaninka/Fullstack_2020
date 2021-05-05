const { ApolloServer, UserInputError, gql } = require('apollo-server')
//const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const jwt = require('jsonwebtoken')
require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
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
*/
/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/
/*
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
*/
const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int
    }
    type User {
      username: String!
      id: ID!
    }
    type Token {
      value: String!
    }
    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
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
        createUser(
          username: String!
        ): User
        login(
          username: String!
          password: String!
        ): Token
    }

`

const resolvers = {
  Query: {
      //bookCount: () => books.length,
      bookCount: () => Book.collection.countDocuments(),
      //authorCount: () => authors.length,
      authorCount: () => Author.collection.countDocuments(),
      //allAuthors: () => authors,
      allAuthors: () => {
        return Author.find({})
      },

      //TÄMÄ EI TOIMI, PALAUTTAA NULL (createUser ja Login toimii, addBook ja editAuthhor validointi tekemättä)
      
      me: (root, args, context) => {
        return context.currentUser
      },
      allBooks: (root, args) => {
        // 4 cases, no filter or author, genre or both as parameter 
        // no args return all books
        if(!Object.keys(args).length) {
            //return books
            return Book.find({})
        } 
        else { 
            if(args.author){
              /*
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
             */   
            }
            // if genre as only parameter
            if(args.genre){
                //console.log("allBooks by genre: ", args.genre)
                return Book.find({genres: args.genre })
                /*return books.filter(function(book){
                    if(book.genres.includes(args.genre)) {
                        return true
                    }
                    else {
                        return false
                    }
                })*/
            }   
        }
    }
  },
  Author: {
        bookCount: async (root,args) => {
            /*const countAuthorBooks = books.filter(function(book){
                if(!book.author.localeCompare(root.name)) {
                    return true
                }
                else {
                    return false
                }
            })
            
            return countAuthorBooks.length */
          try{
            const author = await Author.findOne({name: root.name})
            
            return author.bookCount
          }catch (error) {
              //console.log("bookCount error: ", error.message)
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
        }
  },
  Mutation: {
        addBook: async (root, args) => {
          /*
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
              
          return book */
          
          // luo author ensin, jos ei ole olemassa
          //try {
          let author = await Author.findOne({name: args.author})
          if(!author) {
            //console.log(`Author ${args.author} not found, creating it`)
            author = new Author({name: args.author})
            //console.log("Author created: ", author)
          
          }
          const book = new Book({...args,author})
          author.bookCount = author.bookCount +1
          
          try {
            await book.save()
            await author.save()
          } catch (error) {
            console.log("addBook error: ", error.message)
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return book

        },
        editAuthor: async (root, args, {currentUser}) => {
            //console.log('editAuthor editing: ',args.name, args.setBornTo)
            /*const author = authors.find(a => !a.name.localeCompare(args.name))
            if(author) {
                author.born = args.setBornTo
                return author
            }
            return null // author not in system
            */
            //const currentUser = context.currentUser
            console.log('I am: ', currentUser)

            if (!currentUser) {
              throw new AuthenticationError("not authenticated")
            }
           try{
              let author = await Author.findOneAndUpdate({name: args.name},{born: args.setBornTo}, { new: true })
              //console.log('editAuthor got: ',author )
              return author // if author not found returns null -> throw error... 
            } catch(error) {
              //console.log("editAuthr error: ", error.message)
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            }
        },
        createUser: (root, args) => {
          const user = new User({ username: args.username })

          return user.save()
            .catch(error => {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            })
        },
        login: async (root, args) => {
          const user = await User.findOne({ username: args.username })
      
          if ( !user || args.password !== 'secred' ) {
            throw new UserInputError("wrong credentials")
          }
      
          const userForToken = {
            username: user.username,
            id: user._id,
          }
      
          return { value: jwt.sign(userForToken, JWT_SECRET) }
        },          
      }, // Mutations
} // Resolvers

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {    
    const auth = req ? req.headers.authorization : null    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {      
      const decodedToken = jwt.verify(       
        auth.substring(7), JWT_SECRET    
      )      
      const currentUser = await User.findById(decodedToken.id) //.populate('friends')      
      return { currentUser }    
    }  
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})