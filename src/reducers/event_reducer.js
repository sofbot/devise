import { RECEIVE_EVENT } from '../actions/event_actions.js';
import merge from 'lodash/merge';

const defaultState = {
  customId: null,
  imageUrl: null,
  title: null,
  summary: null, // TODO: we need this?
  description: null,
  startTime: null,
  end_time: null
};

const EventsReducer = (state = defaultState, action) => {
  Object.freeze(state);

  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_EVENT:
      newState.customId = action.event.custom_id;
      newState.imageUrl = action.event.image_url;
      newState.title = action.event.title;
      newState.summary = action.event.summary;
      newState.description = action.event.description;
      newState.startTime = action.event.start_time;
      newState.endTime = action.event.end_time;
      return newState;
    default:
      return state;
  }
};
