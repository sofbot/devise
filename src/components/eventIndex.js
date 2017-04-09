import React, { Component } from 'react';
import { StyleSheet, Image, View, Text,
        PanResponder, Animated } from 'react-native';
import { Card } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';
import Loading from './loading';

import { PermissionsUtil } from './permissions';

export default class EventIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: '',
      currentEvent: {},
      counter: 0,
      offset: 0,
      userId: this.props.user.id
    };
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents(this.props.user.id, this.state.offset).then(() => {
      this.setState({ currentEvent: this.props.fetchedEvents[0] }, () => {
        this.setState({ offset: this.state.offset + 10});
      });
    });
  }

  componentWillMount() {
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
    this.setState({ counter: this.state.counter + 1 }, () => {
      if (this.state.counter % 2 === 1) {
        setTimeout(() => {
          this.refs.swiper.scrollBy(1);
          this.setState({ currentEvent: this.props.fetchedEvents[0] });
        }, 500);
      } else {
        if (this.state.direction === 'right') {
          this.props.addToTimeline(this.state.currentEvent);
        }

        this.props.recordChoice(this.state.direction, this.state.currentEvent)
          .then(() => this.props.removeEvent());
      }

    });

    // // check length of fetchedEvents. fetch more if >= 5
    if (this.props.fetchedEvents.length <= 5) {
      this.props.fetchEvents(this.props.user.id, this.state.offset)
        .then(() => this.setState({ offset: this.state.offset + 10 }));
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
        <View style={{ position: 'absolute'}}>
          <Text>{ this.state.direction }</Text>
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
        <Loading visible={this.state.visible}/>
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
    flex: 1,
    backgroundColor: 'white',
    height: '100%'
  },
  container: {
    margin: 30,
    height: 500,
    borderRadius: 8,
  },
  overlay: {
    margin: 30,
    height: 500,
    borderRadius: 8,
    opacity: 0.5
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
