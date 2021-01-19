import types from './types';

const requestCurrentStats = () => {
    return {
        endPoint: '/v1/us/current.json',
        ajaxType: 'GET',
        type: types.API_REQUEST_GET_CURRENT_STATS,
        onSuccess: receiveCurrentStats,
        fetchName: 'fetchingCurrentStats'
    };
};

const requestDailyStats = () => {
    return {
        endPoint: '/v1/us/daily.json',
        ajaxType: 'GET',
        type: types.API_REQUEST_GET_DAILY_STATS,
        onSuccess: receiveDailyStats,
        fetchName: 'fetchingDailyStats'
    };  
};

const requestPopulation = () => {
    return {
        endPoint: `/us?_=${Date.now()}`,
        ajaxType: 'GET',
        type: types.POP_API_REQUEST_GET_POPULATION,
        onSuccess: receivePopulation,
        fetchName: 'fetchingPopulation'
    };  
};

const receiveCurrentStats = response => {
    return {
        type: types.API_RECEIVE_CURRENT_STATS,
        response
    };
};

const receiveDailyStats = response => {
    return {
        type: types.API_RECEIVE_DAILY_STATS,
        response
    };
};

const receivePopulation = response => {
    return {
        type: types.POP_API_RECEIVE_GET_POPULATION,
        response
    };
};

export {
    requestCurrentStats,
    requestDailyStats,
    requestPopulation
}
