const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')

router.post('/reset', async (request, response) => {
  //console.log("Testing router reset!")
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router