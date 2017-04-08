import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Image, Navigator, View }
  from 'react-native';
import EventIndexContainer from './event_index_container';
import { Icon, Text } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View>
        <View style={styles.header}>
          <Icon name="filter-list" />
          <Text h4>Devise</Text>
          <Icon name="timeline" onPress={ Actions.timeline } />
        </View>
        <EventIndexContainer />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10
  }
});
