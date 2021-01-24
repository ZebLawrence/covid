import React, { Component } from 'react';
import { Spinner, Button } from 'reactstrap';
import Block from './Block';
import { getRandomInt } from '../../util/numberHelpers';
import numeral from 'numeral';
import './home.scss';

class RenderBlocks extends Component {
  constructor(props){
    super(props);
    
    this.state = {
        chunks: [],
        rendering: true,
        allowRender: true,
        currentCount: 0,
        defaultChunk: 25000
    };
    this.renderChunk = this.renderChunk.bind(this);
    this.toggleRender = this.toggleRender.bind(this);
    this.addBlock = this.addBlock.bind(this);
    this.renderChunkAtAtime = this.renderChunkAtAtime.bind(this);
    this.renderAnimateChunk = this.renderAnimateChunk.bind(this);
  }

  componentDidMount() {
    //this.renderChunk(this.props.count);
    //this.renderChunkAtAtime();
    this.renderAnimateChunk();
  }

  toggleRender(){
      const { allowRender, rendering } = this.state;
      this.setState({
        allowRender: !allowRender,
        rendering: !rendering
      })
  }

  renderAnimateChunk() {
    const { props, renderAnimateChunk, state } = this;
    const { count } = props;
    const { chunks, allowRender } = state;
    const chunk = 25000;
  
    if (chunks.length < count) {
      const chunkLeft = count - chunks.length < chunk ? (count - chunks.length) : chunk;
      for (let index = 0; index < chunkLeft; index++) {
        const imageNumber = getRandomInt(189); 
        chunks.push(
          <Block imageNumber={imageNumber} />
        );
      }
      this.setState({
        chunks
      });

      requestAnimationFrame(renderAnimateChunk);
    } else {
      this.setState({
        allowRender: false,
        rendering: false
      });
    }

  }

  renderChunkAtAtime() {
    const { addBlock, props } = this;
    const { count } = props;
    const chunk = 25000;
    let renderCount = 0;
    const renderingBlocks = window.setInterval(() => {
      const chunkLeft = count - renderCount < chunk ? (count - renderCount) : chunk;
      renderCount += chunkLeft;
      if (renderCount <= count) {
        addBlock(renderingBlocks, chunkLeft);
      } else {
        clearInterval(renderingBlocks);
        this.setState({
          allowRender: false,
          rendering: false
        });
      }
    }, 100);
  }

  addBlock(interval, howMany = 1) {
      const { chunks, allowRender } = this.state;
      
      if (allowRender) {
        for (let index = 0; index < howMany; index++) {
          const imageNumber = getRandomInt(189);     
          chunks.push(
            <Block imageNumber={imageNumber} />
          );
        }
        
        this.setState({
          chunks
        });
      } else {
        clearInterval(interval);
      }
  }

  renderChunk(count) {
    //const { images } = this.props;
    const { chunks, allowRender, currentCount, defaultChunk, mouseX, mouseY } = this.state;
    const chunkSize = count < defaultChunk ? count : defaultChunk;
    if (allowRender) {
      const blocks = [];
      for (let index = 0; index < chunkSize; index++) {
        const imageNumber = getRandomInt(189);

        blocks.push(
          <Block mouseX={mouseX} mouseY={mouseY} imageNumber={imageNumber} />
        );
      }
      const newCount = count - chunkSize;
      this.setState({
        chunks: chunks.concat(blocks)
      }, () => { 
        window.setTimeout(() => {
          if (chunkSize >= defaultChunk) {
              this.renderChunk(newCount);
          } else {
              this.setState({
                rendering: false
              });
          }
        }, 200);
      });
    }
  }

  render() {
    const { chunks, rendering, allowRender, leftToGo } = this.state;
    const { currentCopy } = this.props;
    const currentCount = (
        <div>
            {currentCopy != null ? currentCopy : 'Currently showing: '}
            {numeral(chunks.length).format('0,0')}
        </div>
    );

    return (
        <div>
            {currentCount}
            <div className="block-container">{chunks}</div>
            {rendering && allowRender ? <Button onClick={this.toggleRender}>Stop Render</Button> : null}
            {rendering && allowRender ? <Spinner /> : null}
        </div>
    );
  }
}

export default RenderBlocks;
