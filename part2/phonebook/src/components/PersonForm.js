import React from 'react'

// Komponent PersonForm służący do wprowadzania danych nowej osoby
const PersonForm = ({ newName, setNewName, newNumber, setNewNumber }) => {
    return (
      <form>
        {/* Pole tekstowe do wprowadzania imienia, związane z wartością newName */}
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        {/* Pole tekstowe do wprowadzania numeru, związane z wartością newNumber */}
        <div>
          number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        {/* Przycisk do dodawania nowej osoby */}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

// Eksportowanie komponentu PersonForm jako domyślnego
export default PersonForm
