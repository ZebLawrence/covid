import React, { Component } from 'react';
import { Spinner, Button } from 'reactstrap';
import { getRandomInt } from '../../util/numberHelpers';
import './home.scss';

class RenderBlocks extends Component {
  constructor(props){
    super(props);
    
    this.state = {
        chunks: [],
        rendering: true,
        allowRender: true,
        currentCount: 0
    };
    this.renderChunk = this.renderChunk.bind(this);
    this.toggleRender = this.toggleRender.bind(this);
  }

  componentDidMount() {
    this.renderChunk(this.props.count);
  }

  toggleRender(){
      const { allowRender, rendering } = this.state;
      this.setState({
        allowRender: !allowRender,
        rendering: !rendering
      })
  }

  renderChunk(count) {
    //const { images } = this.props;
    const { chunks, allowRender, currentCount } = this.state;
    const chunkSize = count < 25000 ? count : 25000;
    if (allowRender) {
      const blocks = [];
      for (let index = 0; index < chunkSize; index++) {
        const imageNumber = getRandomInt(189);
        //const image = images[`image${imageNumber}`] || images[`image1`];

        blocks.push(
          <span className={`block ${`image${imageNumber}`}`}></span>
        );    
      }
      const newCount = count - chunkSize;
      this.setState({
        chunks: chunks.concat(blocks)
      }, () => { 
        window.setTimeout(() => {
          if (chunkSize >= 25000) {
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
    return (
        <div>
            <div>
                {currentCopy != null ? currentCopy : 'Currently showing: '}
                {chunks.length}
            </div>
            <div className="block-container">{chunks}</div>
            {rendering && allowRender ? <Button onClick={this.toggleRender}>Toggle Render</Button> : null}
            {rendering && allowRender ? <Spinner /> : null}
        </div>
    );
  }
}

export default RenderBlocks;
