import React from 'react';
import FBSDK from 'react-native-fbsdk';
import { fetchUserFBInfo } from '../actions/facebook_actions.js';

const { LoginButton, AccessToken } = FBSDK;

const FacebookButton = () => {
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
              const token = AccessToken.getCurrentAccessToken().toString();
              fetchUserFBInfo(token);
              alert ("Login successful");
            }
          }
        }
        onLogoutFinished={() => alert("User logged out")}/>
    </View>
  );
};
