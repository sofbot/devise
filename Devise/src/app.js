import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import EventIndex from './components/eventIndex';


export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
         <Text> home home home </Text>
         <EventIndex />
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
  img: {
    opacity: 0.5,
    width: '100%'
  },
  title: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
});