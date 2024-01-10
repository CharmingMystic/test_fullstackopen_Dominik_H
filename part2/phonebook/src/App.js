import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import phonebookService from './services/phonebook'

// Komponent do wyświetlania powiadomień
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

// Główny komponent aplikacji
const App = () => {
  // Stany lokalne do przechowywania danych o osobach, nowych imionach, nowych numerach, filtrze wyszukiwania, komunikatach i stylach komunikatów
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchFilter, setSearchFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ style, setStyle ] = useState("")

  // Efekt pobierający dane o osobach z backendu przy pierwszym renderowaniu komponentu
  useEffect(() => {
    phonebookService
      .getAll()
      .then(names => {
        setPersons(names)
      })
      .catch(err => {
        setStyle('error')
        setMessage("błąd pobierania danych z backendowego API")
        setTimeout(() => {setMessage(null)}, 5000)
      })
  }, [])

  // Funkcja dodająca nową osobę lub aktualizująca numer istniejącej osoby
  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(e => e.name === newName)) {
      const replaceId = persons.filter(person => person.name === newName)[0].id
      const replace = window.confirm(`${newName} jest już dodane do książki telefonicznej, zastąpić stary numer nowym?`)
      if (replace) {
        phonebookService
          .update(replaceId, nameObject)
          .then(returnedPerson => {
            setMessage(`Zaktualizowano ${returnedPerson.name}`)
            setStyle('success')
            setTimeout(() => {setMessage(null)}, 5000)
            setPersons(persons.map(person => person.id !== replaceId ? person : returnedPerson))
          })
          .catch(err => {
            setMessage(`Informacje o ${newName} zostały już usunięte z serwera`)
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
        setMessage(`Dodano ${newPerson.name}`)
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

  // Funkcja usuwająca osobę z książki telefonicznej
  const deletePerson = id => {
    const personToDelete = persons.filter(person => person.id === id)[0]
    if (window.confirm(`Usunąć ${personToDelete.name} ?`)) {
      phonebookService
        .deletePerson(id)
        .then(res => {
          setPersons(persons.filter(person => person.id !== id))
          setMessage(`Informacje o ${personToDelete.name} usunięte z serwera pomyślnie`)
          setStyle('success')
          setTimeout(() => {setMessage(null)}, 5000)
        })
        .catch(err => {
          setMessage(`Informacje o ${personToDelete.name} zostały już usunięte z serwera`)
          setStyle('error')
          setTimeout(() => {setMessage(null)}, 5000)
          setPersons(persons.filter(p => p.name !== personToDelete.name))
        })
    }
  }

  // Renderowanie komponentu App
  return (
    <div onSubmit={addPerson}>
      <h2>Książka telefoniczna</h2>
      <Notification message={message} style={style} />
      <Filter searchFilter={searchFilter} setSearchFilter={setSearchFilter} />
      <h3>dodaj nowego</h3>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numery</h2>
      <Persons persons={persons} searchFilter={searchFilter} deletePerson={deletePerson}/>
    </div>
  )
}

// Eksportowanie komponentu App jako domyślnego
export default App
