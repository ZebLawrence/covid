import React, { Component } from 'react';
import Block from './Block';
import { getRandomInt } from '../../util/numberHelpers';
import './home.scss';

class RenderBlocksNoChunk extends Component {
  constructor(props){
    super(props);
    
    this.state = {
        currentCount: 0,
        defaultChunk: 25000
    };
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseMove(event){
    const { pageX, pageY } = event || {};

    this.setState({
      mouseX: pageX,
      mouseY: pageY
    });
  }

  render() {
    const { mouseX, mouseY } = this.state;
    const { currentCopy, count } = this.props;
    const blocks = [];

    for (let index = 0; index < count; index++) {
      const imageNumber = getRandomInt(189);
      blocks.push(
        <Block mouseX={mouseX} mouseY={mouseY} imageNumber={imageNumber} />
      );    
    }

    return (
        <div>
            {currentCopy}
            <div className="block-container">{blocks}</div>
        </div>
    );
  }
}

export default RenderBlocksNoChunk;
