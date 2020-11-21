const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./api_blogs_helper')
const app = require('../app')
const Blog = require('../models/blog')

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
      

      //console.log('Headers: ',response.headers)
      //console.log('Id: ', response.body[0])
    
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

})

afterAll(() => {
  mongoose.connection.close()
})