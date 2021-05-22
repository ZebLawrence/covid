import types from '../actions/types';
import { createReducer } from 'reduxsauce';
import current from './current.json';
import daily from './daily.json';

export const INITIAL_STATE = {
    fetchingCurrentStats: false,
    fetchingDailyStats: false,
    dailyStats: daily,
    currentStats: current[0],
    population: {}
};

const requestCurrentStats = (state, action) => {
    return Object.assign({}, state, {
        //fetchingCurrentStats: true
    });
};

const receiveCurrentStats = (state, action) => {
    return Object.assign({}, state, {
        // fetchingCurrentStats: false,
        // currentStats: action.response && action.response.length && action.response[0]
        //     ? action.response[0]
        //     : {}
    });  
};

const requestDailyStats = (state, action) => {
    return Object.assign({}, state, {
        //fetchingDailyStats: true
    });
};

const receiveDailyStats = (state, action) => {
    return Object.assign({}, state, {
        // fetchingDailyStats: false,
        // dailyStats: action.response
    });  
};

const requestPopulation = (state, action) => {
    return Object.assign({}, state, {
        fetchingPopulation: true
    });
};

const receivePopulation = (state, action) => {
    return Object.assign({}, state, {
        fetchingPopulation: false,
        population: action.response
    });  
};

const ACTION_HANDLERS = {
    [types.API_REQUEST_GET_CURRENT_STATS]: requestCurrentStats,
    [types.API_RECEIVE_CURRENT_STATS]: receiveCurrentStats,
    [types.API_REQUEST_GET_DAILY_STATS]: requestDailyStats,
    [types.API_RECEIVE_DAILY_STATS]: receiveDailyStats,
    [types.POP_API_REQUEST_GET_POPULATION]: requestPopulation,
    [types.POP_API_RECEIVE_GET_POPULATION]: receivePopulation
};

export default createReducer(INITIAL_STATE, ACTION_HANDLERS);