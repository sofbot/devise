import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,
        PanResponder, Animated } from 'react-native';
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
      counter: 0
    };
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentWillMount() {
    this.props.fetchEvents().then(() => {
      this.setState({ currentEvent: this.props.fetchedEvents[0] });
    });

    // simplegesture codes - on move, get direction
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e, gs);
        const direction = sgs.isSwipeLeft() ? 'left' : 'right';
        this.setState({ direction: direction });
      },
    });
  }

  handleSwipe(deck) {
    if (this.state.direction === 'right') {
      this.props.addToTimeline(this.state.currentEvent);
    }

    this.props.recordChoice(this.state.direction, this.state.currentEvent)
      .then(() => this.props.removeEvent());

    this.setState({ counter: this.state.counter + 1 }, () => {
      if (this.state.counter % 2 === 1) {
        setTimeout(() => {
          this.refs.swiper.scrollBy(1);
          this.setState({ currentEvent: this.props.fetchedEvents[0] });
        }, 500);
      }

    });

    // // check length of fetchedEvents. fetch more if >= 5
    if (this.props.fetchedEvents.length <= 5) {
      this.props.fetchEvents();
    }
  }

  render() {
    const deck = [
      <Card
        key={ this.state.currentEvent.customId }
        image={{ uri: this.state.currentEvent.imageUrl }}
        imageStyle={ styles.image }
        containerStyle={ styles.container }>
        <View style={ styles.captionContainer }>
          <View style={ styles.captionText }>
            <Text style={ styles.title }
              ellipsizeMode='tail'
              numberOfLines={1}> { this.state.currentEvent.title} </Text>
            <Text style={ styles.venue }
              ellipsizeMode='tail'
              numberOfLines={1}>{ this.state.currentEvent.venue }</Text>
          </View>
          <View style={ styles.captionText }>
            <Text>{ this.state.currentEvent.time }</Text>
          </View>
        </View>
      </Card>,
      <View key={ 'uniq'}>
        <View>
          <Text style={{opacity: 1}}>{ this.state.direction }</Text>
        </View>
        <Card
          key={ this.state.currentEvent.customId }
          image={{ uri: this.state.currentEvent.imageUrl }}
          imageStyle={ styles.image }
          containerStyle={ styles.resultContainer }>
          <View style={ styles.captionContainer }>
            <View style={ styles.captionText }>
              <Text style={ styles.title }
                ellipsizeMode='tail'
                numberOfLines={1}> { this.state.currentEvent.title} </Text>
              <Text style={ styles.venue }
                ellipsizeMode='tail'
                numberOfLines={1}>{ this.state.currentEvent.venue }</Text>
            </View>
            <View style={ styles.captionText }>
              <Text>{ this.state.currentEvent.time }</Text>
            </View>
          </View>
        </Card>
      </View>
    ];

    return (
      <View style={styles.background}>
        <Swiper {...this._panResponder.panHandlers}
          autoplay={this.state.autoplay}
          ref='swiper'
          onMomentumScrollEnd={ this.handleSwipe } >
          { deck }
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
  resultContainer: {
    margin: 30,
    height: 500,
    borderRadius: 8,
    opacity: 0.5
  },
  image: {
    height: 400,
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
