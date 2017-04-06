export const fetchEvents = () => {
  return fetch('/api/events');
};

export const recordChoice = swipedEvent => {
  return fetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({
      eventId: swipedEvent.id,
      liked: swipedEvent.liked
    })
  });
};
