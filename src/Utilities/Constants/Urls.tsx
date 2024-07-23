const BASE_URL = 'http://13.51.167.189:3002/api/';
const IMAGE_URL = 'http://51.20.72.60:3002/';

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const LOGIN = getApiUrl('login');
export const OTP_SEND = getApiUrl('send-otp');
export const OTP_MATCH = getApiUrl('verify-otp');
export const USER_DATA = getApiUrl('user-details');
export const REGISTER_USER = getApiUrl('create-user');
export const GET_HOME_DATA = getApiUrl('home-data');
export const GET_MY_EVENT = getApiUrl('myevents');
export const UPDATE_USER_PROFILE = getApiUrl('updateUserDetails');

export const GET_EVENT_TYPE = getApiUrl('getevent');

export const MAP_SEARCH = getApiUrl('mapsearch');
