import { combineReducers } from 'redux';

import rideReducer from './ride/ride.reducer';
import ticketReducer from './ticket/ticket.reducer';


const appReducers = combineReducers({
    /* App top-level reducers */
    ride: rideReducer,
    ticket: ticketReducer
});

const rootReducer = (state, action) => {
    return appReducers(state, action)
}


export default rootReducer;