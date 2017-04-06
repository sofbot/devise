import React from 'react';
import { combineReducers } from 'redux';
import UserReducer from './user_reducer.js';
import EventsReducer from './events_reducer.js';
import SwipeEventsReducer from './swipe_events_reducer.js';
import TimelineReducer from './timeline_reducer.js';

const RootReducer = combineReducers({
  user: UserReducer,
  fetchedEvents: EventsReducer,
  swipeEvents: SwipeEventsReducer,
  timelineEvents: TimelineReducer
});

export default RootReducer;
