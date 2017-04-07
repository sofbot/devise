import * as EventUtil from '../utils/events_api_util';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const REMOVE_EVENT = 'REMOVE_EVENT';
export const SHIFT_EVENT = 'SHIFT_EVENT';
export const ADD_SWIPE_EVENT = 'ADD_SWIPE_EVENT';
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

export const addSwipeEvent = nextEvent => ({
  type: 'ADD_SWIPE_EVENT',
  nextEvent
});

export const addEvents = events => ({
  type: 'ADD_EVENTS',
  events
});

export const fetchEvents = () => dispatch => {
  return (
  EventUtil.fetchEvents()
    .then(events => events.json())
    .then(jsonEvents => {
      const topTwo = jsonEvents.splice(0, 2);
      dispatch(addEvents(topTwo));
      return jsonEvents;
    })
    .then(remainingEvents => dispatch(receiveEvents(remainingEvents)))
    .catch(err => console.log(err))
  );
};
