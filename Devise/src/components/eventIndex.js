import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import {
    Button
} from 'react-native-elements';


export default class EventIndex extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../images/prty.png')} />
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
  },
  title: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
});
