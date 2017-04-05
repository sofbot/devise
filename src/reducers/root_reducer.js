import React from 'react';
import { combineReducers } from 'redux';
import UserReducer from './user_reducer.js';

const RootReducer = combineReducers({
  user: UserReducer
});

export default RootReducer;
