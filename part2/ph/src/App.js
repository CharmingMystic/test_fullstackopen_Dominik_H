import React, { useState } from "react";
import Filter from "./components/Filter.js";
import Form from "./components/Form.js";
import Phonebook from "./components/Phonebook.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newFilter, setFilter] = useState("");

  const handleChange = (event) => {
    let inputName = event.target.name;
    let newValue = event.target.value;

    switch (inputName) {
      case "name":
        setNewName(newValue);
        break;
      case "phone":
        setNewPhone(newValue);
        break;
      case "filter":
        setFilter(newValue);
        break;
      default:
        alert("error in form");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };

    if (persons.find((person) => person.name === newContact.name)) {
      alert(`${newContact.name} is already added to phonebook`);
      return false;
    }

    setPersons([...persons, newContact]);
    setNewName("");
    setNewPhone("");
  };

  return (
    <>
      <Filter newFilter={newFilter} handleChange={handleChange} />
      <Form
        newName={newName}
        newPhone={newPhone}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <Phonebook persons={persons} newFilter={newFilter} />
    </>
  );
};

export default App;
