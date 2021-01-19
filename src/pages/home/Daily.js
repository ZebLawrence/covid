import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import moment from 'moment';
import { requestDailyStats } from '../../actions/covidActions';
import RenderBlocks from './RenderBlocks';
import '../../assets/images.scss';
import './home.scss';

class Daily extends Component {
  constructor(props){
    super(props);
    
    const { getDaily } = props;
    getDaily();
    this.state = {
      defaultMessage: 'This is the message from class Home construction',
      totalBlocks: []
    };
  }

  render() {
    const { fetching, dailyStats } = this.props;
    const dailyDeaths = dailyStats && !fetching && dailyStats.length ? dailyStats.reverse() : [];
    
    return (
      <div>
        {fetching ? <Spinner /> : null}
        Deaths by day:
        <div>
            {
              dailyDeaths.map(day => {
                  const { date, deathIncrease } = day || {};
                  const year = `${date}`.slice(0, 4);
                  const month = `${date}`.slice(4, 6);
                  const dayNum = `${date}`.slice(6, 8);
                  const dateFormat = `${month}/${dayNum}/${year}`;
                  if (deathIncrease !== 0) {
                    return (
                        <div className="day-row">
                            <RenderBlocks currentCopy={`${moment(dateFormat).format('MMM D, YYYY')}:  `} count={deathIncrease} />
                        </div>
                    );
                  } else {
                    return null;
                  }
              })
            }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dailyStats: state.covidData.dailyStats,
  fetching: state.covidData.fetchingDailyStats
});

const mapDispatchToProps = dispatch => ({
  getDaily: () => dispatch(requestDailyStats())
});

export default connect(mapStateToProps, mapDispatchToProps)(Daily);
