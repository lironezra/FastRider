import * as actionTypes from './ride.types';

const getAllRidesRequest = () => {
    return {
        type: actionTypes.GET_ALL_RIDES_REQUEST
    };
};

const getAllRidesSuccess = rides => {
    return {
        type: actionTypes.GET_ALL_RIDES_SUCCESS,
        rides
    };
};

const getAllRidesFailed = error => {
    return {
        type: actionTypes.GET_ALL_RIDES_FAILED,
        error
    };
};

const selectRideId = rideId => {
    return {
        type: actionTypes.SELECT_RIDE,
        rideId
    }
}
export const fetchAllRides = () => dispatch => {
    dispatch(getAllRidesRequest());
    fetch(`http://fast-rider.herokuapp.com/api/v1/rides?token=433898df4a3e992b8411004109e4d574a90695e39e`, {
        method: 'GET'
    })
    .then(respone => respone.json())
    .then(rides => {
        // const ridesJson = rides.json();
        dispatch(getAllRidesSuccess(rides))
    })
    .catch(error => (dispatch(getAllRidesFailed(error.message))));     
};

export const selectRide = (rideId) => dispatch => {
    dispatch(selectRideId(rideId));
};


