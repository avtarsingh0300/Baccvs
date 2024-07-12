const BASE_URL = 'http://13.49.70.247:3002/api/';

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const LOGIN = getApiUrl('loginuser');
export const OTP_SEND = getApiUrl('signupcodesend');
