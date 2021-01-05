import {
  MEDICAL_ERROR,
  GET_MEDICAL,
  ACCOUNT_DELETED,
  CLEAR_PROFILE,
} from './types';
import { setAlert } from './alert';
import axios from 'axios';
//Get current users profile
export const getCurrentMedical = () => async (dispatch) => {
  try {
    // dont need an id, its going to know which profile to load from the token we send which has the id
    const res = await axios.get('/api/medical/me');

    dispatch({
      type: GET_MEDICAL,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MEDICAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update a Profile
// the history object has a method called push which will redirect you to a client side route
export const createMedical = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/medical', formData, config);
    dispatch({
      type: GET_MEDICAL,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    // Redirects to dashboard if you aren't editing
    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: MEDICAL_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Account and Profile
// Doesn't need an ID, it will grab everything from the token
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can not be undone!')) {
    try {
      await axios.delete(`/api/medical`);
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: ACCOUNT_DELETED,
      });
      dispatch(setAlert('Your account has been permanently deleted', 'danger'));
    } catch (err) {
      dispatch({
        type: MEDICAL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
