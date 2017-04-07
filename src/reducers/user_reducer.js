import { RECEIVE_USER } from '../actions/facebook_actions.js';
import merge from 'lodash/merge';

const defaultState = {
  id: null,
  firstName: null,
  lastName: null,
  email: null,
  imageUrl: null,
  friends: []
};

const UserReducer = (state = defaultState, action) => {
  Object.freeze(state);
  console.log("inside reducer");
  let newState = merge({}, state);

  switch(action.type){
    case RECEIVE_USER:
      console.log("action.user", action.user);
      console.log("type of action.user", typeof action.user);
      console.log("action.user.id", action.user["id"]);

      newState.id = action.user.id;
      newState.firstName = action.user.firstName;
      newState.lastName = action.user.lastName;
      newState.imageUrl = action.user.imageUrl;
      newState.friends = action.user.friends;

      console.log("newState ", newState);
      return newState;
    default:
      return state;
  }
};

export default UserReducer;
