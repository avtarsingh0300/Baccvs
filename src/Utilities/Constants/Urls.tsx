const BASE_URL = 'http://51.20.72.60:3002/api/';

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const LOGIN = getApiUrl('loginuser');
export const OTP_SEND = getApiUrl('signupcodesend');
export const OTP_MATCH = getApiUrl('signupcodematch');
export const USER_DATA = getApiUrl('userdata');
export const REGISTER_USER = getApiUrl('insertuser');
export const GET_HOME_DATA = getApiUrl('home_data');
