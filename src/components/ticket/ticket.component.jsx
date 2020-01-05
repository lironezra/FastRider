import React from 'react';

import { convertDateToTime } from '../../utils/utils';

import './ticket.styles.scss';

const Ticket = ({ ticket }) => {
    return (
        <div className='fast-ticket' style={{borderTop: `4px solid ${ticket.ride.zone.color}`}}>
            <div className='header'>
                <p className='ride-name'>{ticket.ride.name}</p>
                <p className='ride-zone-name'>{ticket.ride.zone.name}</p>
            </div>
            <div className='content'>
                <div className='return-time'>
                    <span>Return At</span>
                    <p>{convertDateToTime(ticket.return_time)}</p>
                </div>
                <div className='access-code'>
                    <span>Use Access Code</span>
                    <p>{ticket.access_code}</p>
                </div>
            </div>
        </div>
    );
};

export default Ticket;