import types from '../types';
import store from '../store';

const {dispatch} = store;

export const saveMeetPeopleScreenData = (data: any) => {
  dispatch({
    type: types.GET_HOME_SCREEN,
    payload: data,
  });
};

export const isMeetPeopleFilterApplied = (data: any) => {
  dispatch({
    type: types.SET_MEET_FILTERED,
    payload: data,
  });
};
