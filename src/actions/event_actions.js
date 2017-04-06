import * as EventUtil from '../utils/events_api_util';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const REMOVE_EVENT = 'REMOVE_EVENT';

export const removeEvent = id => ({
  type: 'REMOVE_EVENT',
  id
});

export const receiveEvents = events => ({
  type: 'RECEIVE_EVENTS',
  events
});

export const fetchEvents = () => dispatch => (
  EventUtil.fetchEvents()
            .then((events => dispatch(receiveEvents(events))),
                  err => console.log(err))
);
