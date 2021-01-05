import { GET_THERAPIST, GET_THERAPISTS, THERAPIST_ERROR } from './types';
import axios from 'axios';

// Get Therapist by ID
export const getTherapist = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/therapist/${id}`);
    dispatch({
      type: GET_THERAPIST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: THERAPIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Therapists
export const getTherapists = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/therapist');
    dispatch({
      type: GET_THERAPISTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: THERAPIST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
