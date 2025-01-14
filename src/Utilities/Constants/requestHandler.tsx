import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {clearUserData} from './auth';
import types from '../../Redux/types';
import store from '../../Redux/store';

interface UserData {
  token: string;
  access_token: string;
}
export async function getHeaders() {
  try {
    let userData = await AsyncStorage.getItem('userData');
    if (userData) {
      const parsedUserData: UserData = JSON.parse(userData);
      return {
        Authorization: `Bearer ${parsedUserData?.token}`,
      };
    }
    return {};
  } catch (error) {
    console.log('Error getting user data from AsyncStorage:', error);
    return {};
  }
}

export function apiReq(
  endPoint: string,
  recieve_data: any,
  method: string,
  customHeaders: any,
) {
  return new Promise(async (res, rej) => {
    const defaultHeader = await getHeaders();

    const headers = {
      ...defaultHeader,
      ...customHeaders,
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'multipart/form-data',
    };

    if (method === 'get') {
      recieve_data = {
        ...recieve_data,
        headers,
      };
    }
    // console.log(recieve_data, 'recieve_data');

    await axios[method](endPoint, recieve_data, {headers})
      .then((result: any) => {
        const {data} = result;
        data.status = result.status;
        if (data.status === false) {
          rej(data);
        }
        res(data);
      })
      .catch(async (error: any) => {
        console.log(error, 'error in request handler');
        if (
          (error && error?.response && error?.response?.status === 401) ||
          (error && error?.response && error?.response?.status === 403) ||
          error?.response?.data?.message == 'Unauthenticated'
        ) {
          const {dispatch} = store;
          dispatch({
            type: types?.CLEAR_REDUX_STATE,
            payload: {},
          });
          clearUserData();
          // clearUserData();
        }
        if (error && error?.response && error?.response?.data) {
          if (!error?.response?.data?.message) {
            rej({
              ...error?.response?.data,
              msg: error?.response?.data?.message || 'Network Error',
            });
          }
          rej(error?.response?.data);
        } else {
          rej({message: 'Network Error', msg: 'Network Error'});
        }
      });
  });
}

export async function apiGet(
  endPoint: string,
  data?: object,
  headers?: object,
) {
  console.log(endPoint, ':endPoint');
  var result = await apiReq(endPoint, data, 'get', headers);
  if (result === true) {
    return await apiReq(endPoint, data, 'get', headers);
  } else {
    return result;
  }
}

export async function apiPost(
  endPoint: string,
  data?: object,
  headers?: object,
) {
  console.log(endPoint, ':endPoint');
  var result = await apiReq(endPoint, data, 'post', headers);
  if (result === true) {
    return await apiReq(endPoint, data, 'post', headers);
  } else {
    return result;
  }
}
