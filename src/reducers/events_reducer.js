import {
  RECEIVE_EVENTS,
  SHIFT_EVENT
} from '../actions/event_actions';

const _defaultState = [
  {
    title: 'Loading Events...',
    imageUrl: 'http://cdn.playbuzz.com/cdn/fa79aecc-8ac9-4994-8118-1485d8c0c5fd/e8ff9782-8612-40a4-8804-8e41343a0f52.jpg',
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
    // debugger
      if (newState[0].title === 'Loading Events...') {
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
