import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';

export default class Timeline extends Component {
  render() {
    return(
      <View style={styles.background}>
        <List containerStyle={{marginBottom: 20}}>
          {
            this.props.timelineEvents.map((e, idx) => (
              <ListItem
                key={ idx }
                title={ e.title }
              />
            ))
          }
        </List>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: 33
  }
});
