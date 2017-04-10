import {
  ADD_TO_TIMELINE, RECEIVE_TIMELINE
} from '../actions/timeline_actions';

const _defaultState = [
  {
    title: 'Free Admission Day: Museum of Craft and Design',
    venue: 'Museum',
    friends: [{name: "Olivia"}, {name: "Liam"}, {name: "Noah"}], // friends also going
    time: '13:00:00',
    description: 'A special free admission day thanks for Sunday Streets. Get inspired by Wendy Maruyama’s magnificent elephant artworks, and scale it down to a wearable size. We’ll be making elephant-inspired shrink plastic pins, charms and pendants that you will be able to wear home, to spread the word about elephant conservation! The museum will be open with FREE admission and activity as a part of the Dogpatch/Bayview Sunday Streets event. The South-bound lanes of 3rd will be closed to traffic, so be sure to bring your bike, skates, or scooter!',
    imageUrl: 'http://cdn.funcheap.com/wp-content/uploads/2013/10/MOCAD-0261a_small_web-175x130.jpg'
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
      if (newState[0].title === 'Free Admission Day: Museum of Craft and Design') {
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
