import React, { Component } from 'react';
import { Provider } from 'react-redux'
import configureStore from './src/store/store.js';
import App from './src/app';
import {
  AppRegistry,
  View
} from 'react-native';

//bootstrap asyncStorage

const Devise = () => {
  const store = configureStore();

  return (
    <View>
        <Provider store={store}>
          <App />
        </Provider>
    </View>
  );

};


AppRegistry.registerComponent('Devise', () => Devise);
