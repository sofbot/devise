
import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import App from './src/app.js';
import configureStore from './src/store/store.js';

//bootstrap asyncStorage
let store = configureStore();

const Devise = () => {

  return (
    <View>
        <App store={ store } />
    </View>
  );

};


AppRegistry.registerComponent('Devise', () => Devise);
