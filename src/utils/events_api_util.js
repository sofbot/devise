	/* Special alias to your host loopback interface (i.e., 127.0.0.1
      on your development machine)
   */
export const fetchEvents = () => fetch('http://10.0.2.2:8000/events');

export const recordChoice = swipedEvent => {
  return fetch('userevents', {
    method: 'POST',
    body: JSON.stringify({
      eventId: swipedEvent.id,
      liked: swipedEvent.liked
    })
  });
};
