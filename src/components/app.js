import React, { Component } from 'react';
import { StyleSheet, Image, View }
  from 'react-native';
import EventIndex from './eventIndex';
import { Icon, Text } from 'react-native-elements';

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
          <Icon name="timeline" />
        </View>
        <EventIndex />
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
