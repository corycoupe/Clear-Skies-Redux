import { SET_ALERT, REMOVE_ALERT } from '../actions/types';
// initial state = alert
const initialState = [];

//example of what's inside the alert state
//{    id: 1,
//msg: 'Please log in',
//alerttype: 'success'}

export default function (state = initialState, action) {
  // destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
}
