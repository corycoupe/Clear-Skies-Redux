import {
  GET_THERAPIST,
  GET_THERAPISTS,
  THERAPIST_ERROR,
} from '../actions/types';

const initialState = {
  therapists: [],
  therapist: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_THERAPIST:
      return {
        ...state,
        therapist: payload,
        loading: false,
      };
    case GET_THERAPISTS:
      return {
        ...state,
        therapists: payload,
        loading: false,
      };
    case THERAPIST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
