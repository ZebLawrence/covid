import React, { Component } from 'react';
import { Spinner } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { requestCurrentStats, requestPopulation, requestDailyStats } from '../../actions/covidActions';
import RenderBlocks from './RenderBlocks';
import RenderBlocksNoChunk from './RenderBlocksNoChunk';
import numeral from 'numeral';
import '../../assets/images.scss';
import './home.scss';

class Home extends Component {
  constructor(props){
    super(props);
    
    const { getCurrent, getPopulation, getDaily } = props;
    getDaily();
    getCurrent();
    getPopulation();
  }

  render() {
    const { fetching, currentStats, dailyStats, fetchingDaily, populationStats, fetchingPopulation } = this.props;
    const { death, deathIncrease, dateChecked } = currentStats || {};
    const { us } = populationStats || {};
    const { population } = us || {};
    const last7Days = !fetchingDaily && dailyStats && dailyStats.length
      ? dailyStats.slice(0, 7)
      : [];

    let last7DayTotalDeaths = 0;
    let per1000PeopleDeaths = 0;
    last7Days.forEach(dayStats => {
      const { deathIncrease: dayDeaths } = dayStats || {};
      last7DayTotalDeaths += dayDeaths;
    });

    if (population && death) {
      const quotient = Math.floor(population / 1000);
      per1000PeopleDeaths = Math.floor(death / quotient);
    }

    return (
      <div>
        <p>
          The numbers describing this pandemic have become so large, repeated so often that they have lost their meaning. It's difficult to understand what it means when the news anchor says 2000 people died today, and again, day after day.
        </p>
        <p>
          I created this to help myself visualize what that actually means. It means that each of those numbers is a person. People that had families, medical personnel that did what they could, funerals, graves. Then all over again the next day, every day, for the last {moment().diff(moment('2/26/20'), 'months')} months.
        </p>
        {
          !fetching
          && !fetchingDaily
          && !fetchingPopulation
          && deathIncrease
          && death
            ? <>
                <p>Since the pandemic began we have endured the equivalent of: <strong>{Math.floor(death / 2977)}</strong> 9/11's.</p>
                <p>Since the pandemic began roughly: <strong>{Math.floor(death / 10000)}</strong> D-days's.</p>
                <p>Averaging: <strong>{numeral(Math.floor(death / moment().diff(moment('2/26/20'), 'days'))).format('0,0')}</strong> per day since the first US deaths ({moment('2/26/20').format('MMM D, YYYY')}).</p>
                <p>Averaging: <strong>{numeral(Math.floor(last7DayTotalDeaths / 7)).format('0,0')}</strong> in the last <strong>7</strong> days.</p>
                <p><strong>{numeral(per1000PeopleDeaths).format('0,0')}</strong> out of every <strong>1,000</strong> people in the US have died.</p>
                <RenderBlocksNoChunk currentCopy={`New deaths on ${moment(dateChecked).format('MMM D, YYYY')}: ${numeral(deathIncrease).format('0,0')}`} count={deathIncrease} />
                <div className="mt-5">
                  {`Total dead: ${numeral(death).format('0,0')}`}
                </div>
                <RenderBlocks count={death} />
            </>
            : <Spinner />
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStats: state.covidData.currentStats,
  fetching: state.covidData.fetchingCurrentStats,
  dailyStats: state.covidData.dailyStats,
  fetchingDaily: state.covidData.fetchingDailyStats,
  populationStats: state.covidData.population,
  fetchingPopulation: state.covidData.fetchingPopulation
});

const mapDispatchToProps = dispatch => ({
  getCurrent: () => dispatch(requestCurrentStats()),
  getDaily: () => dispatch(requestDailyStats()),
  getPopulation: () => dispatch(requestPopulation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
