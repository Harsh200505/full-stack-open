require('dotenv').config()

const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Give the database password as an argument')
  process.exit(1)
}

const password = process.argv[2]
const template = process.env.MONGODB_URI_TEMPLATE

if (!template) {
  console.log('Define MONGODB_URI_TEMPLATE in the .env file')
  process.exit(1)
}

const url = template.replace('<password>', encodeURIComponent(password))

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((person) => console.log(`${person.name} ${person.number}`))
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(() => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
} else {
  console.log('Usage: node mongo.js password [name number]')
  mongoose.connection.close()
}

