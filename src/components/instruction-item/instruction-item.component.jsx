import React from 'react';

import './instruction-item.styles.scss';

const InstructionItem = ({ icon, description }) => {
    return (
    <div className='instruction-item'>
        <div className='logo-container'>
            <img src={icon} className='logo' alt='ticket-img' />
        </div>
        <div className='description-container'>
            <p className='description-text'>
                {description}
            </p>
        </div>
    </div>
    );
};

export default InstructionItem;