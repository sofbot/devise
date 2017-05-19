import { RECEIVE_EVENTS } from '../actions/event_actions';

const LoadReducer = (state = false, action) => {
  Object.freeze(state);
  if (action.type == RECEIVE_EVENTS) {
     return true;
   } else {
     return state;
   } end
};

export default LoadReducer;
