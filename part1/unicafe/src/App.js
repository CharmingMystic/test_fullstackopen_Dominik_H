import { useState } from "react";

// Komponent Button do obsługi przycisków opinii
const Button = ({ name, handleClick }) => {
	return (
		<button onClick={() => handleClick((prevState) => prevState + 1)}>
			{name}
		</button>
	);
};

// Komponent StatisticLine do wyświetlania pojedynczej linii statystyk
const StatisticLine = (props) => {
	return (
		<tr>
			<td>
				<strong>{props.name}: </strong>
			</td>
			<td>{props.value}</td>
		</tr>
	);
};

// Komponent Statistics do wyświetlania statystyk opartych na przekazanych wartościach
const Statistics = (props) => {
	// Obliczenia statystyczne
	const total = props.values.reduce((accum, prev) => accum + prev, 0);
	const positivePercentage = (100 * props.values[0]) / total;

	// Warunek sprawdzający, czy są jakiekolwiek dane
	if (props.values[0] === 0 && props.values[1] === 0 && props.values[2] === 0) {
		return (
			<div>
				<h2>Statystyki</h2>
				Brak udzielonych opinii
			</div>
		);
	}

	// Wyświetlenie tabeli z danymi statystycznymi
	return (
		<div>
			<h2>Statystyki</h2>
			<table>
				<tbody>
					<StatisticLine name="Dobre" value={props.values[0]} />
					<StatisticLine name="Neutralne" value={props.values[1]} />
					<StatisticLine name="Złe" value={props.values[2]} />
					<StatisticLine name="Wszystkie" value={total} />
					<StatisticLine name="Średnia" value={total / 3} />
					<StatisticLine name="Pozytywne" value={`${positivePercentage}%`} />
				</tbody>
			</table>
		</div>
	);
};

// Główny komponent aplikacji
const App = () => {
	// Stany lokalne do przechowywania liczby opinii "Dobre", "Neutralne" i "Złe"
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	// Renderowanie komponentu App z przyciskami i wyświetlaniem statystyk
	return (
		<div>
			<h2>Podziel się opinią</h2>
			<Button name="Dobre" handleClick={setGood} />
			<Button name="Neutralne" handleClick={setNeutral} />
			<Button name="Złe" handleClick={setBad} />
			<Statistics values={[good, neutral, bad]} />
		</div>
	);
};

// Eksportowanie komponentu App jako domyślnego
export default App;
