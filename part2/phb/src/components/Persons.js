import React from 'react'

const Persons = ({persons, searchFilter, deletePerson}) => {
    if (persons.length === 0) return <div>No entries yet, please add one.</div>
    return (
      persons
        .filter(e => e.name.toLowerCase().includes(searchFilter.toLowerCase()))
        .map(person => {
          return (
            <div key={person.name}>
              {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
            </div>
          )
        })
    )
  }

export default Persons