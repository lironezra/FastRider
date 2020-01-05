import React from 'react';

import InstructionItem from '../instruction-item/instruction-item.component';

import './instructions-preview.styles.scss';

const InstructionsPreview = ({ items }) => {
    return (
        <div className='instructions-preview'>
            {
                items.map((item, index) => (
                    <InstructionItem key={index} icon={item.icon} description={item.description} /> 
                ))
            }
        </div>
    );
};

export default InstructionsPreview;