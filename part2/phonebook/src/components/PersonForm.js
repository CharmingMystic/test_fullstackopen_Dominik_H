// Import React z modułu 'react'
import React from 'react';

// Deklaracja funkcji komponentu PersonForm przyjmującej props
function PersonForm(props) {
  return (
    // Formularz do wprowadzania danych osoby
    <form>
      {/* Pole do wprowadzania imienia */}
      <div>
        Imię:{" "}
        <input
          onChange={(e) => props.setNewName(e.target.value)}
          value={props.newName}
        />
      </div>
      {/* Pole do wprowadzania numeru telefonu */}
      <div>
        Numer telefonu:{" "}
        <input
          onChange={(e) => props.setNewNumber(e.target.value)}
          value={props.newNumber}
        />
      </div>
      {/* Przycisk dodawania osoby (wywołuje funkcję submitForm przekazaną w props) */}
      <div>
        <button type="submit" onClick={(e) => props.submitForm(e)}>
          Dodaj
        </button>
      </div>
    </form>
  );
}

// Eksportowanie komponentu PersonForm
export default PersonForm;
