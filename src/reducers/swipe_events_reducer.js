import { REMOVE_EVENT, ADD_SWIPE_EVENT, ADD_EVENTS } from '../actions/event_actions';

const _defaultState = [
  {
    title: 'haus party',
    imageUrl: 'http://whalebonemag.com/wp-content/uploads/2015/06/38589-Outdoor-Dinner-Party.jpg',
    venue: 'my house',
    friends: [], // array of friends
    startTime: '5pm',
    description: 'haus party woop woop', // don't need description until eventDetail
  },
  {
    title: 'lisa bday',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif',
    venue: 'parnassus',
    friends: [],
    description: 'modern dance lesson too',
    startTime: '10pm',
  }
];

const SwipeEventsReducer = (state = _defaultState, action) => {
  Object.freeze(state);
  let newState = JSON.parse(JSON.stringify(state));
  switch(action.type) {
    case ADD_EVENTS:
      return action.events;
    case REMOVE_EVENT:
      newState.shift();
      return newState;
    case ADD_SWIPE_EVENT:
      newState.push(action.nextEvent);
      return newState;
    default:
      return state;
  }
};

export default SwipeEventsReducer;
