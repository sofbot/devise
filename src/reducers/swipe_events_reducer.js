import { REMOVE_EVENT, ADD_EVENT, ADD_EVENTS } from '../actions/event_actions';

const _defaultState = [
  {
    title: 'haus party',
    image: require('../../images/prty.png'),
    venue: 'my house',
    friends: 3, // number of friends also going
    time: '5pm',
    description: 'haus party woop woop', // don't need description until eventDetail
    id: 1
  },
  {
    title: 'lisa bday',
    image: require('../../images/dinnerprty.png'),
    venue: 'parnassus',
    friends: 5,
    description: 'modern dance lesson too',
    time: '10pm',
    id: 2
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
    case ADD_EVENT:
      newState.push(action.nextEvent);
      return newState;
    default:
      return state;
  }
};

export default SwipeEventsReducer;
