import FBSDK from 'react-native-fbsdk';
const { GraphRequest, GraphRequestManager } = FBSDK;

export const fetchUserFBInfo = token => (
  new GraphRequest(
    '/me',
    {
      accessToken: token,
      parameters: {
        fields: {
          string: 'id,first_name,last_name,friends,picture,email'
        }
      }
    }
  )
);

export const sendUserInfo = (user, token) => {
  fetch('https://mywebsite.com/endpoint/', {
    method: 'POST',
    body: JSON.stringify({ //JSON necessary?
      user: user, //refactor?
      token: token,
    })
  });
};
