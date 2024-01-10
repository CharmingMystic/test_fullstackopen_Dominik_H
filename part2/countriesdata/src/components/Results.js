import Entry from "./Entry";
import SingleCountry from "./SingleCountry";

// Komponent Results przyjmuje dane przefiltrowane i parametr wyszukiwania
function Results({ filteredData, search }) {
	// Sprawdza, czy ilość przefiltrowanych danych przekracza 10 i czy pole wyszukiwania jest puste
	if (filteredData.length > 10 && search === "") {
		// Jeśli tak, nie zwraca niczego (brak wyników)
		return;
	} else if (filteredData.length > 10) {
		// Jeśli ilość przefiltrowanych danych przekracza 10, ale pole wyszukiwania nie jest puste, zwraca komunikat
		return <p>Za dużo dopasowań, określ inny filtr.</p>;
	} else if (filteredData.length === 1) {
		// Jeśli ilość przefiltrowanych danych wynosi 1, zwraca komponent SingleCountry z danymi dla jednego kraju
		return <SingleCountry filteredData={filteredData} />;
	} else if (filteredData.length <= 10) {
		// Jeśli ilość przefiltrowanych danych mieści się w przedziale od 1 do 10, mapuje dane na komponenty Entry
		return (
			<div>
				{filteredData.map((country) => {
					return <Entry key={country.area} state={country} />;
				})}
			</div>
		);
	}
}

// Eksportowanie komponentu Results jako domyślnego
export default Results;
