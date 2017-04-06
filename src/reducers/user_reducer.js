import { RECEIVE_USER } from '../actions/facebook_actions.js';
import merge from 'lodash/merge';


const defaultState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  photo: null,
  friends: []
};

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);

  let newState = merge({}, state);

  switch(action.type) {
    case RECEIVE_USER:
      newState.id = action.user.id;
      newState.firstName = action.user.first_name;
      newState.lastName = action.user.last_name;
      newState.photo = action.user.picture.data.url;
      newState.friends = action.user.friends.data;
      return newState;
    default:
      return state;
  }
};
