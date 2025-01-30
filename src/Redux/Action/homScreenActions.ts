import types from '../types';
import store from '../store';

const {dispatch} = store;

export const saveHomeScreenData = (data: any) => {
  dispatch({
    type: types.GET_HOME_SCREEN,
    payload: data,
  });
};

export const isHomeFilterApplied = (data: any) => {
  dispatch({
    type: types.SET_HOME_FILTERED,
    payload: data,
  });
};
