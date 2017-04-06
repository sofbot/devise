import * as EventUtil from '../utils/events_api_util';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SHIFT_EVENT = 'SHIFT_EVENT';
export const ADD_EVENT = 'ADD_EVENT';
export const ADD_EVENTS = 'ADD_EVENTS';

export const removeEvent = () => ({
  type: 'REMOVE_EVENT'
});

export const shiftEventFromAll = () => ({
  type: 'SHIFT_EVENT'
});

export const receiveEvents = events => ({
  type: 'RECEIVE_EVENTS',
  events
});

export const addEventToSwipe = nextEvent => ({
  type: 'ADD_EVENT',
  nextEvent
});

export const addEvents = events => ({
  type: 'ADD_EVENTS',
  events
});

export const fetchEvents = () => dispatch => (
  EventUtil.fetchEvents()
    .then((events => {
      const topTwo = events.splice(0, 2);
      dispatch(addEvents(topTwo));
      dispatch(receiveEvents(events));
    }, err => console.log(err)))
);
