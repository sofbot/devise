import * as EventAPI from '../utils/event_api_utils.js';

// Action type constants
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const RECEIVE_EVENT = 'RECEIVE_EVENT';

// Actions
const receiveEvents = events => ({
  type: RECEIVE_EVENTS,
  events
});

const receiveEvent = event => ({
  type: RECEIVE_EVENT,
  event
});

// Action creators

export const fetchEvents = (userId) => dispatch => (
  EventAPI.fetchEvents(userId)
  .then(events => dispatch(receiveEvents(events)))
  .fail(errors => dispatch(console.log(errors)))
);
