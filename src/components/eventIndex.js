import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, PanResponder } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';

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
          <Card
            image={this.props.events[0].image}
            imageStyle={styles.image}
            containerStyle={styles.container}>
            <View style={styles.captionContainer}>
              <View style={styles.captionText}>
                <Text style={styles.title}>{this.props.events[0].title}</Text>
                <Text style={styles.venue}>{this.props.events[0].venue}</Text>
              </View>
              <View style={styles.captionText}>
                <Text>{this.props.events[0].friends} friends going</Text>
                <Text>{this.props.events[0].time}</Text>
              </View>
            </View>
          </Card>
          <Card
            image={this.props.events[1].image}
            imageStyle={styles.image}
            containerStyle={styles.container}>
            <View style={styles.captionContainer}>
              <View style={styles.captionText}>
                <Text style={styles.title}>{this.props.events[1].title}</Text>
                <Text style={styles.venue}>{this.props.events[1].venue}</Text>
              </View>
              <View style={styles.captionText}>
                <Text>{this.props.events[1].friends} friends going</Text>
                <Text>{this.props.events[1].time}</Text>
              </View>
            </View>
          </Card>
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
