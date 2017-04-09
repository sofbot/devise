
//This should be http://10.0.2.2:8000/userevents/

export const fetchTimeline = userId => (
  fetch(`http://127.0.0.1:8000/userevents/${userId}`)
);

// export const sendUserInfo = (user, token) => {
//   fetch('http://10.0.2.2:8000/user/', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: JSON.stringify({
//       user_id: user.id,
//       first_name: swipedEvent.customId,
//       liked: swipedEvent.liked,
//       seconds_viewed: 1
//     })
//   });
// };
