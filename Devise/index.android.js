/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import App from './src/app';
import EventIndex from './src/components/eventIndex';


export default class Devise extends Component {
  render() {
    return (
      <EventIndex />
    );
  }
}

AppRegistry.registerComponent('Devise', () => Devise);
