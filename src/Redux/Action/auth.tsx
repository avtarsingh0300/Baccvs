import types from '../types';
import store from '../store';

const {dispatch} = store;

export const saveUserData = (data: any) => {
  dispatch({
    type: types.LOGIN,
    payload: data,
  });
};
