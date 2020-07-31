import {Action} from 'redux';

export type InitialPeopleState = {
    loading: boolean;
    loaded: boolean;
    error: string;
    data: People;
    peopleDetail: Human;
}

const PEOPLE_LOAD = 'PEOPLE_LOAD';
const PEOPLE_LOAD_SUCCESS = 'PEOPLE_LOAD_SUCCESS';
const PEOPLE_LOAD_ERROR = 'PEOPLE_LOAD_ERROR';
const PEOPLE_DETAIL = 'PEOPLE_DETAIL';

const initialState: InitialPeopleState = {
    loading: false,
    loaded: false,
    error: "",
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    peopleDetail: {
        name: "",
        height: "",
        mass: "",
        hair_color: "",
        skin_color: "",
        eye_color: "",
        birth_year: "",
        gender: "",
        homeworld: "",
        films: [""],
        species: [""],
        starships: [""],
        vehicles: [""],
        created: "",
        edited: "",
        url: "",
    },
};

export const peopleReducer = (state = initialState, action: AllPeopleActions) => {
    switch (action.type) {
        case PEOPLE_LOAD :
            return {
                ...initialState,
                loading: true,
            };
        case PEOPLE_LOAD_SUCCESS :
            return {
                ...state,
                loading: !!action.data.next,
                loaded: !action.data.next,
                data: {
                    ...action.data,
                    results: [
                        ...state.data.results,
                        ...action.data.results,
                    ],
                },
            };
        case PEOPLE_LOAD_ERROR :
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case PEOPLE_DETAIL :
            return {
                ...state,
                peopleDetail: action.peopleDetail,
            };
        default:
            return state
    }
};

type LoadPeople = Action<typeof PEOPLE_LOAD>;

type LoadPeopleSuccess = Action<typeof PEOPLE_LOAD_SUCCESS> & {
    data: People;
};

type LoadPeopleError = Action<typeof PEOPLE_LOAD_ERROR> & {
    error: string;
};

type LoadPeopleDetail = Action<typeof PEOPLE_DETAIL> & {
  peopleDetail: Human;
};

export type AllPeopleActions = LoadPeople | LoadPeopleSuccess | LoadPeopleError | LoadPeopleDetail;

export const loadPeople = (): LoadPeople => {
    return {
        type: PEOPLE_LOAD
    }
};

export const loadPeopleSuccess = (data: People): LoadPeopleSuccess => {
    return {
        type: PEOPLE_LOAD_SUCCESS,
        data
    }
};

export const loadPeopleDetail = (peopleDetail: Human): LoadPeopleDetail => {
    return {
        type: PEOPLE_DETAIL,
        peopleDetail,
    }
};

export const loadPeopleError = (error: string): LoadPeopleError => {
    return {
        type: PEOPLE_LOAD_ERROR,
        error,
    }
};
