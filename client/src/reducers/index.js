import { combineReducers } from 'redux';
import auth from './auth';
import alert from './alert';
import medical from './medical';
import schedule from './schedule';
import pharma from './pharma';
import therapist from './therapist';
// reducers put within combineReducers, form of destructuring
export default combineReducers({
  alert,
  auth,
  medical,
  schedule,
  pharma,
  therapist,
});
