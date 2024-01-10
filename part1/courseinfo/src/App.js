const Header = (props) => {
	return (
		<div className="header">
			<h1>{props.course}</h1>
		</div>
	);
};

const Part = (props) => {
	return (
		<p>
			<strong>{props.part.name}: </strong>
			{props.part.exercises} tekst
		</p>
	);
};

const Content = (props) => {
	return (
		<div>
			{/* Wyświetlenie trzech komponentów Part, reprezentujących poszczególne części kursu */}
			<Part part={props.parts[0]} />
			<Part part={props.parts[1]} />
			<Part part={props.parts[2]} />
		</div>
	);
};

const Total = (props) => {
	return (
		<p>
			{/* Wyświetlenie całkowitej liczby ćwiczeń w kursie */}
			<strong>tekst: </strong>
			{props.parts.reduce(
				(accumulator, current) => accumulator + current.exercises,
				0
			)}
		</p>
	);
};

const App = () => {
	// Obiekt reprezentujący kurs
	const course = {
		name: "Aplikacje",
		parts: [
			{
				name: "tekst",
				exercises: 11,
			},
			{
				name: "tekst",
				exercises: 11,
			},
			{
				name: "tekst",
				exercises: 11,
			},
		],
	};

	return (
		<div>
			{/* Renderowanie komponentu Header z nazwą kursu */}
			<Header course={course.name} />
			{/* Renderowanie komponentu Content z podziałem na poszczególne części kursu */}
			<Content parts={course.parts} />
			{/* Renderowanie komponentu Total z całkowitą liczbą ćwiczeń w kursie */}
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
