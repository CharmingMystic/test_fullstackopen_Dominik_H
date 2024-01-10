import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={style}>
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ style, setStyle ] = useState("")

  useEffect(() => {
    phonebookService
      .getAll()
      .then(names => {
        setPersons(names)
      })
      .catch(err => {
        setStyle('error')
        setMessage("error fetching data from backend api")
        setTimeout(() => {setMessage(null)}, 5000)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName)) {
      const replaceId = persons.filter(person => person.name === newName)[0].id
      const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (replace) {
        phonebookService
          .update(replaceId, nameObject)
          .then(returnedPerson => {
            setMessage(`Updated ${returnedPerson.name}`)
            setStyle('success')
            setTimeout(() => {setMessage(null)}, 5000)
            setPersons(persons.map(person => person.id !== replaceId ? person : returnedPerson))
          })
          .catch(err => {
            setMessage(`Information of ${newName} has already been removed from server`)
            setStyle('error')
            setTimeout(() => {setMessage(null)}, 5000)
            setPersons(persons.filter(p => p.name !== newName))
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    phonebookService
      .create(nameObject)
      .then(newPerson => {
        setMessage(`Added ${newPerson.name}`)
        setStyle('success')
        setTimeout(() => {setMessage(null)}, 5000)
        setPersons(persons.concat(newPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(err => {
        setStyle('error')
        setMessage(err.response.data.error)
        setTimeout(() => {setMessage(null)}, 5000)
      })
  }

  const deletePerson = id => {
    const personToDelete = persons.filter(person => person.id === id)[0]
    if (window.confirm(`Delete ${personToDelete.name} ?`)) {
      phonebookService
        .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Information of ${personToDelete.name} removed from server successfully`)
          setStyle('success')
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(err => {
          setMessage(`Information of ${personToDelete.name} has already been removed from server`)
          setStyle('error')
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(p => p.name !== personToDelete.name))
        })
    }
  }

  return (
    <div onSubmit={addPerson}>
      <h2>Phonebook</h2>
      <Notification message={message} style={style} />
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <h3>add a new</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchFilter={searchFilter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App