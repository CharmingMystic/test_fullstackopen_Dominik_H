import React from "react";
import Contact from "./Contact";

function Phonebook({ persons, newFilter }) {
  // make it case insensitive
  let lowerCaseFilter = newFilter.toLowerCase();

  // return new filtered array
  let filteredArray = persons.filter((person) =>
    person.name.toLowerCase().includes(lowerCaseFilter)
  );

  // render components, unfiltered and filtered
  const unfilteredContacts = persons.map((person) => (
    <Contact
      name={person.name}
      phone={person.phone}
      key={person.id}
      id={person.id}
    />
  ));

  const filteredContacts = filteredArray.map((person) => (
    <Contact
      name={person.name}
      phone={person.phone}
      key={person.id}
      id={person.id}
    />
  ));

  const contactsToShow = newFilter ? filteredContacts : unfilteredContacts;

  return (
    <>
      <h2>Numbers</h2>
      <table>
        <tbody>{contactsToShow}</tbody>
      </table>
    </>
  );
}

export default Phonebook;
