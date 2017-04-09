import React from 'react';
import FBSDK from 'react-native-fbsdk';
import { fetchUserFBInfo } from '../actions/facebook_actions.js';
import { View, Navigator } from 'react-native';
import { Actions } from 'react-native-router-flux';


const { LoginButton, AccessToken, GraphRequest, GraphRequestManager }
  = FBSDK;

class FacebookButton extends React.Component {
  constructor(props){
    super(props);
    this.fetchUserCallback = this.fetchUserCallback.bind(this);
    this.fbDataOrganizer = this.fbDataOrganizer.bind(this);
  }

  redirect(){
    console.log("inside redirect");
    Actions.events();
  }

  fBRequest(){
    const fBRequest = new GraphRequest(
    '/me',
    {
      parameters: {
        fields: {
          string: 'id,first_name,last_name,friends,picture'
        }
      }
    },
    this.fetchUserCallback
    );
    new GraphRequestManager().addRequest(fBRequest).start();
  }

  fetchUserCallback(error, result){
    if (error) {
      console.log("error ", error);
      // alert('Error fetching data: ' + error.toString());
    } else {
      // alert('Success fetching data: ' + result.toString());
      this.fbDataOrganizer(result);
      this.props.fetchTimeline(result.id);
      console.log("pre-redirect");
      this.redirect();
    }
  }

  fbDataOrganizer(data){
    this.props.fetchUserFBInfo({
      id: data.id,
      firstName: data.first_name,
      lastName: data.last_name,
      imageUrl: data.picture.data.url,
      friends: data.friends.data
    });
  }

  render (){
    return (
      <View>
        <LoginButton
          readPermissions={["public_profile", "user_friends"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                  AccessToken.getCurrentAccessToken().then(res => {
                  this.fBRequest();
                });
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

export default FacebookButton;


//
// const formatFriends = (friends) => {
//   if (friends.length) {
//     console.log("friends");
//     return friends.map(friend => (
//       friend.imageUrl = fetchFriendPicture(friend.id)
//     ));
//   } else {
//     console.log("no friends");
//     return [];
//   }
// };
//
// const fetchFriendPicture = (friendId, token) => {
//   const fBRequest2 = new GraphRequest(
//     `/${friendId}`,
//     'GET',
//     {
//       parameters: {
//         fields: {
//           string: 'picture'
//         }
//       }
//     },
//     formatFriendsCallback
//   );
//
//   const xx = new GraphRequestManager().addRequest(fBRequest2).start();
//   console.log("xx ", xx);
//   return xx;
// };
//
// const formatFriendsCallback = (error2, result2) => {
//   if (error2) {
//     console.log("error ", error2);
//     alert('Error fetching data: ' + error2.toString());
//   } else {
//     console.log("result ", result2);
//     alert('Success fetching data: ' + result2.toString());
//     return result.picture.data.url;
//   }
// };
