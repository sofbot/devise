import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { styles } from './eventIndex';

class SwipeResult extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
          <View key={this.state.currentEvent.customId + "234823"} style={ styles.container }>
            <View style={ styles.overlay }>
              <View style={this.state.msgViewStyle}></View>
              <Text h1 style={this.state.msgTxtStyle}>{ this.state.message }</Text>
            </View>
            <View key={ this.state.currentEvent } style={ styles.resultContainer } >
              <Image source={{ uri: this.state.currentEvent.imageUrl }}
                style={ styles.image } />
              <View style={ styles.columnContainer }>
                <View style={ styles.columnContainer }>
                  <Text style={ styles.captionHeader }
                    ellipsizeMode='tail'
                    numberOfLines={1}> { this.state.currentEvent.title} </Text>
                  <Text style={ styles.captionText }
                    ellipsizeMode='tail'
                    numberOfLines={1}>{ this.state.currentEvent.location }</Text>
                </View>
                <View>
                  <Text style={ styles.captionText }>
                    {
                      this.state.currentEvent.startTime === '00:01:00' ?
                        'All Day' : this.state.currentEvent.startTime
                    }
                  </Text>
                </View>
              </View>
            </View>
          </View>
        );
    }
}


export default SwipeResult;
