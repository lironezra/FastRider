import React from 'react';

import CollectionItem from '../collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ rides }) => {
    return (
        <div className='collection-preview'>
            {
                rides.map(ride => (
                    <CollectionItem key={ride.id} item={ride}/>
                ))
            }
        </div>
    );
};

export default CollectionPreview;