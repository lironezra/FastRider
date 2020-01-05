import React, { useState } from 'react';
import { connect } from 'react-redux';

import { CONSTANT_PARAMS } from '../../utils/utils';
import { convertDateToTime } from '../../utils/utils';
import { selectRide } from '../../redux/ride/ride.actions';

import WatchIcon from '../../assets/ico-g-03.png';
import TicketIcon from '../../assets/ico-g-01.png';

import './collection-item.styles.scss';

const CollectioItem = ({ item: {id , zone, name, remaining_tickets, return_time }, onRideSelect, selectedRideId }) => {
    const [color, setColor] = useState('');
    const returnTime = convertDateToTime(return_time);
    const isOutOfStock = remaining_tickets === CONSTANT_PARAMS.OUT_OF_STOCK_AMOUNT;

    const handleOnCloik = () => {
        setColor(zone.color);
        onRideSelect(id);
    }

    return (
        <div key={id} 
            className={`collection-item ${isOutOfStock ? 'disabled' : ''}`}
            onClick={() => handleOnCloik()} 
            style={{ backgroundColor: `${id === selectedRideId ? color : '#373737'}`, borderTop: `4px solid ${zone.color}` }}>
            <div className='item-header'>
                <p className='header-text'>{zone.name}</p>
            </div>
            <div className='item-name'>
                <p className='name-text'>{name}</p>
            </div>
            <div className='item-footer'>
                <div className='footer-left'>
                    <img src={WatchIcon} className='icon' alt='watch' />
                    <p className='text'>
                        {
                            returnTime
                        }
                    </p>
                </div>
                <div className='footer-right'>
                    <img src={TicketIcon} className='icon' alt='ticket' />
                    <p className={`text ${ isOutOfStock ? 'out-of-stock' : null }`}>
                        {isOutOfStock ? 'out of stock' : remaining_tickets}
                    </p>
                </div>

            </div>
        </div>

    );
};

const mapDispatchToProps = dispatch => {
    return {
        onRideSelect: (rideId) => dispatch(selectRide(rideId))
    }
}

const mapStateToProps = state => {
    return {
        selectedRideId: state.ride.selectedRideId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectioItem);