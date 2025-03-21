import AsyncStorage from '@react-native-async-storage/async-storage';
import AWS from 'aws-sdk';

import {
  ACCEPT_INVITES,
  ADD_PAYMENT_METHODS,
  BLOCKED_LIST,
  BLOCK_USER,
  BUY_TICKET,
  CANCEL_INVITES,
  CANCEL_SELL_TICKET,
  CHANGE_FORGOT_PASSWORD,
  CHANGE_PASS,
  CREATE_COMMENT,
  CREATE_EVENT,
  CREATE_MEET_GROUP,
  CREATE_REF_CODE,
  DELETE_COMMENT,
  DISLIKE_USER_PROFILE,
  DIS_LIKE_TEAM,
  EDIT_COMMENT,
  EVENT_DETAIL,
  EVENT_SEARCH,
  FOLLOW_USER,
  FORGOT_PASSWORD,
  GET_ALL_MEET_GROUPS,
  GET_ALL_USERS,
  GET_BUYTICKET_LIST,
  GET_CHAT_HISTORY,
  GET_DELETE_EVENT,
  GET_EVENT_TYPE,
  GET_FOLLOWER_LIST,
  GET_GROUP_PEOPLE,
  GET_HOME_DATA,
  GET_INVITES,
  GET_LIKES_FOR_USER,
  GET_MEDIA_DETAILS,
  GET_MY_EVENT,
  GET_MY_GROUPS,
  GET_MY_TICKETS,
  GET_NOTIFICATION,
  GET_REF_CODE,
  GET_SELL_TICKETS,
  GET_USER_FOLLOWER_LIST,
  GET_USER_FOLLOWING_LIST,
  GET_USER_LAST_CHAT,
  GET_USER_LAST_SEEN,
  GET_USER_LIKES,
  GROUP_DETAILS,
  LIKE_EVENT,
  LIKE_MEDIA,
  LIKE_TEAM,
  LIKE_USER_PROFILE,
  LOGIN,
  MAP_SEARCH,
  MEMBER_DETAILS,
  MUSIC_LIST,
  OTP_MATCH,
  OTP_SEND,
  PAYMENT_METHOD_LIST,
  PROFILE_STATUS,
  REFUSE_INVITES,
  REGISTER_USER,
  REPORT_USER,
  SELL_TICKET,
  SEND_FEEDBACK,
  SEND_USER_STATUS,
  SOLO_FILTER_DATA,
  TEAM_FILTER_DATA,
  UN_BLOCKED_USER,
  UN_FOLLOW_USER,
  UPDATE_ACCOUNT_DETAILS,
  UPDATE_READ_STATUS,
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
  return apiPost(UPDATE_USER_PROFILE, data, {
    'Content-Type': 'multipart/form-data',
  });
}

export function otpMatch(data: object) {
  return apiPost(OTP_MATCH, data);
}

export function likeUser(data: object) {
  return apiPost(LIKE_USER_PROFILE, data);
}

export function likeTeam(data: object) {
  return apiPost(LIKE_TEAM, data);
}

export function disLikeTeam(data: object) {
  return apiPost(DIS_LIKE_TEAM, data);
}

export function disLikeUser(data: object) {
  return apiPost(DISLIKE_USER_PROFILE, data);
}

export function teamsDetails(data: object) {
  return apiPost(GROUP_DETAILS, data);
}

export function getMapData() {
  return apiPost(MAP_SEARCH);
}

export function getSearchData(data: object) {
  return apiPost(EVENT_SEARCH, data);
}

export function changePass(data: object) {
  return apiPost(CHANGE_PASS, data);
}

export function forgotPassword(data: object) {
  return apiPost(FORGOT_PASSWORD, data);
}

export function changeForgotPassword(data: object) {
  return apiPost(CHANGE_FORGOT_PASSWORD, data);
}

export function unBlockUser(data: object) {
  return apiPost(UN_BLOCKED_USER, data);
}

export function blockUser(data: object) {
  return apiPost(BLOCK_USER, data);
}

export function reportUser(data: object) {
  return apiPost(REPORT_USER, data);
}

export function sellTicket(data: object) {
  return apiPost(SELL_TICKET, data);
}

export function inviteAccpet(data: object) {
  return apiPost(ACCEPT_INVITES, data);
}

export function inviteRefuse(data: object) {
  return apiPost(REFUSE_INVITES, data);
}

export function cancelInvites(data: object) {
  return apiPost(CANCEL_INVITES, data);
}

export function soloFilterData(data: object) {
  return apiPost(SOLO_FILTER_DATA, data);
}

export function teamFilterData(data: object) {
  return apiPost(TEAM_FILTER_DATA, data);
}

export function userDelete() {
  return apiPost(USER_DELETE);
}

export function createEvent(data: object) {
  return apiPost(CREATE_EVENT, data, {'Content-Type': 'multipart/form-data'});
}
export function createMeetGroup(data: object) {
  return apiPost(CREATE_MEET_GROUP, data, {
    'Content-Type': 'multipart/form-data',
  });
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

export function getMusicTypeList() {
  return apiGet(MUSIC_LIST);
}
export function getRefCode() {
  return apiGet(GET_REF_CODE);
}

export function createRefCode() {
  return apiPost(CREATE_REF_CODE);
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
  return apiGet(`${GET_ALL_USERS}?page=1&limit=100`);
}

export function getUserLikes() {
  return apiGet(`${GET_USER_LIKES}`);
}

export function getUserFollowing() {
  return apiGet(`${GET_USER_FOLLOWING_LIST}`);
}

export function getUserFollower() {
  return apiGet(`${GET_USER_FOLLOWER_LIST}`);
}

export function getUserLastChats(text?: string) {
  return apiGet(`${GET_USER_LAST_CHAT}${text}`);
}

export function getUserForLike() {
  return apiGet(`${GET_LIKES_FOR_USER}`);
}

export function getMemberDetails(data: object) {
  return apiPost(`${MEMBER_DETAILS}`, data);
}

export function getTickets() {
  return apiGet(GET_MY_TICKETS);
}

export function getBuyTicketList() {
  return apiGet(GET_BUYTICKET_LIST);
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

export function getSellTickets() {
  return apiGet(GET_SELL_TICKETS);
}

export function cancelSellTicket(data: object) {
  return apiPost(CANCEL_SELL_TICKET, data);
}

export function buyTicket(data: object) {
  return apiPost(BUY_TICKET, data);
}

export function followUser(data: object) {
  return apiPost(FOLLOW_USER, data);
}

export function unFollowUser(data: object) {
  return apiPost(UN_FOLLOW_USER, data);
}

export function getUserProfileStatus() {
  return apiPost(PROFILE_STATUS);
}

export function updateUserAccountDetails(data: object) {
  return apiPost(UPDATE_ACCOUNT_DETAILS, data);
}

export function registerUser(data: object) {
  return apiPost(REGISTER_USER, data, {'Content-Type': 'multipart/form-data'});
}

export function createCommets(data: object) {
  return apiPost(CREATE_COMMENT, data);
}

export function likeEvents(data: object) {
  return apiPost(LIKE_EVENT, data);
}

export function deleteComment(iD: String) {
  return apiPost(`${DELETE_COMMENT}?id=${iD}`);
}

export function editComment(data: object) {
  return apiPost(EDIT_COMMENT, data);
}

export function addPaymentMethods(data: object) {
  return apiPost(ADD_PAYMENT_METHODS, data);
}

export function sendUserStatus(data: object) {
  return apiPost(SEND_USER_STATUS, data);
}

export function likeUserPhoto(data: object) {
  return apiPost(LIKE_MEDIA, data);
}

export function sendfeedBank(data: object) {
  return apiPost(SEND_FEEDBACK, data, {'Content-Type': 'multipart/form-data'});
}

export function deleteEvent(id: String) {
  return apiGet(`${GET_DELETE_EVENT}?id=${id}`);
}

export function chatHistory(id: String) {
  return apiGet(`${GET_CHAT_HISTORY}/${id}`);
}

export function allCardDetails() {
  return apiGet(PAYMENT_METHOD_LIST);
}

export function getUserLastSeen(id: String) {
  return apiGet(`${GET_USER_LAST_SEEN}${id}`);
}

export function getUserMediaDetails(data: object) {
  return apiGet(GET_MEDIA_DETAILS, data);
}

export function readMessageHandler(id: String) {
  return apiPost(`${UPDATE_READ_STATUS}${id}`);
}

export function getHomedata(
  latitude: number,
  longitude: number,
  selectedOption: string,
) {
  return apiGet(
    `${GET_HOME_DATA}?filter=${selectedOption}&userLatitude=${latitude}&userLongitude=${longitude}&page=1&limit=50`,
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

const createS3Client = () => {
  return new AWS.S3({
    region: 'eu-north-1',
    accessKeyId: 'AKIAZI2LDPUK6XIDJRHU',
    secretAccessKey: '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',
  });
};

export const generateSignedUrlToUploadOn = async (
  roomid: string,
  image: any,
) => {
  const s3 = createS3Client();
  const uploadParams = {
    Bucket: 'baccvsbucket',
    Key:
      image?.mime === 'video/mp4'
        ? `attachment/${roomid}/video_${image?.modificationDate}.mp4`
        : `attachment/${roomid}/image_${image?.modificationDate}.jpg`,
    ContentType: image?.mime,
  };

  try {
    const signedUrl = s3.getSignedUrl('putObject', uploadParams);
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL:', error);
    throw error;
  }
};
