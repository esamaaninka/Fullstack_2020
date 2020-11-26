const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./api_blogs_helper')
const Blog = require('../models/blog')
const User = require('../models/users')
const app = require('../app')

const api = supertest(app)

describe('blogs in test database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)
  })


  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)  
  })

  test('testdb contains correct amount of blogs', async () => {
    const blogsAtStart = await helper.blogsInDb()
    
    expect(blogsAtStart.length).toBe(helper.initialBlogs.length)
    })


  test('test blog default unique _id transformed to id  ', async () => {
    //const response = await api
      //.get('/api/blogs')
      //.expect(200)
      const blogsAtStart = await helper.blogsInDb()
      //console.log('blogsAtStart', blogsAtStart)
      expect(blogsAtStart[0].id).toBeDefined()
      
      //.console.log('Id: ', response.body[0].id)
  })

  test('HTTP POST to add a new blog successfull', async () => {
    const newBlog = {
      title: 'Post a new blog',
      author: 'blog-api -tesdriver', 
      url: 'www.theurl.com'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAfterPost = await helper.blogsInDb()
    expect (blogsAfterPost.length).toBe(3)
    expect(blogsAfterPost[2].title).toEqual(newBlog.title)
  })

  test('Check blog likes included with default 0', async () => {
    const newBlog = {
      title: 'Post a new blog without like field',
      author: 'blog-api -tesdriver', 
      url: 'www.theurl.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogsAfterPost = await helper.blogsInDb()

    expect(blogsAfterPost[2].likes).toBe(0)
  })

  test('POST blog without title or url returns 400 Bad Request', async() => {
    const newBlogNoTitle = {
      //title: 'Post a new blog without like field',
      author: 'blog-api -tesdriver', 
      url: 'www.theurl.com'
    }
    const newBlogNoUrl = {
      title: 'Post a new blog without like field',
      author: 'blog-api -tesdriver'
    }
    let response = await api
      .post('/api/blogs')
      .send(newBlogNoTitle)
      .expect(400)

    response = await api
      .post('/api/blogs')
      .send(newBlogNoUrl)
      .expect(400)

    })

  test('DELETE a blog using id success', async() => {
    // delete the first api-blogs-helper set blog
    const blogsAtStart = await helper.blogsInDb()
      //console.log('blogsAtStart', blogsAtStart)
    //expect(blogsAtStart[0].id).toBeDefined()

    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(204)

  })

  test('PUT update blog title and likes fields', async () => {
    
    const blogsAtStart = await helper.blogsInDb()

    const updatedBlog = {
      //original title: 'Surfing the net is interesting',
      title: 'Surfing the www is interesting',
      //author: 'Jaska Jokunen', 
      //url: 'www.yle.fi',
      //original likes: 1
      likes: blogsAtStart[1].likes +1
    }

    const result = await api
      .put((`/api/blogs/${blogsAtStart[1].id}`))
      .send(updatedBlog)
      .expect(200)
    //console.log('result:', result.body)
    expect(result.body.likes).toBe(2)

    const blogsAfterPost = await helper.blogsInDb()
    expect(blogsAfterPost[1].title).toEqual(updatedBlog.title)
  })


}) // end of describe('blogs in test database'...

/////////////////////////////// USER TESTS //////////////////////////////////////////////////////////

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  // joku bugi jossain, jos nämä User -testit omassa tiedostossaan, liittyykö tuohon promiseAll jos puuttuu ? 
  // jos ajan kaikki testit "npm test" kaikki ok, mutta jos yritän ajaa näitä alla yksittäin
  // "npm test -- -t 'creation succeeds with a fresh username'"" tulee virhettä 
  // "ReferenceError: You are trying to `import` a file after the Jest environment has been torn down."


  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'teppo',
      name: 'Teppo Testaaja',
      password: 'salasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user creation fails with too short username', async () => {
    const newUser = {
      username: 'as',
      name: 'Too Short Username',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username` (`as`) is shorter than the minimum allowed length (3)')

  })

  test('user creation fails with too short password', async () => {
    const newUser = {
      username: 'astarte',
      name: 'Too Short Password',
      password: 'sa',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short, min lenght of 3 required')

  })

}) //  end of describe

afterAll(() => {
  mongoose.connection.close()
})