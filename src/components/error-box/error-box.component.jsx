import React from 'react';

import './error-box.styles.scss';

const ErrorBox = (props) => {
    return (
        <span className='error-box'>{props.children}</span>
    );
};

export default ErrorBox;