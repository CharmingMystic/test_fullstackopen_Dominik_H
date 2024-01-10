import { useState } from "react";

const App = () => {
	const anecdotes = [
		"Jeden łyżeczka neutronowej gwiazdy waży tyle, co wszystkie samochody na Ziemi.",
"Wszechświat jest tak ogromny, że światło z najdalszych znanych galaktyk podróżuje do nas miliardy lat.",
"W ciągu życia ludzki mózg zużywa tyle energii, co żarówka o mocy 10 watów.",
"Serce człowieka może wygenerować wystarczającą siłę, aby podnieść krew na wysokość trzech pięter.",
"Pingwiny mają jednego partnera życiowego i często wymieniają się kamieniami jako prezentami.",
"Rekin młot jest w stanie odróżnić pole elektromagnetyczne wytworzone przez organizmy żywe, co pomaga mu w polowaniu.",
"W starożytnym Egipcie koty były świętymi zwierzętami, a ich zabicie, nawet przez przypadek, było karane śmiercią.",
"W czasach średniowiecza w Europie, pewne kobiety używały kombinezonów zbrojnych jako ochrony przed atakami wilków.",
"Pierwszy komputer ważył ponad 27 ton i zajmował przestrzeń pokoju.",
"Każdy z nas nosi w kieszeni większą moc obliczeniową niż miały pierwsze komputery.",
"Mrowki poruszają się po śladzie feromonów, co pozwala im tworzyć skomplikowane trasy komunikacyjne.",
"Język programowania Python został nazwany na cześć grupy humorystów Monty Python.",
"Obraz 'Mona Lisa' Leonarda da Vinci jest jednym z najbardziej znanych i najczęściej reprodukowanych dzieł sztuki na świecie.",
"Vincent van Gogh sprzedał tylko jedno swoje dzieło za życia, a teraz jego obrazy są jednymi z najdroższych na aukcjach.",
"Islandia jest jedynym krajem na świecie, w którym nie ma komarów.",
"Kanion Grand Canyon ma ponad 17 milionów lat, a jego głębokość wynosi ponad 1,6 km.",
"W Japonii istnieje zwyczaj hanami, czyli podziwiania kwitnących kwiatów wiśni.",
"W niektórych kulturach ludzie mrugają rzadziej, gdy kłamią.",
"Golf to jedyna gra sportowa, która została zagrana na Księżycu.",
"W biegu maratońskim, ostatni biegacz zawsze jest zwany 'ostatnim lampą'.",




];

	// Stan lokalny przechowujący indeks aktualnie wyświetlanej anegdoty
	const [selected, setSelected] = useState(0);

	// Stan lokalny przechowujący liczbę głosów dla każdej anegdoty
	const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

	// Funkcja do losowego wyboru anegdoty
	function getRandomAnecdote() {
		setSelected(Math.floor(Math.random() * anecdotes.length));
	}

	// Funkcja dodająca głos dla aktualnej anegdoty
	function addVote() {
		setVotes((prevState) => {
			const copy = [...prevState];
			copy[selected] += 1;
			return [...copy];
		});
	}

	// Funkcja zwracająca najwyższą liczbę głosów
	function highestVote() {
		return votes.reduce((current, previous) =>
			current >= previous ? current : previous
		);
	}

	// Renderowanie komponentu App
	return (
		<div>
			<h2>Anegdota dnia</h2>
			{/* Wyświetlanie aktualnej anegdoty */}
			{anecdotes[selected]}
			<div>
				{/* Wyświetlanie liczby głosów dla aktualnej anegdoty */}
				<strong>Głosy: </strong>
				{votes[selected]}
			</div>
			<div>
				{/* Przycisk do losowego wyboru anegdoty */}
				<button onClick={getRandomAnecdote}>Losowa Anegdota</button>
				{/* Przycisk do dodawania głosu dla aktualnej anegdoty */}
				<button onClick={addVote}>Głosuj</button>
			</div>
			{/* Warunek sprawdzający, czy są jakiekolwiek głosy */}
			{votes.reduce((previous, current) => previous + current, 0) === 0 ? (
				""
			) : (
				<div>
					{/* Wyświetlanie anegdoty z największą liczbą głosów */}
					<h2>Anegdota z największą liczbą głosów</h2>{" "}
					{anecdotes[votes.indexOf(highestVote())]}
				</div>
			)}
		</div>
	);
};

export default App;