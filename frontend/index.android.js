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

export default class devise extends Component {

  SignInButton signInButton = (SignInButton) findViewById(R.id.sign_in_button);
  signInButton.setSize(SignInButton.SIZE_STANDARD);

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
         HIIIIIIIIIII
        </Text>
        <com.google.android.gms.common.SignInButton
         android:id="@+id/sign_in_button"
         android:layout_width="wrap_content"
         android:layout_height="wrap_content" />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('devise', () => devise);
