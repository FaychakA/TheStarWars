import {Action} from 'redux';

export type InitialVehiclesState = {
    loading: boolean;
    loaded: boolean;
    error: string;
    data: Vehicles;
    vehicleDetail: Vehicle;
}

const VEHICLES_LOAD = 'VEHICLES_LOAD';
const VEHICLES_LOAD_SUCCESS = 'VEHICLES_LOAD_SUCCESS';
const VEHICLES_LOAD_ERROR = 'VEHICLES_LOAD_ERROR';
const VEHICLE_DETAIL = 'VEHICLE_DETAIL';

const initialState: InitialVehiclesState = {
    loading: false,
    loaded: false,
    error: "",
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    vehicleDetail: {
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
        vehicle_class: "",
        films: [""],
        pilots: [""],
        created: "",
        edited: "",
        url: "",
    },
};

export const vehiclesReducer = (state = initialState, action: AllVehiclesActions) => {
    switch (action.type) {
        case VEHICLES_LOAD :
            return {
                ...initialState,
                loading: true,
            };
        case VEHICLES_LOAD_SUCCESS :
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
        case VEHICLES_LOAD_ERROR :
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.error,
            };
        case VEHICLE_DETAIL :
            return {
                ...state,
                vehicleDetail: action.vehicleDetail,
            };
        default:
            return state
    }
};

type LoadVehicles = Action<typeof VEHICLES_LOAD>;

type LoadVehiclesSuccess = Action<typeof VEHICLES_LOAD_SUCCESS> & {
    data: Vehicles;
};

type LoadVehiclesError = Action<typeof VEHICLES_LOAD_ERROR> & {
    error: string;
};

type LoadVehicleDetail = Action<typeof VEHICLE_DETAIL> & {
    vehicleDetail: Vehicle;
};

export type AllVehiclesActions = LoadVehicles | LoadVehiclesSuccess | LoadVehiclesError | LoadVehicleDetail;

export const loadVehicles = (): LoadVehicles => {
    return {
        type: VEHICLES_LOAD
    }
};

export const loadVehiclesSuccess = (data: Vehicles): LoadVehiclesSuccess => {
    return {
        type: VEHICLES_LOAD_SUCCESS,
        data,
    }
};

export const loadVehicleDetail = (vehicleDetail: Vehicle): LoadVehicleDetail => {
    return {
        type: VEHICLE_DETAIL,
        vehicleDetail,
    }
};

export const loadVehiclesError = (error: string): LoadVehiclesError => {
    return {
        type: VEHICLES_LOAD_ERROR,
        error,
    }
};
