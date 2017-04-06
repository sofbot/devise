import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, PanResponder } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';
import { values } from 'lodash';

export default class EventIndex extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e, gs);
        console.log('swiped', sgs.relativeGestureDistance.x*100, '% of the screen horizontallly');
        const right = sgs.isSwipeRight();
        const left = sgs.isSwipeLeft();
        const direction = left ? 'left' : 'right';
        console.log(direction);
        return direction;
      }
    });
  }


  render() {
    return (
      <View style={{backgroundColor: 'white'}}>
        <Swiper {...this._panResponder.panHandlers}>
          {
            this.props.events.map((e, idx) => (
              <Card
                key={ idx }
                image={ e.image }
                imageStyle={ styles.image }
                containerStyle={ styles.container }>
                <View style={ styles.captionContainer }>
                  <View style={ styles.captionText }>
                    <Text style={ styles.title }> { e.title } </Text>
                    <Text style={ styles.venue }>{ e.venue }</Text>
                  </View>
                  <View style={ styles.captionText }>
                    <Text>{ e.friends } friends going</Text>
                    <Text>{ e.time }</Text>
                  </View>
                </View>
              </Card>
            ))
          }
        </Swiper>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    height: '80%',
    borderRadius: 3
  },
  image: {
    height: '87%'
  },
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  captionText: {
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold'
  }
});
