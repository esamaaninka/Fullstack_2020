const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

/*
blogRouter.get('/api/blogs', (request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        //response.json(blogs)
        if(blogs){
          response.json(blogs.map(b => b.toJSON()))
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  }) */

// changed the promise -version to async-await
blogRouter.get('/api/blogs/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })

  response.json(blogs)
})

blogRouter.get('/api/blogs/:id', (request, response, next) => {
  //console.log('/api/blogs/:id', request.params.id)
  Blog
    //.findOne({id: `${id}`})
    .findById(request.params.id)
    .then(blog => {
      //console.log('blog:', blog)
      if(blog){
        response.json(blog.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogRouter.post('/api/blogs', async (request, response, next) => {

  const user = await User.findOne({}) // otetaan satunnainen käyttäjä kannasta

  //const blog = new Blog(request.body)
  // yo tekee saman
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: user.id
  })

  console.log('Blogia: ', blog)
  console.log('Useri ', user)

  /*  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
    */
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)

})

/* Tämä async-await ei toimi blog schema validation kanssa jos halutaan että MiddleWare/ErrorHandler palauttaa halutun virheen ValidationError yhteydessä? 

  blogRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)

    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })
*/

blogRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)

  response.status(204).end()
})

blogRouter.put('/api/blogs/:id', async (request, response) => {

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true, omitUndefined: true})

  response.status(200).json(updatedBlog)
})

module.exports = blogRouter