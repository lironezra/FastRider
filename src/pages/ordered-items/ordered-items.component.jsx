import React from 'react';
import { connect } from 'react-redux';

import InstructionItem from '../../components/instruction-item/instruction-item.component';
import CheckIcon from '../../assets/ico-04.png';
import CustomButton from '../../components/custom-button/custom-button.component';
import Ticket from '../../components/ticket/ticket.component';
import ErrorBox from '../../components/error-box/error-box.component';

import './ordered-items.styles.scss';

const OrderedItemsPage = ({ticket, error, history}) => {
    
    let ticketView = error ? <ErrorBox>{error}</ErrorBox> : <p>Loading...</p>;
    let instructionDescription = `Thank you for using The Jungle FastRider tickets system - 
    ${ error ? 'there was a problem with this reservation :(' : 'your access code is now ready!'}`;
    
    if(ticket) {
        ticketView = <Ticket ticket={ticket} />
    }

    return (
        <div className='page'>
            <div className='back-button-container'>
                <CustomButton onClick={() => goBack(history)}>Go Back</CustomButton> 
            </div>
            <InstructionItem 
                className='instruction-item'
                icon={CheckIcon} 
                description={instructionDescription}/>
            {ticketView}
        </div>
    );
};

const goBack = history => {
    history.goBack();
}

const mapStateToProps = (state) => {
    return {
        ticket: state.ticket.tickets,
        error: state.ticket.error
    }
}

export default connect(mapStateToProps)(OrderedItemsPage);