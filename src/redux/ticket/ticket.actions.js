import * as actionTypes from './ticket.types';

const purchaseTicketRequest = () => {
    return {
        type: actionTypes.PURCHASE_TICKET_REQUEST
    };
};

const purchaseTicketSuccess = tickets => {
    return {
        type: actionTypes.PURCHASE_TICKET_SUCCESS,
        tickets
    };
};

const purchaseTicketFailed = error => {
    return {
        type: actionTypes.PURCHASE_TICKET_FAILED,
        error
    }
}

export const purchaseTickets = (apiParams) => dispatch => {
    dispatch(purchaseTicketRequest());
    fetch('http://fast-rider.herokuapp.com/api/v1/tickets', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apiParams)
    })
    .then(respone => respone.json())
    .then(tickets => {
        if (tickets.hasOwnProperty('code')) { // indecate that we are getting error response 
            dispatch(purchaseTicketFailed(tickets.message));
        } else {
            dispatch(purchaseTicketSuccess(tickets));
        }
    })
    .catch(error => dispatch(purchaseTicketFailed(error)));
};
