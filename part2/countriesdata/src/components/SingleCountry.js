import { useState, useEffect } from "react";
import axios from "axios";

// Komponent SingleCountry przyjmuje dane przefiltrowane dla jednego kraju
function SingleCountry({ filteredData }) {
	const [weather, setWeather] = useState([]);

	// Efekt uboczny używający API pogody do pobrania informacji o aktualnej pogodzie dla stolicy kraju
	useEffect(() => {
		axios(
			`http://api.openweathermap.org/geo/1.0/direct?q=${filteredData[0].capital}&appid=${process.env.REACT_APP_WEATHER}`
		)
			.then((response) => {
				const lat = response.data[0].lat;
				const lon = response.data[0].lon;

				// Drugie zapytanie do API pogody na podstawie współrzędnych geograficznych kraju
				return axios(
					`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly,alerts&appid=${process.env.REACT_APP_WEATHER}`
				);
			})
			.then((response) => {
				// Ustawienie stanu weather na dane pogodowe z odpowiedzi
				return setWeather([response.data]);
			})
			.catch((err) => {
				// Obsługa błędów
				console.log("BŁĄD: ", err);
			});
	}, [filteredData]);

	return (
		<>
			{/* Wyświetlenie nazwy kraju */}
			<h2>{filteredData[0].name.common}</h2>

			{/* Informacje o stolicy kraju */}
			<div>Stolica: {filteredData[0].capital}</div>

			{/* Informacje o obszarze kraju */}
			<div>Obszar: {filteredData[0].area}</div>

			{/* Informacje o językach kraju */}
			<div>
				Języki:
				<ul>
					{Object.entries(filteredData[0].languages).map((arr) => {
						return <li key={arr[0]}>{arr[1]}</li>;
					})}
				</ul>
			</div>

			{/* Wyświetlenie flagi kraju */}
			<img src={filteredData[0].flags.png} alt="flaga" />

			{/* Warunek sprawdzający, czy dane pogodowe są dostępne */}
			{weather.length > 0 && (
				<div>
					{/* Wyświetlenie informacji o pogodzie */}
					<h3>Pogoda w {filteredData[0].capital}</h3>
					<div>
						Temperatura {weather[0].current.temp}
						<span> &#176;C</span>
					</div>
					<div>
						{/* Wyświetlenie ikony pogodowej */}
						<img
							src={`https://openweathermap.org/img/wn/${weather[0].current.weather[0].icon}@4x.png`}
							alt="ikona-pogody"
						/>
					</div>
					<div>Wiatr {weather[0].current.wind_speed} m/s</div>
				</div>
			)}
		</>
	);
}

// Eksportowanie komponentu SingleCountry jako domyślnego
export default SingleCountry;
