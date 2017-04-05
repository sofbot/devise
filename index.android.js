/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */



import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import FBSDK from 'react-native-fbsdk';
const { LoginButton, AccessToken } = FBSDK;

export default class Devise extends Component {
  constructor(props){
    super(props);
    this.state = {token: ""};
  }

  // initUser(token) {
  //   fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
  //   .then((response) => response.json())
  //   .then((json) => {
  //     // Some user object has been set up somewhere, build that user here
  //     this.user.firstName = json.name;
  //     this.user.id = json.id;
  //     this.user.user_friends = json.friends;
  //     this.user.loading = false;
  //     this.set(user.loggedIn = true;
  //     user.avatar = setAvatar(json.id);
  //   })
  //   .catch(() => {
  //     reject('ERROR GETTING DATA FROM FACEBOOK');
  //   })
  // }

  fetchUserInfo(token){
     let res = fetch(`https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,friends,picture&access_token=${token}`);
     console.log(res.toString());
     console.log(res.text());
     console.log(res.text);
     console.log(res.response());
     console.log(res.response);
     console.log(res.response.toString());
     console.log(res.json);
     console.log(res.responseText);
     console.log(res.json());
     console.log(res.type);
     console.log(res.type());
     console.log(res.type.toString());
     console.log(res.url);
    alert(res.toString());
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          devise
        </Text>
        <LoginButton
          readPermissions={["public_profile", "user_friends"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  this.fetchUserInfo(data.accessToken.toString());
                  }
                );
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2f4f4f',
  },
  welcome: {
    fontSize: 75,
    textAlign: 'center',
    margin: 10,
    fontWeight: "900",
    color: 'aliceblue'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});


AppRegistry.registerComponent('Devise', () => Devise);
