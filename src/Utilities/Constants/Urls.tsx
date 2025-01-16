export const BASE_URL = 'https://www.baccvs.com/api/';
export const IMAGE_URL = 'https://www.baccvs.com/';
export const AWS_S3_FILE_URL =
  'https://baccvsbucket.s3.eu-north-1.amazonaws.com/';

export const getApiUrl = (endpoint: string) => `${BASE_URL}${endpoint}`;

export const LOGIN = getApiUrl('login');
export const OTP_SEND = getApiUrl('send-otp');
export const OTP_MATCH = getApiUrl('verify-otp');
export const USER_DATA = getApiUrl('user-details');
export const REGISTER_USER = getApiUrl('create-user');
export const GET_HOME_DATA = getApiUrl('home-data');
export const GET_HOME_FILTER_DATA = getApiUrl('home-data-filter');
export const GET_MY_EVENT = getApiUrl('my-events');
export const UPDATE_USER_PROFILE = getApiUrl('update-User-Details');
export const GET_FOLLOWER_LIST = getApiUrl('follower-list');
export const GET_EVENT_TYPE = getApiUrl('event-type-list');
export const CREATE_EVENT = getApiUrl('create-event');
export const CREATE_MEET_GROUP = getApiUrl('create-meet-group');
export const MAP_SEARCH = getApiUrl('map-search');
export const EVENT_SEARCH = getApiUrl('event-search');
export const EVENT_DETAIL = getApiUrl('event');
export const GET_NOTIFICATION = getApiUrl('notification-list');
export const CHANGE_PASS = getApiUrl('change-password');
export const FORGOT_PASSWORD = getApiUrl('forgot-password');
export const CHANGE_FORGOT_PASSWORD = getApiUrl('fpassword-change');
export const USER_DELETE = getApiUrl('deactivate-account');
export const BLOCKED_LIST = getApiUrl('block-user-list');
export const UN_BLOCKED_USER = getApiUrl('unblock-user');
export const GET_INVITES = getApiUrl('get-invites');
export const ACCEPT_INVITES = getApiUrl('invite-accept');
export const REFUSE_INVITES = getApiUrl('invite-refuse');
export const GET_ALL_USERS = getApiUrl('get-all-users');
export const GET_USER_LIKES = getApiUrl('get-user-Likes');
export const GET_USER_FOLLOWING_LIST = getApiUrl('following-list');
export const GET_USER_FOLLOWER_LIST = getApiUrl('follower-list');
export const GET_USER_LAST_CHAT = getApiUrl('all_user_chats');
export const GET_LIKES_FOR_USER = getApiUrl('get-likes-for-user');
export const MEMBER_DETAILS = getApiUrl('members-details');
export const GET_ALL_MEET_GROUPS = getApiUrl('get-all-meet-groups');
export const LIKE_USER_PROFILE = getApiUrl('like-user');
export const LIKE_TEAM = getApiUrl('like-group');
export const DIS_LIKE_TEAM = getApiUrl('dislike-group');
export const GET_GROUP_PEOPLE = getApiUrl('get-group-people');
export const MUSIC_LIST = getApiUrl('music-list');
export const DISLIKE_USER_PROFILE = getApiUrl('dislike-user');
export const GROUP_DETAILS = getApiUrl('get-meet-group-details');
export const GET_MY_GROUPS = getApiUrl('get-my-meet-groups');
export const GET_MY_TICKETS = getApiUrl('my-tickets');
export const CREATE_REF_CODE = getApiUrl('referral-code');
export const GET_REF_CODE = getApiUrl('fetch-referral-codes');
export const GET_BUYTICKET_LIST = getApiUrl('sell-tickets');
export const SELL_TICKET = getApiUrl('sell-ticket');
export const GET_SELL_TICKETS = getApiUrl('sell-tickets-data');
export const CANCEL_SELL_TICKET = getApiUrl('cancel-ticket');
export const BUY_TICKET = getApiUrl('buy-ticket');
export const CANCEL_INVITES = getApiUrl('cancel-invite');
export const SOLO_FILTER_DATA = getApiUrl('people-data-filter?page=1&limit=5');
export const TEAM_FILTER_DATA = getApiUrl('team-filter?page=1&limit=5');
export const FOLLOW_USER = getApiUrl('follow-user');
export const UN_FOLLOW_USER = getApiUrl('unfollow-user');
export const PROFILE_STATUS = getApiUrl('profile-status');
export const UPDATE_ACCOUNT_DETAILS = getApiUrl('update-account-Details');
export const BLOCK_USER = getApiUrl('block-user');
export const REPORT_USER = getApiUrl('report-user');
export const CREATE_COMMENT = getApiUrl('create-comment');
export const LIKE_EVENT = getApiUrl('like-event');
export const DELETE_COMMENT = getApiUrl('delete-comment');
export const EDIT_COMMENT = getApiUrl('edit-comment');
export const ADD_PAYMENT_METHODS = getApiUrl('add-payment-methods');
export const SEND_USER_STATUS = getApiUrl('active-status');
export const LIKE_MEDIA = getApiUrl('like-media');
export const SEND_FEEDBACK = getApiUrl('send-feedback');
export const GET_DELETE_EVENT = getApiUrl('delete-event');
export const GET_CHAT_HISTORY = getApiUrl('chat-history');
export const PAYMENT_METHOD_LIST = getApiUrl('payment-method-list');
export const GET_USER_LAST_SEEN = getApiUrl('get-last-seen/');
export const GET_MEDIA_DETAILS = getApiUrl('get-media-details');
export const UPDATE_READ_STATUS = getApiUrl('update-read-status/');
