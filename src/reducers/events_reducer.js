import {
  RECEIVE_EVENTS,
  SHIFT_EVENT
} from '../actions/event_actions';

const _defaultState = [
  {
    title: 'Loading Events...',
    image: require('../../images/loading.gif'),
    venue: '',
    friends: 100, // number of friends also going
    time: '',
    description: '', // don't need description until eventDetail
  }
];

const EventsReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case RECEIVE_EVENTS:
      if (newState[0] === _defaultState[0]) {
        // replace entire slice with action.events on first load
        return action.events;
      } else {
        return newState.concat(action.events);
      }
    case SHIFT_EVENT:
      newState.shift(); // take it from the top
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
