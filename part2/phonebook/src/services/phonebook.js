import axios from 'axios'
const baseUrl = '/api/persons'

// Funkcja pobierająca wszystkie osoby z serwera
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// Funkcja tworząca nową osobę na serwerze
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

// Funkcja aktualizująca istniejącą osobę na serwerze
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

// Funkcja usuwająca osobę z serwera
const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

// Obiekt zawierający funkcje obsługujące operacje na serwerze
const phonebookService = { getAll, create, deletePerson, update }

// Eksportowanie obiektu phonebookService jako domyślnego
export default phonebookService
