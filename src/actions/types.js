import { createTypes } from 'reduxsauce';

export default createTypes(`
  KILL_ALL_WORKERS

  API_FAILURE
  API_REQUEST

  API_REQUEST_GET_CURRENT_STATS
  API_RECEIVE_CURRENT_STATS
  API_REQUEST_GET_DAILY_STATS
  API_RECEIVE_DAILY_STATS

`);