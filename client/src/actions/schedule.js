import {
  ADD_SCHEDULE,
  SCHEDULE_ERROR,
  DELETE_SCHEDULE,
  GET_SCHEDULE,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';

export const addSchedule = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/api/schedule', formData, config);
    dispatch({
      type: ADD_SCHEDULE,
      payload: res.data,
    });

    dispatch(setAlert('Schedule created', 'success'));
  } catch (err) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const deleteSchedule = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/schedule/${id}`);
    dispatch({
      type: DELETE_SCHEDULE,
      payload: id,
    });
    dispatch(setAlert('Schedule removed', 'danger'));
  } catch (err) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getSchedule = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/schedule/${id}`);
    dispatch({
      type: GET_SCHEDULE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SCHEDULE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
