/* Special alias to your host loopback interface (i.e., 127.0.0.1
    on your development machine)
 */
export const fetchEvents = (userId, offset) => {
  const url = `http://10.0.2.2:8000/events/${userId}/${offset}`;
  return fetch(url);
};

export const recordChoice = (direction, swipedEvent) => {
  switch(direction) {
    case 'right':
      swipedEvent.liked = true;
      break;
    case 'left':
      swipedEvent.liked = false;
      break;
  }

  // add user_id 4 reals
  return fetch('http://10.0.2.2:8000/userevents/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        user_id: '1',
        event: swipedEvent.customId,
        liked: `${swipedEvent.liked}`,
        seconds_viewed: '1'
      })
    });
};
