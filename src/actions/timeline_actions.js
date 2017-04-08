export const ADD_TO_TIMELINE = 'ADD_TO_TIMELINE';

export const addToTimeline = likedEvent => ({
  type: 'ADD_TO_TIMELINE',
  likedEvent
});
