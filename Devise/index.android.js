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
  View,
  Image
} from 'react-native';
import App from './src/app';


export default class Devise extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('Devise', () => Devise);
