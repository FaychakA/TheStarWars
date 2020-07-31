import { combineReducers, createStore } from 'redux';
import {InitialFilmsState, filmsReducer} from "./filmsReducer";
import {InitialPeopleState, peopleReducer} from "./peopleReducer";
import {InitialPlanetsState, planetsReducer} from "./planetsReducer";
import {InitialStarshipsState, starshipsReducer} from "./starShipsReducer";
import {InitialVehiclesState, vehiclesReducer} from "./vehiclesReducer";
import {InitialKindsState, kindsReducer} from "./speciesReducer";

const rootReducer = combineReducers({
    films: filmsReducer,
    people: peopleReducer,
    planets: planetsReducer,
    starships: starshipsReducer,
    vehicles: vehiclesReducer,
    kinds: kindsReducer,
});

const store = createStore(rootReducer);

type State = {
    films: InitialFilmsState;
    people: InitialPeopleState;
    planets: InitialPlanetsState;
    starships: InitialStarshipsState,
    vehicles: InitialVehiclesState,
    kinds: InitialKindsState,
};

export const filmsSelector = (state: State) => (
    state.films
);

export const peopleSelector = (state: State) => (
    state.people
);

export const planetsSelector = (state: State) => (
    state.planets
);

export const starshipsSelector = (state: State) => (
    state.starships
);

export const vehiclesSelector = (state: State) => (
    state.vehicles
);

export const kindsSelector = (state: State) => (
    state.kinds
);

export const currentFilmSelector = (state: State) => (
    state.films.filmDetail
);

export const currentPeopleSelector = (state: State) => (
    state.people.peopleDetail
);

export const currentPlanetSelector = (state: State) => (
    state.planets.planetDetail
);

export const currentStarshipSelector = (state: State) => (
    state.starships.starshipDetail
);

export const currentVehicleSelector = (state: State) => (
    state.vehicles.vehicleDetail
);

export const currentSpeciesSelector = (state: State) => (
    state.kinds.speciesDetail
);

export default store;
