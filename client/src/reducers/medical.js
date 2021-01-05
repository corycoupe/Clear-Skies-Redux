import {
  MEDICAL_ERROR,
  GET_MEDICAL,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
} from '../actions/types';

const initialState = {
  medical: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MEDICAL:
    case UPDATE_PROFILE:
      return { ...state, medical: payload, loading: false };
    case MEDICAL_ERROR:
      return { ...state, error: payload, loading: false, medical: null };
    case CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };

    default:
      return state;
  }
}
