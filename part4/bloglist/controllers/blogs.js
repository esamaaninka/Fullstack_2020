const blogRouter = require('express').Router()
const Blog = require('../models/blog')

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
  
  // changed the promise -version to async-await, try
  blogRouter.get('/api/blogs/', async (request, response) => { 
    const blogs = await Blog.find({})
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
  
  blogRouter.post('/api/blogs', (request, response, next) => {
    const blog = new Blog(request.body)
    // yo tekee saman
    //const blog = new Blog({
      //  title: request.body.title,
      //  author: request.body.author,
      //  url: request.body.url,
      //  likes: request.body.likes
    //})

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })
/* Tämä async-await ei toimi blog schema validation kanssa jos halutaan että MW/ErrorHandler palauttaa halutun virheen ValidationError yhteydessä? 
  blogRouter.post('/api/blogs', async (request, response) => {
    const blog = new Blog(request.body)
    
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  })
*/

  module.exports = blogRouter