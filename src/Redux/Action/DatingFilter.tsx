import types from '../types';
import store from '../store';

const {dispatch} = store;

export const DatingFilter = (data: any) => {
  dispatch({
    type: types.DATING_FILTER,
    payload: data,
  });
};
