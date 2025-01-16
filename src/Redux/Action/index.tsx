import * as auth from './auth';
import * as homeScreenData from './homScreenActions';
import * as meetScreenData from './meetPeopleActions';

export default {
  ...auth,
  ...homeScreenData,
  ...meetScreenData,
};
