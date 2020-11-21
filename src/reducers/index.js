import { combineReducers } from 'redux';

import utilityReducer from './utilityReducer';
import covidReducer from './covidReducer';

const reducers = combineReducers({
    utility: utilityReducer,
    covidData: covidReducer
});

const rootReducer = (state, action) => {
    return reducers(state, action);
};

export default rootReducer;