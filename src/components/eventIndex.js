import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, PanResponder, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';

import { PermissionsUtil } from './permissions';

export default class EventIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: '',
      currentEvent: {},
      nextEvent: {}
    }
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentWillMount() {
    // fetch 10 events and put into allEvents.
    // set currentEvent to first fetched event
    this.props.fetchEvents().then(() => {
      this.setState({ currentEvent: this.props.swipeEvents[0] })
      this.setState({ nextEvent: this.props.fetchedEvents[0] })
    })

    // simplegesture codes - on move, get direction
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e, gs);
        const direction = sgs.isSwipeLeft() ? 'left' : 'right';
        this.setState({ direction: direction })
      },
    });
  }

  handleSwipe() {
    if (this.state.direction === 'right') {
      this.props.addTimelineEvent(this.state.currentEvent);
    }
    // send data to backend
    // add user.id to backend
    this.props.recordChoice(this.state.direction, this.state.currentEvent);

    // remove from swipeEvents pile and reset currentEvent
    this.props.removeEvent()
    this.setState({ currentEvent: this.props.swipeEvents[0] })
    // add next event to swipeEvents and reset nextEvent
    this.props.addSwipeEvent(this.state.nextEvent)
    this.props.shiftEventFromAll()
    this.setState({ nextEvent: this.props.fetchedEvents[0] })
    // check length of fetchedEvents. fetch more if >= 5
  }


  render() {
    return (
      <View style={styles.background}>
          <Swiper {...this._panResponder.panHandlers}
            onMomentumScrollEnd={ this.handleSwipe }>
            {
              this.props.swipeEvents.map((e, idx) => (
                <Card
                  key={ idx }
                  image={{ uri: e.imageUrl }}
                  imageStyle={ styles.image }
                  containerStyle={ styles.container }>
                  <View style={ styles.captionContainer }>
                    <View style={ styles.captionText }>
                      <Text style={ styles.title }
                        ellipsizeMode='tail'
                        numberOfLines={1}> { e.title} </Text>
                      <Text style={ styles.venue }
                        ellipsizeMode='tail'
                        numberOfLines={1}>{ e.venue }</Text>
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
  background: {
    backgroundColor: 'white',
    height: '100%'
  },
  container: {
    margin: 30,
    height: 500,
    borderRadius: 8,
  },
  image: {
    height: 450,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
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
    fontWeight: 'bold',
    width: 200
  },
  venue: {
    width: 200
  }
});

// <Card
//   image={ this.props.events[0].image }
//   imageStyle={ styles.image }
//   containerStyle={ styles.container }>
//   <View style={ styles.captionContainer }>
//     <View style={ styles.captionText }>
//       <Text style={ styles.title }
//         ellipsizeMode='tail'
//         numberOfLines={1}> { this.props.events[0].title} </Text>
//       <Text style={ styles.venue }
//         ellipsizeMode='tail'
//         numberOfLines={1}>{ this.props.events[0].venue }</Text>
//     </View>
//     <View style={ styles.captionText }>
//       <Text>{ this.props.events[0].friends } friends going</Text>
//       <Text>{ this.props.events[0].time }</Text>
//     </View>
//   </View>
// </Card>
