import types from '../types';
import store from '../store';

const {dispatch} = store;

export const saveUserData = (data: object) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};
