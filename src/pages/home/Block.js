import React from 'react';

const Block = props => {
    const { imageNumber } = props;

    return (
        <span className={`block ${`image${imageNumber}`}`}></span>
    );
};

export default Block;