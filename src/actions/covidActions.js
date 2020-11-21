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

export {
    requestCurrentStats,
    requestDailyStats
}
