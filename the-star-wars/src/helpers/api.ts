const API_URL_FILMS = 'https://swapi.dev/api/films/';
const API_URL_PEOPLE = 'https://swapi.dev/api/people/';
const API_URL_PLANETS = 'https://swapi.dev/api/planets/';
const API_URL_STARSHIPS = 'https://swapi.dev/api/starships/';
const API_URL_VEHICLES = 'https://swapi.dev/api/vehicles/';
const API_URL_SPECIES = 'https://swapi.dev/api/species/';

export const getFilms = async () => {
    const responseFilmsAPI = await fetch(API_URL_FILMS);
    const filmsFromServer = await responseFilmsAPI.json();

    return filmsFromServer;
};

export const getPeople = async (url: string | null) => {
    const API_URL = url || API_URL_PEOPLE;
    const responsePeopleAPI = await fetch(API_URL);
    const peopleFromServer = await responsePeopleAPI.json();

    return peopleFromServer;
};

export const getPlanets = async (url: string | null) => {
    const API_URL = url || API_URL_PLANETS;
    const responsePlanetsAPI = await fetch(API_URL);
    const planetsFromServer = await responsePlanetsAPI.json();

    return planetsFromServer;
};

export const getStarships = async (url: string | null) => {
    const API_URL = url || API_URL_STARSHIPS;
    const responseStarshipsAPI = await fetch(API_URL);
    const starshipsFromServer = await responseStarshipsAPI.json();

    return starshipsFromServer;
};

export const getVehicles = async (url: string | null) => {
    const API_URL = url || API_URL_VEHICLES;
    const responseVehiclesAPI = await fetch(API_URL);
    const vehiclesFromServer = await responseVehiclesAPI.json();

    return vehiclesFromServer;
};


export const getSpecies = async (url: string | null) => {
    const API_URL = url || API_URL_SPECIES;
    const responseSpeciesAPI = await fetch(API_URL);
    const speciesFromServer = await responseSpeciesAPI.json();

    return speciesFromServer;
};
