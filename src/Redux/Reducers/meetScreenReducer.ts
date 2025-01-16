import types from '../types';

const initial_state = {
  teamsDate: {},
  users: {},
  isFlterApplied: 0,
  internetConnection: false,
};

export default function (state = initial_state, action: any) {
  switch (action.type) {
    case types.SET_MEET_FILTERED: {
      const data = action.payload;
      return {isFlterApplied: data};
    }
    case types.NO_INTERNET: {
      const internetConnection = action.payload.internetConnection;
      return {...state, internetConnection};
    }

    default: {
      return {...state};
    }
  }
}
