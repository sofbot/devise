import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image,
          Navigator, Header } from 'react-native';
import { EventIndex } from './components/eventIndex';
import { Container } from 'native-base';

export default class App extends Component {
  render() {

  return (
    <Container>
      <EventIndex />
    </Container>
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
