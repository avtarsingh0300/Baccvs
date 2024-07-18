import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  GET_HOME_DATA,
  LOGIN,
  OTP_MATCH,
  OTP_SEND,
  REGISTER_USER,
  USER_DATA,
} from './Urls';
import {apiGet, apiPost} from './requestHandler';
import {saveUserData} from '../../Redux/Action/auth';

export function login(data: object) {
  return apiPost(LOGIN, data);
}

export function otpSend(data: object) {
  return apiPost(OTP_SEND, data);
}

export function otpMatch(data: object) {
  return apiPost(OTP_MATCH, data);
}

export function getUserProfile() {
  return apiGet(USER_DATA);
}
export function registerUser(data: object) {
  return apiPost(REGISTER_USER, data, {'Content-Type': 'multipart/form-data'});
}
export function getHomedata(latitude: number, longitude: number) {
  return apiGet(
    `${GET_HOME_DATA}?filter=upcoming&userLatitude=${latitude}&userLongitude=${longitude}`,
  );
}

export const setDataHandler = async (data: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
    saveUserData(data);
  } catch {
    console.log('Something went wrong!');
  }
};

export const getUserData = async () => {
  await AsyncStorage.getItem('userData')
    .then((res: any) => {
      saveUserData(JSON.parse(res));
    })
    .catch(err => {
      console.log(err, 'err');
    });
};

export async function clearUserData() {
  return AsyncStorage.removeItem('userData');
}

export async function clearAllData() {
  return await AsyncStorage.clear();
}
