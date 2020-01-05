import * as actionTypes from './ride.types';

const INITIAL_STATE = {
    rides: null,
    selectedRideId: null,
    pinCode: '',
    loading: false,
    error: null
};

const rideReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.GET_ALL_RIDES_REQUEST: return getAllRidesRequest(state, action);
        case actionTypes.GET_ALL_RIDES_SUCCESS: return getAllRidesSuccess(state, action);
        case actionTypes.GET_ALL_RIDES_FAILED: return getAllRidesFailed(state, action);
        case actionTypes.SELECT_RIDE: return selectRide(state, action);
        default:
            return state;
    }
}

const getAllRidesRequest = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const getAllRidesSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        selectedRideId: null,
        rides: action.rides
    }
}

const getAllRidesFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const selectRide = (state, action) => {
    return {
        ...state,
        selectedRideId: action.rideId
    }
}

export default rideReducer;