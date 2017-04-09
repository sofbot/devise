import * as UserAPI from '../utils/user_api_utils.js';

export const ADD_TO_TIMELINE = 'ADD_TO_TIMELINE';
export const RECEIVE_TIMELINE = 'RECEIVE_TIMELINE';

export const addToTimeline = likedEvent => ({
  type: ADD_TO_TIMELINE,
  likedEvent
});

export const receiveTimeline = timeline => ({
  type: RECEIVE_TIMELINE,
  timeline
});

export const fetchTimeline = userId => dispatch => (
  UserAPI.fetchTimeline(userId)
    .then(response => response.json())
    .then(timeline => dispatch(receiveTimeline(timeline)))
    .catch(errors => console.log("errors = ", errors))
);
