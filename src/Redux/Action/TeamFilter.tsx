import types from '../types';
import store from '../store';

const {dispatch} = store;

export const TeamFilter = (data: any) => {
  dispatch({
    type: types.TEAM_FILTER,
    payload: data,
  });
};
