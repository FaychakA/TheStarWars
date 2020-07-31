import {Action} from 'redux';

export type InitialFilmsState = {
    loading: boolean;
    loaded: boolean;
    error: string;
    data: Data;
    filmDetail: Film;
}

const FILMS_LOAD = 'FILMS_LOAD';
const FILMS_LOAD_SUCCESS = 'FILMS_LOAD_SUCCESS';
const FILMS_LOAD_ERROR = 'FILMS_LOAD_ERROR';
const FILM_DETAIL = 'FILM_DETAIL';

const initialState: InitialFilmsState = {
    loading: false,
    loaded: false,
    error: "",
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    filmDetail: {
        characters: [""],
        created: "",
        director: "",
        edited: "",
        episode_id: 0,
        opening_crawl: "",
        planets: [""],
        producer: "",
        release_date: "",
        species: [""],
        starships: [""],
        title: "",
        url: "",
        vehicles: [""],
        id: 0,
    },
};

export const filmsReducer = (state = initialState, action: AllFilmsActions) => {
    switch (action.type) {
        case FILMS_LOAD :
            return {
                ...initialState,
                loading: true,
            };
        case FILMS_LOAD_SUCCESS :
            return {
                ...state,
                loading: false,
                loaded: true,
                data: {
                    ...action.data,
                    results: action.data.results.map((film: Film, index: number) => ({
                        ...film,
                        id: index + 1,
                    })),
                }
            };
        case FILMS_LOAD_ERROR :
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case FILM_DETAIL:
            return {
                ...state,
                filmDetail: action.filmDetail,
            };
        default:
            return state
    }
};

type LoadFilms = Action<typeof FILMS_LOAD>;

type LoadFilmsSuccess = Action<typeof FILMS_LOAD_SUCCESS> & {
    data: Data;
};

type LoadFilmsError = Action<typeof FILMS_LOAD_ERROR> & {
    error: string;
};

type LoadFilmDetail = Action<typeof  FILM_DETAIL> & {
    filmDetail: Film;
};

export type AllFilmsActions = LoadFilms | LoadFilmsSuccess | LoadFilmsError | LoadFilmDetail;

export const loadFilms = (): LoadFilms => {
    return {
        type: FILMS_LOAD
    }
};

export const loadFilmsSuccess = (data: Data): LoadFilmsSuccess => {
    return {
        type: FILMS_LOAD_SUCCESS,
        data,
    }
};

export const loadFilmsError = (error: string): LoadFilmsError => {
    return {
        type: FILMS_LOAD_ERROR,
        error,
    }
};

export const loadFilmDetail = (filmDetail: Film): LoadFilmDetail => {
  return {
      type: FILM_DETAIL,
      filmDetail,
  }
};
