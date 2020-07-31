import {Action} from 'redux';

export type InitialPlanetsState = {
    loading: boolean;
    loaded: boolean;
    error: string;
    data: Planets;
    planetDetail: Planet;
}

const PLANETS_LOAD = 'PLANETS_LOAD';
const PLANETS_LOAD_SUCCESS = 'PLANETS_LOAD_SUCCESS';
const PLANETS_LOAD_ERROR = 'PLANETS_LOAD_ERROR';
const PLANETS_DETAIL = 'PLANETS_DETAIL';

const initialState: InitialPlanetsState = {
    loading: false,
    loaded: false,
    error: "",
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    planetDetail: {
        name: "",
        rotation_period: "",
        orbital_period: "",
        diameter: "",
        climate: "",
        gravity: "",
        terrain: "",
        surface_water: "",
        population: "",
        films: [""],
        residents: [""],
        created: "",
        edited: "",
        url: "",
    },
};

export const planetsReducer = (state = initialState, action: AllPlanetsActions) => {
    switch (action.type) {
        case PLANETS_LOAD :
            return {
                ...initialState,
                loading: true,
            };
        case PLANETS_LOAD_SUCCESS :
            return {
                ...state,
                loading: false,
                loaded: !action.data.next,
                data: {
                    ...action.data,
                    results: [
                        ...state.data.results,
                        ...action.data.results,
                    ],
                },
            };
        case PLANETS_LOAD_ERROR :
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case PLANETS_DETAIL :
            return {
                ...state,
                planetDetail: action.planetDetail,
            };
        default:
            return state
    }
};

type LoadPlanets = Action<typeof PLANETS_LOAD>;

type LoadPlanetsSuccess = Action<typeof PLANETS_LOAD_SUCCESS> & {
    data: Planets;
};

type LoadPlanetsError = Action<typeof PLANETS_LOAD_ERROR> & {
    error: string;
};

type LoadPlanetDetail = Action<typeof  PLANETS_DETAIL> & {
    planetDetail: Planet;
};

export type AllPlanetsActions = LoadPlanets | LoadPlanetsSuccess | LoadPlanetsError | LoadPlanetDetail;

export const loadPlanets = (): LoadPlanets => {
    return {
        type: PLANETS_LOAD
    }
};

export const loadPlanetsSuccess = (data: Planets): LoadPlanetsSuccess => {
    return {
        type: PLANETS_LOAD_SUCCESS,
        data,
    }
};

export const loadPlanetsError = (error: string): LoadPlanetsError => {
    return {
        type: PLANETS_LOAD_ERROR,
        error,
    }
};

export const loadPlanetDetail = (planetDetail: Planet): LoadPlanetDetail => {
    return {
        type: PLANETS_DETAIL,
        planetDetail,
    }
};
