import {
  ADD_PHARMA,
  PHARMA_ERROR,
  DELETE_PHARMA,
  GET_PHARMA,
} from '../actions/types';

const initialState = {
  pharma: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PHARMA:
      return {
        ...state,
        pharma: payload,
        loading: false,
      };
    case ADD_PHARMA:
      return {
        ...state,
        pharma: [payload, ...state.pharma],
        loading: false,
      };
    case PHARMA_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PHARMA:
      return {
        ...state,
        pharma: state.pharma.filter((pharma) => pharma._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
