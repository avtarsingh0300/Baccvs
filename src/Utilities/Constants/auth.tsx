import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ACCEPT_INVITES,
  BLOCKED_LIST,
  CHANGE_PASS,
  CREATE_EVENT,
  DISLIKE_USER_PROFILE,
  EVENT_DETAIL,
  GET_ALL_MEET_GROUPS,
  GET_ALL_USERS,
  GET_EVENT_TYPE,
  GET_FOLLOWER_LIST,
  GET_GROUP_PEOPLE,
  GET_HOME_DATA,
  GET_INVITES,
  GET_MY_EVENT,
  GET_MY_GROUPS,
  GET_MY_TICKETS,
  GET_NOTIFICATION,
  LIKE_USER_PROFILE,
  LOGIN,
  MAP_SEARCH,
  OTP_MATCH,
  OTP_SEND,
  REFUSE_INVITES,
  REGISTER_USER,
  UN_BLOCKED_USER,
  UPDATE_USER_PROFILE,
  USER_DATA,
  USER_DELETE,
} from './Urls';
import {apiGet, apiPost} from './requestHandler';
import {saveUserData} from '../../Redux/Action/auth';

export function login(data: object) {
  return apiPost(LOGIN, data);
}

export function otpSend(data: object) {
  return apiPost(OTP_SEND, data);
}

export function UpdateUserProfile(data: object) {
  return apiPost(UPDATE_USER_PROFILE, data);
}

export function otpMatch(data: object) {
  return apiPost(OTP_MATCH, data);
}

export function likeUser(data: object) {
  return apiPost(LIKE_USER_PROFILE, data);
}

export function disLikeUser(data: object) {
  return apiPost(DISLIKE_USER_PROFILE, data);
}

export function getMapData() {
  return apiPost(MAP_SEARCH);
}
export function changePass(data: object) {
  return apiPost(CHANGE_PASS, data);
}
export function unBlockUser(data: object) {
  return apiPost(UN_BLOCKED_USER, data);
}
export function inviteAccpet(data: object) {
  return apiPost(ACCEPT_INVITES, data);
}
export function inviteRefuse(data: object) {
  return apiPost(REFUSE_INVITES, data);
}
export function userDelete() {
  return apiPost(USER_DELETE);
}
export function createEvent(data: object) {
  return apiPost(CREATE_EVENT, data, {'Content-Type': 'multipart/form-data'});
}
export function getUserProfile() {
  return apiGet(USER_DATA);
}

export function getEventTypes() {
  return apiGet(GET_EVENT_TYPE);
}
export function getFollowerList() {
  return apiGet(GET_FOLLOWER_LIST);
}
export function getNotification() {
  return apiGet(GET_NOTIFICATION);
}

export function getGroupPeople() {
  return apiGet(GET_GROUP_PEOPLE);
}

export function getEventDetail(id: any) {
  return apiGet(`${EVENT_DETAIL}/${id}`);
}
export function getBlockedUser(id: string) {
  return apiGet(`${BLOCKED_LIST}?id=${id}`);
}
export function getMyEvent(status: string) {
  return apiGet(`${GET_MY_EVENT}?filter=${status}`);
}
export function getAllUsers() {
  return apiGet(`${GET_ALL_USERS}`);
}
export function getTickets() {
  return apiGet(GET_MY_TICKETS);
}
export function getAllMeetGroups() {
  return apiGet(`${GET_ALL_MEET_GROUPS}`);
}
export function getMyGroups() {
  return apiGet(GET_MY_GROUPS);
}
export function getInvitesList() {
  return apiGet(GET_INVITES);
}
export function registerUser(data: object) {
  return apiPost(REGISTER_USER, data, {'Content-Type': 'multipart/form-data'});
}
export function getHomedata(
  latitude: number,
  longitude: number,
  selectedOption: string,
) {
  return apiGet(
    `${GET_HOME_DATA}?filter=${selectedOption}&userLatitude=${latitude}&userLongitude=${longitude}&page=1&limit=5`,
  );
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
  try {
    await AsyncStorage.removeItem('userData');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
}

export async function clearAllData() {
  return await AsyncStorage.clear();
}
