// Import modułu axios do obsługi żądań HTTP
import axios from "axios";

// Adres bazowy dla API z osobami
const baseUrl = "/api/persons";

// Funkcja pobierająca wszystkie osoby
const getAll = () => {
  // Wywołanie żądania GET do API
  const data = axios.get(baseUrl);
  // Zwrócenie danych jako obietnicy
  return data.then((response) => response.data);
};

const createPerson = (newObject) => {
	console.log("Przed wysłaniem żądania:", newObject);
	const data = axios.post(baseUrl, newObject);
	return data.then((response) => {
	  console.log("Odpowiedź po wysłaniu żądania:", response.data);
	  return response.data;
	});
  };
  

// Funkcja aktualizująca dane osoby
const updatePerson = (id, newObject) => {
  // Wywołanie żądania PUT do API z zaktualizowanymi danymi osoby
  const data = axios.put(`${baseUrl}/${id}`, newObject);
  // Zwrócenie danych jako obietnicy
  return data.then((response) => response.data);
};

// Funkcja usuwająca osobę
const deletePerson = (id, obj) => {
  // Wywołanie żądania DELETE do API z identyfikatorem osoby do usunięcia
  const data = axios.delete(`${baseUrl}/${id}`, { data: obj });
  // Zwrócenie danych jako obietnicy
  return data.then((response) => response.data);
};

// Obiekt usługi zawierający funkcje do obsługi danych o osobach
const entryService = {
  getAll,
  createPerson,
  updatePerson,
  deletePerson,
};

// Eksportowanie obiektu usługi entryService
export default entryService;
