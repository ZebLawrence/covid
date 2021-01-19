import { fork } from 'redux-saga/effects';
import buildDataSaga from './buildDataSaga';
import buildPopDataSaga from './buildPopDataSaga';
import apiService from '../services/apiService';

const rootSaga = () => {
    const covidApi = apiService.create('https://api.covidtracking.com');
    const populationApi = apiService.create('https://www.census.gov/popclock/data/population.php');
    function* root() {
        yield fork(buildDataSaga(covidApi).watcher);
        yield fork(buildPopDataSaga(populationApi).watcher);
    }

    return root;
};

export default rootSaga;