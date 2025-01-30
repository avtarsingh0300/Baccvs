import types from '../types';

const initial_state = {
  eventData: {},
  isFlterApplied: false,
  internetConnection: false,
};

export default function (state = initial_state, action: any) {
  switch (action.type) {
    case types.GET_HOME_SCREEN: {
      const data = action.payload;
      return {eventData: data};
    }

    case types.SET_HOME_FILTERED: {
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
