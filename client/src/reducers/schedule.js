import {
  ADD_SCHEDULE,
  SCHEDULE_ERROR,
  DELETE_SCHEDULE,
  GET_SCHEDULE,
} from '../actions/types';

const initialState = {
  schedule: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_SCHEDULE:
      return {
        ...state,
        schedule: payload,
        loading: false,
      };
    case ADD_SCHEDULE:
      return {
        ...state,
        schedule: [payload, ...state.schedule],
        loading: false,
      };
    case SCHEDULE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_SCHEDULE:
      return {
        ...state,
        schedule: state.schedule.filter((schedule) => schedule._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
