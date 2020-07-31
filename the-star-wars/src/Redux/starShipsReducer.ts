import {Action} from 'redux';

export type InitialStarshipsState = {
    loading: boolean;
    loaded: boolean;
    error: string;
    data: Starships;
    starshipDetail: Starship;
}

const STARSHIPS_LOAD = 'STARSHIPS_LOAD';
const STARSHIPS_LOAD_SUCCESS = 'STARSHIPS_LOAD_SUCCESS';
const STARSHIPS_LOAD_ERROR = 'STARSHIPS_LOAD_ERROR';
const STARSHIP_DETAIL = 'STARSHIP_DETAIL';

const initialState: InitialStarshipsState = {
    loading: false,
    loaded: false,
    error: "",
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    starshipDetail: {
        name: "",
        model: "",
        manufacturer: "",
        cost_in_credits: "",
        length: "",
        max_atmosphering_speed: "",
        crew: "",
        passengers: "",
        cargo_capacity: "",
        consumables: "",
        hyperdrive_rating: "",
        MGLT: "",
        starship_class: "",
        films: [""],
        pilots: [""],
        created: "",
        edited: "",
        url: "",
    },
};

export const starshipsReducer = (state = initialState, action: AllStarshipsActions) => {
    switch (action.type) {
        case STARSHIPS_LOAD :
            return {
                ...initialState,
                loading: true,
            };
        case STARSHIPS_LOAD_SUCCESS :
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
        case STARSHIPS_LOAD_ERROR :
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case STARSHIP_DETAIL :
            return {
                ...state,
                starshipDetail: action.starshipDetail,
            };
        default:
            return state
    }
};

type LoadStarships = Action<typeof STARSHIPS_LOAD>;

type LoadStarshipsSuccess = Action<typeof STARSHIPS_LOAD_SUCCESS> & {
    data: Starships;
};

type LoadStarshipsError = Action<typeof STARSHIPS_LOAD_ERROR> & {
    error: string;
};

type LoadStarshipDetail = Action<typeof STARSHIP_DETAIL> & {
    starshipDetail: Starship;
};

export type AllStarshipsActions = LoadStarships | LoadStarshipsSuccess | LoadStarshipsError | LoadStarshipDetail;

export const loadStarships = (): LoadStarships => {
    return {
        type: STARSHIPS_LOAD
    }
};

export const loadStarshipsSuccess = (data: Starships): LoadStarshipsSuccess => {
    return {
        type: STARSHIPS_LOAD_SUCCESS,
        data,
    }
};

export const loadStarshipDetail = (starshipDetail: Starship): LoadStarshipDetail => {
    return {
        type: STARSHIP_DETAIL,
        starshipDetail,
    }
};

export const loadStarshipsError = (error: string): LoadStarshipsError => {
    return {
        type: STARSHIPS_LOAD_ERROR,
        error,
    }
};
