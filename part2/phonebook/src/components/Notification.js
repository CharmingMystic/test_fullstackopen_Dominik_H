// Import React z modułu 'react'
import React from 'react';

// Deklaracja funkcji komponentu Notification przyjmującej props
function Notification(props) {
  // Styl komunikatu
  const style = {
    background: "lightgrey",
    fontSize: "16px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  // Styl dla komunikatu błędu
  const errorStyle = {
    color: "red",
  };

  // Styl dla komunikatu sukcesu
  const successStyle = {
    color: "green",
  };

  return (
    // Komunikat wyświetlany na podstawie statusu (error/success) i odpowiedniego stylu
    <div
      style={
        props.status === "error"
          ? { ...style, ...errorStyle }
          : { ...style, ...successStyle }
      }
    >
      {/* Wyświetlenie treści komunikatu */}
      {props.message}
    </div>
  );
}

// Eksportowanie komponentu Notification
export default Notification;
