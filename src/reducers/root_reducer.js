import React from 'react';
import { combineReducers } from 'redux';
import UserReducer from './user_reducer.js';
import EventsReducer from './events_reducer.js';
import EventReducer from './event_reducer.js';

const RootReducer = combineReducers({
  user: UserReducer,
  fetchedEvents: EventsReducer,
  shownEvent: EventReducer
});

export default RootReducer;
