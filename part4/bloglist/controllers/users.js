const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/users')

usersRouter.get('/api/users', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/api/users', async (request, response, next) => {
  const body = request.body

  //console.log("password: ", body.password, body.password.length)

  if(body.password.length < 3) {
    return response.status(400).json({ error: 'password too short, min lenght of 3 required' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  // tämä ei toimi mongoose validator error kanssa, jää "jumiin"
  //  const savedUser = await user.save() 
  //  response.json(savedUser)
  user.save()
    .then(result => {
      //console.log("POST result from saving: ", result)
      response.status(200).json(result)
    })
    .catch(error => next(error))

})

module.exports = usersRouter
