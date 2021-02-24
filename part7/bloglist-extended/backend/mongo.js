const mongoose = require('mongoose')
require('dotenv').config()
/*
if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
*/
const mongoUrl = process.env.MONGODB_URI

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const blog = new Blog({
  title: 'MongoDB Atlas test blog entry again 2',
  Author: 'Esa Maaninka',
  url: 'tbd',
  likes: 1
})


blog.save().then(response => {
  console.log('blog saved!', response)
  //mongoose.connection.close()
})

Blog.find({}).then(result => {
//Note.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})