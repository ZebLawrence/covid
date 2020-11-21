import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { requestCurrentStats } from '../../actions/covidActions';
import RenderBlocks from './RenderBlocks';
import './home.scss';

class Home extends Component {
  constructor(props){
    super(props);
    
    const { gewCurrent } = props;
    gewCurrent();
    this.state = {
      defaultMessage: 'This is the message from class Home construction',
      totalBlocks: []
    };
  }

  render() {
    const { fetching, currentStats } = this.props;
    const { death, deathIncrease, date } = currentStats || {};
    const year = `${date}`.slice(0, 4);
    const month = `${date}`.slice(4, 6);
    const dayNum = `${date}`.slice(6, 8);
    const dateFormat = `${month}-${dayNum}-${year}`;
  
    return (
      <div>
        <div>
          {`New deaths on ${moment(dateFormat).format('MMM D YYYY')}:`}
        </div>
        {deathIncrease && !fetching? <RenderBlocks currentCopy=" " count={deathIncrease} /> : null}
        <div className="mt-5">
          {`Total dead: ${death}`}
        </div>
        {death && !fetching? <RenderBlocks count={death} /> : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStats: state.covidData.currentStats,
  fetching: state.covidData.fetchingCurrentStats
});

const mapDispatchToProps = dispatch => ({
  gewCurrent: () => dispatch(requestCurrentStats())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
