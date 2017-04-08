import FBSDK from 'react-native-fbsdk';
const { GraphRequest, GraphRequestManager } = FBSDK;

export const fetchUserFBInfo = token => {
  const fBRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: {
          string: 'id,first_name,last_name,friends,picture'
        }
      }
    },
    fetchUserCallback
  );
  const x = new GraphRequestManager().addRequest(fBRequest).start();

};



const fetchUserCallback = (error, result) => {
  if (error) {
    console.log("error ", error);
    // alert('Error fetching data: ' + error.toString());
  } else {
    console.log("result ", result);
    // alert('Success fetching data: ' + result.toString());
    const fb = fbDataOrganizer(result);
    console.log("fb ", fb);
    return fb;
  }
};

const fbDataOrganizer = (data) => {
 return `{
   id: ${data.id},
   firstName: ${data.first_name},
   lastName: ${data.last_name},
   imageUrl: ${data.picture.data.url},
   friends: ${formatFriends(data.friends.data)},
  }`;
};

const formatFriends = (friends) => {
  if (friends.length) {
    console.log("friends");
    return friends.map(friend => (
      friend.imageUrl = fetchFriendPicture(friend.id)
    ));
  } else {
    console.log("no friends");
    return [];
  }
};

const fetchFriendPicture = (friendId, token) => {
  const fBRequest = new GraphRequest(
    `/${friendId}`,
    'GET',
    {
      parameters: {
        fields: {
          string: 'picture'
        }
      }
    },
  formatFriendsCallback
  );

  const xx = new GraphRequestManager().addRequest(fBRequest).start();
  console.log("xx ", xx);
  return xx;
};

const formatFriendsCallback = (error, result) => {
  if (error) {
    console.log("error ", error);
    alert('Error fetching data: ' + error.toString());
  } else {
    console.log("result ", result);
    alert('Success fetching data: ' + result.toString());
    return result.picture.data.url;
  }
};

export const sendUserInfo = (user, token) => {

  fetch('https://mywebsite.com/endpoint/', {
    method: 'POST',
    body: JSON.stringify({ //JSON necessary?
      user: user, //refactor?
      token: token,
    })
  });
};
