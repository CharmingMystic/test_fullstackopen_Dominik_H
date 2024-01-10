import React from 'react'

// Komponent Filter służący do filtrowania wyświetlanych danych
const Filter = ({ searchFilter, setSearchFilter }) => {
    return (
      <>
        {/* Pole tekstowe do wprowadzania frazy filtrującej, związane z wartością searchFilter */}
        filter shown with <input value={searchFilter} onChange={(e) => setSearchFilter(e.target.value)} />
      </>
    )
}

// Eksportowanie komponentu Filter jako domyślnego
export default Filter
