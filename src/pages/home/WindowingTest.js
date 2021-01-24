import React, { forwardRef } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import { getRandomInt } from '../../util/numberHelpers';
import Block from "./Block";
import './home.scss';
import '../../assets/images.scss';

const GUTTER_SIZE = 1;
const COLUMN_WIDTH = 10;
const ROW_HEIGHT = 10;

const imageNumberCache = {};

const Cell = ({ columnIndex, rowIndex, style }) => {
    let foundImageNum = imageNumberCache[`${columnIndex}-${rowIndex}`];

    if (!foundImageNum) {
        foundImageNum = getRandomInt(189);
        imageNumberCache[`${columnIndex}-${rowIndex}`] = foundImageNum;
    }

    return (
        <div
            style={{
            ...style,
            left: style.left + GUTTER_SIZE,
            top: style.top + GUTTER_SIZE,
            width: style.width - GUTTER_SIZE,
            height: style.height - GUTTER_SIZE
            }}
        >
            <Block imageNumber={foundImageNum} />
        </div>
    );
};

const innerElementType = forwardRef(({ style, ...rest }, ref) => (
    <div
      ref={ref}
      style={{
        ...style,
        paddingLeft: GUTTER_SIZE,
        paddingTop: GUTTER_SIZE
      }}
      {...rest}
    />
));

const Example = props => {
    //const { count, containerWidth } = props;
    const containerWidth = 600;
    const count = 400;

    const colNum = Math.ceil(containerWidth / (ROW_HEIGHT + GUTTER_SIZE));
    const rowNum = Math.ceil(count / colNum);
    

    return (
        <Grid
            className="Grid"
            columnCount={colNum}
            columnWidth={COLUMN_WIDTH + GUTTER_SIZE}
            height={(rowNum * (ROW_HEIGHT + GUTTER_SIZE)) + 100}
            innerElementType={innerElementType}
            rowCount={rowNum}
            rowHeight={ROW_HEIGHT + GUTTER_SIZE}
            width={containerWidth + 50}
            >
            {Cell}
        </Grid>
    );
};

export default Example;
