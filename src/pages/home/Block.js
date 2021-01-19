import React, { useRef, useEffect } from 'react';

const Block = props => {
    const { mouseX, mouseY, imageNumber } = props;
    const blockRef = useRef();
    useEffect(() => {
        const { current } = blockRef || {};
        const { offsetLeft, offsetTop } = current || {};
        const dx = Math.abs(offsetLeft - mouseX);
        const dy = Math.abs(offsetTop - mouseY);
    }, [mouseX, mouseY]);

    return (
        <span ref={blockRef} className={`block ${`image${imageNumber}`}`}></span>
    );
};

export default Block;