import {
  RECEIVE_EVENTS,
  REMOVE_EVENT
} from '../actions/event_actions';
import { merge } from 'lodash';

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
    image: require('../../images/prty.png'),
    venue: 'parnassus',
    friends: 5,
    description: 'modern dance lesson too',
    time: '10pm',
    id: 2
  },
  {
    title: 'after hrs',
    image: require('../../images/prty.png'),
    venue: 'my house',
    friends: 3,
    description: 'dont come early',
    time: '1am',
    id: 3
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
    case REMOVE_EVENT:
      newState.shift(); // take it from the top
      return newState;
    default:
      return state;
  }
};

export default EventsReducer;
