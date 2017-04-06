import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, PanResponder } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';

export default class EventIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      cards: [
        {
          title: 'haus party',
          image: require('../../images/prty.png'),
          venue: 'my house',
          friends: 3,
          time: '5pm'
        },
        {
          title: 'lisa bday',
          image: require('../../images/prty.png'),
          venue: 'your house',
          friends: 5,
          time: '10pm'
        },
        {
          title: 'after hrs',
          image: require('../../images/prty.png'),
          venue: 'my house',
          friends: 3,
          time: '1am'
        }
      ]
    };

  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e, gs);
        console.log('swiped', sgs.relativeGestureDistance.x*100, '% of the screen horizontallly');
        return sgs.isSwipeRight();
      }
    });
  }


  render() {
    return (
      <View>
        <Swiper {...this._panResponder.panHandlers}>
          <Card
            image={this.state.cards[0].image}
            imageStyle={styles.image}
            containerStyle={styles.container}>
            <View style={styles.captionContainer}>
              <View style={styles.captionText}>
                <Text style={styles.title}>{this.state.cards[0].title}</Text>
                <Text style={styles.venue}>{this.state.cards[0].venue}</Text>
              </View>
              <View style={styles.captionText}>
                <Text>{this.state.cards[0].friends} friends going</Text>
                <Text>{this.state.cards[0].time}</Text>
              </View>
            </View>
          </Card>
          <Card
            image={this.state.cards[1].image}
            imageStyle={styles.image}
            containerStyle={styles.container}>
            <View style={styles.captionContainer}>
              <View style={styles.captionText}>
                <Text style={styles.title}>{this.state.cards[1].title}</Text>
                <Text style={styles.venue}>{this.state.cards[1].venue}</Text>
              </View>
              <View style={styles.captionText}>
                <Text>{this.state.cards[1].friends} friends going</Text>
                <Text>{this.state.cards[1].time}</Text>
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
