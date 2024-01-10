// Import React i useEffect z modułu 'react'
import React from 'react';

// Deklaracja funkcji komponentu Filter przyjmującej props
function Filter(props) {
  return (
    // Fragment JSX używany do grupowania elementów
    <>
      {/* Tekst informujący o filtrowaniu */}
      Filtruj pokazane z:{" "}
      {/* Pole tekstowe do wprowadzania tekstu, aktualizuje stan 'search' w zależności od wprowadzonych danych */}
      <input
        type="search"
        onChange={(e) => props.setSearch(e.target.value)}
        value={props.search}
      />
      {/* Lista (ul) do wyświetlenia wyników filtrowania */}
      <ul>
        {/* Warunek sprawdzający, czy pole wyszukiwania jest puste */}
        {props.search === ""
          ? null
          : 
            /* Mapowanie elementów na listę osób, które pasują do warunku filtrowania */
            props.persons
              .filter((person) =>
                person.name.toLowerCase().includes(props.search.toLowerCase())
              )
              .map((person) => {
                return (
                  /* Wyświetlanie nazwy i numeru każdej pasującej osoby w liście (li) */
                  <li key={person.name}>
                    {person.name} : {person.number}
                  </li>
                );
              })}
      </ul>
    </>
  );
}

// Eksportowanie komponentu Filter
export default Filter;
