import types from '../types';
const initial_state = {
  data: [],
};

export default function (state = initial_state, action: any) {
  switch (action?.type) {
    case types?.TEAM_FILTER: {
      const data = action?.payload;
      return {data: [...data]};
    }
  }
  return {...state};
}
