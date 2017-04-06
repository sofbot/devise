import { RECEIVE_EVENTS } from '../actions/event_actions.js';
import merge from 'lodash/merge';

const defaultState = [];

const EventsReducer = (state = defaultState, action) => {
  Object.freeze(state);

  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_EVENTS:
      newState = action.fetchEvents;
      return newState;
    default:
      return state;
  }
};
