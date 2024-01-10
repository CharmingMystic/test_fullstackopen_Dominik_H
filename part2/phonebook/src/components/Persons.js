// Import React z modułu 'react'
import React from 'react';

// Deklaracja funkcji komponentu Persons przyjmującej props
function Persons(props) {
  return (
    // Lista nieuporządkowana (ul) do wyświetlenia osób
    <ul>
      {/* Warunek sprawdzający, czy istnieją osoby do wyświetlenia */}
      {props.persons.length > 0 &&
        /* Mapowanie osób na elementy listy (li) */
        props.persons.map((person) => {
          return (
            /* Wyświetlanie nazwy i numeru każdej osoby w elemencie listy */
            <li key={person.name}>
              {person.name} : {person.number}
              {/* Przycisk do usuwania osoby (wywołuje funkcję deletePerson przekazaną w props) */}
              <button onClick={() => props.deletePerson(person.name)}>
                Usuń
              </button>
            </li>
          );
        })}
    </ul>
  );
}

// Eksportowanie komponentu Persons
export default Persons;
