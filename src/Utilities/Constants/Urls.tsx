export const BASE_URL = 'https://www.baccvs.com/api/';
export const IMAGE_URL = 'https://www.baccvs.com/';

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const LOGIN = getApiUrl('login');
export const OTP_SEND = getApiUrl('send-otp');
export const OTP_MATCH = getApiUrl('verify-otp');
export const USER_DATA = getApiUrl('user-details');
export const REGISTER_USER = getApiUrl('create-user');
export const GET_HOME_DATA = getApiUrl('home-data');
export const GET_MY_EVENT = getApiUrl('my-events');
export const UPDATE_USER_PROFILE = getApiUrl('update-User-Details');
export const GET_FOLLOWER_LIST = getApiUrl('follower-list');
export const GET_EVENT_TYPE = getApiUrl('event-type-list');
export const CREATE_EVENT = getApiUrl('create-event');
export const MAP_SEARCH = getApiUrl('map-search');
export const EVENT_DETAIL = getApiUrl('event');
export const GET_NOTIFICATION = getApiUrl('notification-list');
export const CHANGE_PASS = getApiUrl('change-password');
export const USER_DELETE = getApiUrl('deactivate-account');
export const BLOCKED_LIST = getApiUrl('block-user-list');
export const UN_BLOCKED_USER = getApiUrl('unblock-user');
export const GET_INVITES = getApiUrl('get-invites');
export const ACCEPT_INVITES = getApiUrl('invite-accept');
export const REFUSE_INVITES = getApiUrl('invite-refuse');
export const GET_ALL_USERS = getApiUrl('get-all-users');
export const GET_ALL_MEET_GROUPS = getApiUrl('get-all-meet-groups');
export const LIKE_USER_PROFILE = getApiUrl('like-user');
export const GET_GROUP_PEOPLE = getApiUrl('get-group-people');
export const DISLIKE_USER_PROFILE = getApiUrl('dislike-user');
export const GET_MY_GROUPS = getApiUrl('get-my-meet-groups');
