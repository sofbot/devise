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
  }

  _responseInfoCallback(error, result) {
    console.log("inside responseInfoCallback");
    console.log(error);
    console.log(result);
    console.log(result.toString());
    if (error) {
      alert('Error fetching data: ' + error.toString());
    } else {
      alert('Success fetching data: ' + result.toString());
    }
  }


  fetchUserInfo(token){
    const infoRequest = new GraphRequest(
      '/me',
      {
        accessToken: token,
        parameters: {
          fields: {
            string: 'id,first_name,last_name,friends,picture,email'
          }
        }
      },
      this._responseInfoCallback
    );
    const one = new GraphRequestManager();
    const two = one.addRequest(infoRequest);
    console.log("post two", two);
    const three = two.start();
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
                const token = AccessToken.getCurrentAccessToken().toString();
                this.fetchUserInfo(token);
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
