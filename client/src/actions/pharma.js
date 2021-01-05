import { ADD_PHARMA, PHARMA_ERROR, DELETE_PHARMA, GET_PHARMA } from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const addPharma = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/pharma', formData, config);
    dispatch({
      type: ADD_PHARMA,
      payload: res.data,
    });

    dispatch(setAlert('Pharma dosage recorded', 'danger'));
  } catch (err) {
    console.error(err.message);
    console.log(err);
    dispatch({
      type: PHARMA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deletePharma = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/pharma/${id}`);
    dispatch({
      type: DELETE_PHARMA,
      payload: id,
    });
    dispatch(setAlert('Dosage removed', 'danger'));
  } catch (err) {
    console.error(err.message);
    console.log(err);
    dispatch({
      type: PHARMA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getPharma = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/pharma/${id}`);
    dispatch({
      type: GET_PHARMA,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PHARMA_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
