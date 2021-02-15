import React from 'react';
import { UncontrolledCarousel } from 'reactstrap';
import moment from 'moment';
import numeral from 'numeral';
import './slider.scss';
const Slider = props => {
    const {
        death,
        per1000PeopleDeaths,
        last7DayTotalDeaths,
        per10000PeopleDeaths
    } = props;
    
    const items = [
        {
            key: '1',
            header: <p>Since the pandemic began we have endured the equivalent of: <strong>{Math.floor(death / 2977)}</strong> 9/11's.</p>
        },
        {
            key: '2',
            header: <p>Since the pandemic began roughly: <strong>{Math.floor(death / 10000)}</strong> D-days's.</p>
        },
        {
            key: '3',
            header: <p>Averaging: <strong>{numeral(Math.floor(death / moment().diff(moment('2/26/20'), 'days'))).format('0,0')}</strong> per day since the first US deaths ({moment('2/26/20').format('MMM D, YYYY')}).</p>
        },
        {
            key: '4',
            header: <p>Averaging: <strong>{numeral(Math.floor(last7DayTotalDeaths / 7)).format('0,0')}</strong> in the last <strong>7</strong> days.</p>
        },
        {
            key: '5',
            header: <p><strong>{numeral(per10000PeopleDeaths).format('0,0')}</strong> out of every <strong>10,000</strong> people in the US have died.</p>
        },
        {
            key: '6',
            header: <p><strong>{numeral(per1000PeopleDeaths).format('0,0')}</strong> out of every <strong>1,000</strong> people in the US have died.</p>
        }
    ];

    return (
        <UncontrolledCarousel items={items} />
    );
};

export default Slider;