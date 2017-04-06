export const fetchEvents = () => {
  return fetch('/events');
};

export const recordChoice = swipedEvent => {
  return fetch('userevents', {
    method: 'POST',
    body: JSON.stringify({
      eventId: swipedEvent.id,
      liked: swipedEvent.liked
    })
  });
};
