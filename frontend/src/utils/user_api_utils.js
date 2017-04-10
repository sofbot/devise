export const fetchTimeline = userId => (
  fetch(`http://devise-live.herokuapp.com/userevents/${userId}`)
);
