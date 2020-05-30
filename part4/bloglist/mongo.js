const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://esa-fullstack:${password}@cluster0-fhhrm.mongodb.net/note-app?retryWrites=true&w=majority`
    //`mongodb+srv://fullstack:${password}@cluster0-ostce.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is Easy as cake, or so I was imaging',
  date: new Date(),
  important: true,
})


note.save().then(response => {
  console.log('note saved!', response)
  //mongoose.connection.close()
})

Note.find({}).then(result => {
//Note.find({}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})