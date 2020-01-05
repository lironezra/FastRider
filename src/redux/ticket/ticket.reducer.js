import * as actionTypes from './ticket.types';

const INITIAL_STATE = {
    tickets: null,
    loading: false,
    error: null
};

const ticketsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_TICKET_REQUEST: return purchaseTicketRequest(state, action);
        case actionTypes.PURCHASE_TICKET_SUCCESS: return purchaseTicketSuccess(state, action);
        case actionTypes.PURCHASE_TICKET_FAILED: return purchaseTicketFailed(state, action);
        default:
            return state;
    }
}

const purchaseTicketRequest = (state) => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const purchaseTicketSuccess = (state, action) => {
    return {
        ...state,
        loading: false,
        error: null,
        tickets: action.tickets
    }
}

const purchaseTicketFailed = (state, action) => {
    return {
        ...state,
        loading: false,
        tickets: null,
        error: action.error
    }
}

export default ticketsReducer;