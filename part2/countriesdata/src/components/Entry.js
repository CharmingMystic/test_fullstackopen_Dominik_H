import { useState } from "react";

// Komponent Entry przyjmuje obiekt state jako prop
function Entry({ state }) {
	// Stan lokalny toggle używany do przełączania widoczności informacji dodatkowych
	const [toggle, setToggle] = useState(false);

	// Funkcja toggleBtn zmienia stan toggle na przeciwny
	function toggleBtn() {
		setToggle((prevState) => !prevState);
	}

	return (
		<div style={{ padding: "5px 0" }}>
			{/* Wyświetlenie nazwy kraju */}
			{state.name.common}

			{/* Przycisk do przełączania dodatkowych informacji */}
			<button onClick={toggleBtn}>Przełącz</button>

			{/* Warunek sprawdzający, czy toggle jest true, aby wyświetlić dodatkowe informacje */}
			{toggle && (
				<div>
					{/* Informacje o stolicy */}
					<div>
						<strong>Stolica:</strong> {state.capital}
					</div>

					{/* Informacje o obszarze */}
					<div>
						<strong>Obszar:</strong> {state.area}
					</div>

					{/* Informacje o językach z wykorzystaniem mapowania obiektu */}
					<div>
						<strong>Języki:</strong>
						<ul>
							{Object.entries(state.languages).map((arr) => {
								return <li key={arr[0]}>{arr[1]}</li>;
							})}
						</ul>
					</div>

					{/* Wyświetlenie flagi kraju */}
					<img
						src={state.flags.png}
						alt="flaga"
						style={{ marginBottom: "25px" }}
					/>
				</div>
			)}
		</div>
	);
}

// Eksportowanie komponentu Entry jako domyślnego
export default Entry;
