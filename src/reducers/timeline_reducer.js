import {
  ADD_TO_TIMELINE, RECEIVE_TIMELINE
} from '../actions/timeline_actions';

const _defaultState = [
  {
    title: null,
    venue: null,
    friends: [], // friends also going
    time: null,
    description: null,
    imageUrl: null
  }

];

const TimelineReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case RECEIVE_TIMELINE:
      if (action.timeline.length === 0) {
        newState = _defaultState;
        return newState;
      } else {
        newState = action.timeline;
        return newState;
      }
    case ADD_TO_TIMELINE:
      if (newState[0].title === null) {
        // replace entire slice with action.events on first load
        return [action.likedEvent];
      } else {
        return newState.concat(action.likedEvent);
      }
    default:
      return state;
  }
};

export default TimelineReducer;
