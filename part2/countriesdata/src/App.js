import { useState, useEffect } from "react";
import axios from "axios";

import Results from "./components/Results";

// Komponent App, główny komponent aplikacji
function App() {
	// Stan lokalny przechowujący wartość wprowadzoną w polu wyszukiwania
	const [search, setSearch] = useState("");
	
	// Stan lokalny przechowujący dane wszystkich krajów
	const [filteredData, setFilteredData] = useState([]);
	
	// Stan lokalny przechowujący dane wszystkich krajów
	const [allCountriesData, setCountriesData] = useState([]);

	// Efekt uboczny pobierający dane wszystkich krajów przy załadowaniu aplikacji
	useEffect(() => {
		axios.get("https://restcountries.com/v3.1/all").then((response) => {
			setCountriesData(response.data);
		});
	}, []);

	// Efekt uboczny filtrujący dane krajów w zależności od wartości wprowadzonej w polu wyszukiwania
	useEffect(() => {
		setFilteredData(
			allCountriesData.filter((country) =>
				country.name.common.toLowerCase().includes(search.toLowerCase())
			)
		);
	}, [allCountriesData, search]);

	// Renderowanie komponentu App
	return (
		<div className="App">
			{/* Pole do wprowadzania tekstu dla wyszukiwania krajów */}
			Znajdź kraje:{" "}
			<input
				type="search"
				onChange={(e) => setSearch(e.target.value)}
				value={search}
			/>
			
			{/* Renderowanie komponentu Results i przekazanie mu przefiltrowanych danych i wartości wyszukiwania */}
			<Results filteredData={filteredData} search={search} />
		</div>
	);
}

// Eksportowanie komponentu App jako domyślnego
export default App;
