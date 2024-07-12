import AsyncStorage from '@react-native-async-storage/async-storage';
import {LOGIN, OTP_SEND} from './Urls';
import {apiGet, apiPost} from './requestHandler';
import {saveUserData} from '../../Redux/Action/auth';

// export function SignUp(data: object) {
//   return apiPost(SIGNUP, data);
// }

export function login(data: object) {
  return apiPost(LOGIN, data);
}

export function otpSend(data: object) {
  return apiPost(OTP_SEND, data);
}

export const setDataHandler = async (data: any) => {
  try {
    await AsyncStorage.setItem('userData', JSON.stringify(data));
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
