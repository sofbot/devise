import * as EventUtil from '../utils/event_api_utils';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const REMOVE_EVENT = 'REMOVE_EVENT';

export const removeEvent = () => ({
  type: 'REMOVE_EVENT'
});

export const receiveEvents = events => ({
  type: 'RECEIVE_EVENTS',
  events
});

export const fetchEvents = () => dispatch => (
  EventUtil.fetchEvents()
  .then(rawEvents => rawEvents.json())
  .then(events => dispatch(receiveEvents(events)))
  .catch(err => console.log(err))
);
