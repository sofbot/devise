import * as FacebookAPI from '../utils/facebook_api_utils.js';

// Action type constants
export const RECEIVE_USER = 'RECEIVE_USER';

// Actions
const receiveUser = user => ({
  type: RECEIVE_USER,
  user
});

// Action creators
export const fetchUserFBInfo = user => dispatch => {
   dispatch(receiveUser(user));
  // .then(user => dispatch(FacebookAPI.sendUserInfo(user,token)))
  // .fail(errors => dispatch(console.log("dispatch errors ", errors)))
};
