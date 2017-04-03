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
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';

export default class frontend extends Component {

   GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
    // play services are available. can now configure library
    console.log(this);
   })
   .catch((err) => {
    console.log('play services error', err.code, err.message)
   });

   GoogleSignin.configure({
   })

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Meows
        </Text>
          <GoogleSigninButton
            style={{width: 48, height: 48}}
            size={GoogleSigninButton.Size.Icon}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn.bind(this)}/>
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

AppRegistry.registerComponent('frontend', () => frontend);
