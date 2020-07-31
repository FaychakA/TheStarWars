import {Action} from 'redux';

export type InitialKindsState = {
    loading: boolean;
    loaded: boolean;
    error: string;
    data: Kinds;
    speciesDetail: Species;
}

const KINDS_LOAD = 'KINDS_LOAD';
const KINDS_LOAD_SUCCESS = 'KINDS_LOAD_SUCCESS';
const KINDS_LOAD_ERROR = 'KINDS_LOAD_ERROR';
const SPECIES_DETAIL = 'KINDS_DETAIL';

const initialState: InitialKindsState = {
    loading: false,
    loaded: false,
    error: "",
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    speciesDetail: {
        name: "",
        classification: "",
        designation: "",
        average_height: "",
        skin_colors: "",
        hair_colors: "",
        eye_colors: "",
        average_lifespan: "",
        language: "",
        homeworld: "",
        films: [""],
        people: [""],
        created: "",
        edited: "",
        url: "",
    },
};

export const kindsReducer = (state = initialState, action: AllKindsActions) => {
    switch (action.type) {
        case KINDS_LOAD :
            return {
                ...initialState,
                loading: true,
            };
        case KINDS_LOAD_SUCCESS :
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
        case KINDS_LOAD_ERROR :
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case SPECIES_DETAIL :
            return {
                ...state,
                speciesDetail: action.speciesDetail,
            };
        default:
            return state
    }
};

type LoadKinds = Action<typeof KINDS_LOAD>;

type LoadKindsSuccess = Action<typeof KINDS_LOAD_SUCCESS> & {
    data: Kinds;
};

type LoadKindsError = Action<typeof KINDS_LOAD_ERROR> & {
    error: string;
};

type LoadSpeciesDetail = Action<typeof SPECIES_DETAIL> & {
    speciesDetail: Species;
};

export type AllKindsActions = LoadKinds | LoadKindsSuccess | LoadKindsError | LoadSpeciesDetail;

export const loadKinds = (): LoadKinds => {
    return {
        type: KINDS_LOAD,
    }
};

export const loadKindsSuccess = (data: Kinds): LoadKindsSuccess => {
    return {
        type: KINDS_LOAD_SUCCESS,
        data,
    }
};

export const loadSpeciesDetail = (speciesDetail: Species): LoadSpeciesDetail => {
    return {
        type: SPECIES_DETAIL,
        speciesDetail,
    }
};

export const loadKindsError = (error: string): LoadKindsError => {
    return {
        type: KINDS_LOAD_ERROR,
        error,
    }
};
