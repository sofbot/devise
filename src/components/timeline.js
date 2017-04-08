import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';

export default class Timeline extends Component {
  render() {
    return(
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
    );
  }
}
