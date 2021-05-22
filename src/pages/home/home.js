import React, { Component } from 'react';
import { Spinner, ButtonGroup, Button, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import { requestCurrentStats, requestPopulation, requestDailyStats } from '../../actions/covidActions';
import RenderBlocks from './RenderBlocks';
import RenderBlocksNoChunk from './RenderBlocksNoChunk';
import numeral from 'numeral';
import Slider from './Slider';
import '../../assets/images.scss';
import './home.scss';

class Home extends Component {
  constructor(props){
    super(props);
    const { getPopulation } = props;
    const selectedDateIndex = this.getMaxIndex();

    this.state = {
      view: 'yesterday',
      selectedDateIndex
    };
    getPopulation();
    this.setView = this.setView.bind(this);
    this.changeDate = this.changeDate.bind(this);
  }

  getMaxIndex(){
    const { dailyStats } = this.props;
    let selectedDateIndex = 0;
    let max = 0;
    // set highest
    dailyStats.reverse().forEach((ds, i) => {
      const { deathIncrease } = ds;
      if (deathIncrease > max) {
        max = deathIncrease;
        selectedDateIndex = i;
      }
    });

    return selectedDateIndex;
  }

  setView(view) {
    let selectedDateIndex = 0;
    if (view === 'yesterday') {
      selectedDateIndex = this.getMaxIndex();
    }
    this.setState({
      view,
      selectedDateIndex
    });
  }

  changeDate(event) {
    console.log('Change event', event);
    const selectedDateIndex = Number(event.currentTarget.value);
    this.setState({ selectedDateIndex });
  }

  render() {
    const { fetching, currentStats, dailyStats, fetchingDaily, populationStats, fetchingPopulation } = this.props;
    const { view, selectedDateIndex } = this.state;
    const { death, deathIncrease, dateChecked } = currentStats || {};
    const { us } = populationStats || {};
    const { population } = us || {};
    const last7Days = !fetchingDaily && dailyStats && dailyStats.length
      ? dailyStats.slice(0, 7)
      : [];
    const dailyDeaths = dailyStats && !fetchingDaily && dailyStats.length ? dailyStats.reverse() : [];
    let last7DayTotalDeaths = 0;
    let per1000PeopleDeaths = 0;
    let per10000PeopleDeaths = 0;
    last7Days.forEach(dayStats => {
      const { deathIncrease: dayDeaths } = dayStats || {};
      last7DayTotalDeaths += dayDeaths;
    });

    if (population && death) {
      const quotient = Math.floor(population / 1000);
      const quotient10Thousand = Math.floor(population / 10000);
      per1000PeopleDeaths = Math.floor(death / quotient);
      per10000PeopleDeaths = Math.floor(death / quotient10Thousand);
    }

    const dayIncreaseToUse = dailyStats && !fetchingDaily && dailyStats.length ? dailyStats.reverse()[selectedDateIndex] : {};

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
                <Slider
                  per1000PeopleDeaths={per1000PeopleDeaths}
                  per10000PeopleDeaths={per10000PeopleDeaths}
                  last7DayTotalDeaths={last7DayTotalDeaths}
                  death={death} />
                <div className="button-row">
                  <Label>View</Label>
                  <ButtonGroup size="sm">
                    <Button onClick={() => this.setView('yesterday')} outline={view !== 'yesterday'}>Most in a Single Day</Button>
                    <Button onClick={() => this.setView('daily')} outline={view !== 'daily'}>Daily</Button>
                    <Button onClick={() => this.setView('total')} outline={view !== 'total'}>Total</Button>
                  </ButtonGroup>
                </div>
                {
                  view === 'yesterday'
                    ? (
                      <>
                        <div className="date-select">
                          <span>{`Deaths on:`}</span>
                          <Input type="select" onChange={this.changeDate}>
                            {dailyDeaths.map((day, index) => {
                              const { dateChecked, deathIncrease } = day || {};
                              return (
                                <option
                                  selected={index === selectedDateIndex}
                                  value={index}>
                                    {`${moment(dateChecked).format('MMM D, YYYY')}: ${numeral(deathIncrease).format('0,0')}`}
                                </option>
                              );
                            })}
                          </Input>
                        </div>
                        <RenderBlocksNoChunk count={dayIncreaseToUse.deathIncrease || 0} />
                      </>
                    ) : null
                }
                {
                  view === 'total'
                    ? (
                      <>
                        <div className="mt-5">
                          {`Total dead: ${numeral(death).format('0,0')}`}
                        </div>
                        <RenderBlocks count={death} />
                      </>
                    ) : null
                }
                {
                  view === 'daily'
                    ? (
                      <>
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
                      </>
                    ) : null
                }
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
  getPopulation: () => dispatch(requestPopulation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
