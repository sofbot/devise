/* Special alias to your host loopback interface (i.e., 127.0.0.1
    on your development machine)
 */
export const fetchEvents = () => fetch('http://10.0.2.2:8000/events');

export const recordChoice = (direction, swipedEvent) => {
switch(direction) {
  case 'right':
    swipedEvent.liked = true;
    break;
  case 'left':
    swipedEvent.liked = false;
    break;
}

return fetch('http://10.0.2.2:8000/userevents/', {
  method: 'POST',
  body: JSON.stringify({
    eventId: swipedEvent.customId,
    liked: swipedEvent.liked,
    secondsViewed: 1
  })
});
};
