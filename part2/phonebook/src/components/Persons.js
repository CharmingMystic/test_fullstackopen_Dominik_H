import React from 'react'

// Komponent Persons do wyświetlania listy osób
const Persons = ({ persons, searchFilter, deletePerson }) => {
    // Warunek sprawdzający, czy lista osób jest pusta
    if (persons.length === 0) return <div>Brak wpisów, proszę dodać jedno.</div>

    // Filtracja i mapowanie listy osób do wyświetlenia
    return (
        persons
            .filter(e => e.name.toLowerCase().includes(searchFilter.toLowerCase()))
            .map(person => {
                return (
                    <div key={person.name}>
                        {/* Wyświetlenie imienia, numeru i przycisku do usuwania osoby */}
                        {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>usuń</button>
                    </div>
                )
            })
    )
}

// Eksportowanie komponentu Persons jako domyślnego
export default Persons
