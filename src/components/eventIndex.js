import React, { Component } from 'react';
import { StyleSheet, Image, View,
        PanResponder, Animated } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';
import Loading from './loading';
import { Actions } from 'react-native-router-flux';

export default class EventIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: '',
      currentEvent: {},
      counter: 0,
      offset: 0,
      message: '',
      msgTxtStyle: {},
      msgViewStyle: {}
    };
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  componentWillMount() {
    this.props.fetchEvents(this.props.user.id, this.state.offset).then(() => {
      this.setState({ currentEvent: this.props.fetchedEvents[0] }, () => {
        this.setState({ offset: this.state.offset + 10});
      });
    });
    // simplegesture codes - on move, get direction
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e, gs);
        const direction = sgs.isSwipeLeft() ? 'left' : 'right';
        const message = sgs.isSwipeLeft() ? 'pass' : 'added to timeline';
        const msgTxtStyle = sgs.isSwipeLeft() ? {color: 'red'} : { color: 'green'}
        const msgViewStyle = sgs.isSwipeLeft() ? {left: 170, top: 150, position: 'absolute'} : {left: 50, top: 150, position: 'absolute'}
        this.setState({ direction: direction });
        this.setState({ message: message });
        this.setState({ msgTxtStyle: msgTxtStyle });
        this.setState({ msgViewStyle: msgViewStyle });
      },
    });
  }

  handleSwipe(deck) {
    this.props.recordChoice(this.state.direction, this.state.currentEvent)
    .then(() => this.props.removeEvent());

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
      <View>
        <View style={this.state.msgViewStyle}>
          <Text h1 style={this.state.msgTxtStyle}>{ this.state.message }</Text>
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
        <View style={styles.header}>
          <Icon name="filter-list" />
          <Text h4 style={{color: 'black'}}>Devise</Text>
          <Icon name="timeline" onPress={ Actions.timeline } />
        </View>
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
  header: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10
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
    opacity: 0.2
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


// <Card
//   key={ this.state.currentEvent.customId }
//   image={{ uri: this.state.currentEvent.imageUrl }}
//   imageStyle={ styles.image }
//   containerStyle={ styles.resultContainer }>
//   <View style={ styles.captionContainer }>
//     <View style={ styles.captionText }>
//       <Text style={ styles.title }
//         ellipsizeMode='tail'
//         numberOfLines={1}> { this.state.currentEvent.title} </Text>
//       <Text style={ styles.venue }
//         ellipsizeMode='tail'
//         numberOfLines={1}>{ this.state.currentEvent.venue }</Text>
//     </View>
//     <View style={ styles.captionText }>
//       <Text>{ this.state.currentEvent.time }</Text>
//     </View>
//   </View>
// </Card>
// <View style={styles.overlay}>
//   <Text style={{position: 'absolute'}}>{ this.state.direction }</Text>
// </View>
