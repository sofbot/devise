
import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import App from './src/app';
import configureStore from './src/store/store.js';

//bootstrap asyncStorage



const Devise = () => {

  return (
    <View>
        <App />
    </View>
  );

};


AppRegistry.registerComponent('Devise', () => Devise);
