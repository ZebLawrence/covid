import React, { Component } from 'react';
import './home.scss';

class About extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <p>Data is sourced from the <a href="https://covidtracking.com/">The Covid Tracking Project</a> using their publicly available API.</p>
        <p>The photos are random profile photos from UIFaces authorized section</p>
      </div>
    );
  }
}

export default (About);
