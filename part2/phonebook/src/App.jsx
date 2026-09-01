import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then((initialPersons) => setPersons(initialPersons))
      .catch(() => {
        setNotification({
          message: 'Could not load the phonebook from the server',
          type: 'error',
        })
      })
  }, [])

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const addPerson = (event) => {
    event.preventDefault()

    const name = newName.trim()
    const number = newNumber.trim()

    if (!name || !number) {
      window.alert('Enter both a name and a phone number')
      return
    }

    const existingPerson = persons.find(
      (person) => person.name.toLowerCase() === name.toLowerCase(),
    )

    if (existingPerson) {
      const confirmed = window.confirm(
        `${existingPerson.name} is already added to the phonebook. Replace the old number with a new one?`,
      )

      if (!confirmed) return

      const changedPerson = { ...existingPerson, number }

      personService
        .update(existingPerson.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id === existingPerson.id ? returnedPerson : person,
            ),
          )
          showNotification(`Updated ${returnedPerson.name}`)
          clearForm()
        })
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== existingPerson.id))
          showNotification(
            `Information for ${existingPerson.name} was already removed from the server`,
            'error',
          )
        })

      return
    }

    const personObject = { name, number }

    personService
      .create(personObject)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        showNotification(`Added ${returnedPerson.name}`)
        clearForm()
      })
      .catch(() => {
        showNotification(`Could not add ${name}`, 'error')
      })
  }

  const removePerson = (person) => {
    if (!window.confirm(`Delete ${person.name}?`)) return

    personService
      .remove(person.id)
      .then(() => {
        setPersons(persons.filter((item) => item.id !== person.id))
        showNotification(`Deleted ${person.name}`)
      })
      .catch(() => {
        setPersons(persons.filter((item) => item.id !== person.id))
        showNotification(
          `${person.name} was already removed from the server`,
          'error',
        )
      })
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  )

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />

      <Filter value={filter} onChange={(event) => setFilter(event.target.value)} />

      <h2>Add a new person</h2>
      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onNameChange={(event) => setNewName(event.target.value)}
        onNumberChange={(event) => setNewNumber(event.target.value)}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={removePerson} />
    </div>
  )
}

export default App

