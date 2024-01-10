import React, { useState, useEffect } from "react";  // Importuje React oraz hooki useState i useEffect

import Filter from "./components/Filter";  // Importuje komponent Filter
import PersonForm from "./components/PersonForm";  // Importuje komponent PersonForm
import Persons from "./components/Persons";  // Importuje komponent Persons
import Notification from "./components/Notification";  // Importuje komponent Notification

import entryService from "./services/entryService";  // Importuje moduł entryService z usługami do komunikacji z backendem

const App = () => {
	const [persons, setPersons] = useState([]);  // Stan przechowujący dane o osobach w książce telefonicznej
	const [newName, setNewName] = useState("");  // Stan przechowujący nowe imię
	const [newNumber, setNewNumber] = useState("");  // Stan przechowujący nowy numer telefonu
	const [search, setSearch] = useState("");  // Stan przechowujący frazę do filtrowania
	const [notification, setNotification] = useState("");  // Stan przechowujący informacje o notyfikacji
	const [showMsg, setShowMsg] = useState(false);  // Stan określający, czy wyświetlić notyfikację

	// Funkcja do obsługi formularza dodawania i edycji osoby w książce telefonicznej
	function submitForm(e) {
		e.preventDefault();  // Zapobiega domyślnej akcji formularza
console.log("test")
		// Sprawdza, czy osoba już istnieje w książce telefonicznej
		if (!persons.some((person) => person.name === newName)) {
			// Dodaje nową osobę do książki telefonicznej
			entryService
				.createPerson({
					name: newName,
					number: newNumber,
				})
				.then((response) => {
					setPersons([...persons, response]);  // Aktualizuje stan o nową osobę
					setNotification({
						status: "success",
						msg: `Success: You added ${newName} to the Phonebook!`,  // Komunikat o sukcesie
					});
					setShowMsg(true);  // Wyświetla notyfikację
				})
				.catch((err) => {
					console.log(err);
					setNotification({
						status: "error",
						msg: `Error: ${err.response.data.error}`,  // Komunikat o błędzie
					});
					setShowMsg(true);  // Wyświetla notyfikację
				});

			setNewName("");  // Czyści pole nowego imienia
			setNewNumber("");  // Czyści pole nowego numeru telefonu
		} else {
			// Jeśli osoba już istnieje, prosi użytkownika o potwierdzenie zastąpienia numeru telefonu
			if (
				window.confirm(
					`${newName} is already added, do you want to replace the old number with a new one?`
				)
			) {
				const personObj = persons.find((person) => person.name === newName);
				const changedPerson = { ...personObj, number: newNumber };

				// Aktualizuje dane osoby w książce telefonicznej
				entryService
					.updatePerson(personObj._id, changedPerson)
					.then((response) => {
						setPersons((prevState) => {
							return prevState.map((person) =>
								person._id !== personObj._id ? person : response
							);
						});
						setNotification({
							status: "success",
							msg: `Success: You edited ${newName}'s number in the Phonebook!`,  // Komunikat o sukcesie
						});
						setShowMsg(true);  // Wyświetla notyfikację
					})
					.catch((err) => {
						setNotification({
							status: "error",
							msg: `Error: ${err}`,  // Komunikat o błędzie
						});
						setShowMsg(true);  // Wyświetla notyfikację
					});
			}
		}
	}

	// Funkcja do usuwania osoby z książki telefonicznej
	function deletePerson(personName) {
		// Prosi użytkownika o potwierdzenie usunięcia osoby
		if (window.confirm(`Are you sure you want to delete ${personName}`)) {
			const personObj = persons.find((person) => person.name === personName);

			// Usuwa osobę z książki telefonicznej
			entryService
				.deletePerson(personObj._id, personObj)
				.then((response) => {
					setPersons((prevState) => {
						setNotification({
							status: "success",
							msg: `Success: You deleted ${personObj.name} in the Phonebook!`,  // Komunikat o sukcesie
						});
						setShowMsg(true);  // Wyświetla notyfikację
						return prevState.filter((person) => person._id !== personObj._id);
					});
				})
				.catch((err) => {
					setNotification({
						status: "error",
						msg: `Error: ${personObj.name} has already been deleted`,  // Komunikat o błędzie
					});
					setShowMsg(true);  // Wyświetla notyfikację
				});
		}
	}

	// Efekt pobierający dane o osobach z backendu przy załadowaniu komponentu
	useEffect(() => {
		entryService.getAll().then((response) => {
			setPersons(response);  // Aktualizuje stan o dane o osobach
		});
	}, []);

	// Efekt ukrywający notyfikację po 3 sekundach
	useEffect(() => {
		if (showMsg) {
			const toRef = setTimeout(() => {
				setShowMsg(false);
				clearTimeout(toRef);
			}, 3000);
		}
	}, [showMsg]);

	return (
		<div>
			<h2>Phonebook</h2>
			{showMsg && (
				<Notification status={notification.status} message={notification.msg} />
			)}
			<Filter search={search} persons={persons} setSearch={setSearch} />
			<h3>Dodaj</h3>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				submitForm={submitForm}
				setNewName={setNewName}
				setNewNumber={setNewNumber}
			/>
			<h3>Numery</h3>
			<Persons persons={persons} deletePerson={deletePerson} />
		</div>
	);
};

export default App;  // Eksportuje komponent App jako domyślny
