import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ handleChange, ...otherProps}) => {
    return (
        <div className='form-input'>
            <input 
                className='pin-value' 
                placeholder='#PIN' 
                onChange={handleChange}
                {...otherProps}
                /> 
        </div>
    );
};

export default FormInput;