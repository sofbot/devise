
import React from 'react';
import { Provider } from 'react-redux';
import { AppRegistry, View } from 'react-native';
import configureStore from './src/store/store.js';
import NavigationContainer from './src/components/navigation_container.js';

//bootstrap asyncStorage
let store = configureStore();

const Devise = () => {

  return (
    <View style={{flex:1}}>
      <Provider store={ store }>
        <NavigationContainer/>
      </Provider>
    </View>
  );

};

AppRegistry.registerComponent('Devise', () => Devise);
