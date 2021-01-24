import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import moment from 'moment';
import { requestDailyStats } from '../../actions/covidActions';
import RenderBlocksNoChunk from './RenderBlocksNoChunk';
import numeral from 'numeral';
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
                  const { dateChecked, deathIncrease } = day || {};

                  if (deathIncrease !== 0) {
                    return (
                        <div className="day-row">
                            <RenderBlocksNoChunk currentCopy={`${moment(dateChecked).format('MMM D, YYYY')}: ${numeral(deathIncrease).format('0,0')}`} count={deathIncrease} />
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
