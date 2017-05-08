import React, { Component } from 'react';
import { StyleSheet, Image, View, TouchableOpacity,
        PanResponder, Animated, ScrollView } from 'react-native';
import { Card, Text, Icon } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import SimpleGesture from 'react-native-simple-gesture';
import Loading from './loading';
import { Actions } from 'react-native-router-flux';
import EmptyEvent from './empty_event.js';
import SwipeResult from './swipe_result';

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
        this.setState({ offset: this.state.offset + 10 });
      });
    });

    // simplegesture codes - on move, get direction
    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (e, gs) => {
        let sgs = new SimpleGesture(e, gs);
        const direction = sgs.isSwipeLeft() ? 'left' : 'right';
        const message = sgs.isSwipeLeft() ? 'pass' : 'added to timeline';
        const msgTxtStyle = sgs.isSwipeLeft() ? styles.leftMsgTxt : styles.rightMsgTxt;
        const msgViewStyle = sgs.isSwipeLeft() ? styles.leftMsgView : styles.rightMsgView;

        this.setState({ direction: direction, message: message, msgTxtStyle: msgTxtStyle,
          msgViewStyle: msgViewStyle });
      },
    });
  }

  handleSwipe() {
    if (this.state.counter % 2 === 0) {
      this.props.recordChoice(this.state.direction, this.state.currentEvent, this.props.user.id, 1)
      .then(() => this.props.removeEvent());

      if (this.state.direction === 'right') {
        this.props.addToTimeline(this.state.currentEvent);
      }
    }

    this.setState({ counter: this.state.counter + 1 }, () => {
      if (this.state.counter % 2 === 1) {
        if (this.props.fetchedEvents.length === 1) {
          return;
        } else {
          setTimeout(() => {
            this.refs.swiper.scrollBy(1);
            this.setState({ currentEvent: this.props.fetchedEvents[0] });
          }, 500);
        }
      }
    });

    // check length of fetchedEvents. Fetch more if >= 5
    if (this.props.fetchedEvents.length <= 5) {
      this.props.fetchEvents(this.props.user.id, this.state.offset)
        .then(() => {

          // reset offset if user is guest
          if (this.props.user.id === "0" && this.props.fetchedEvents < 10) {
            this.setState({ offset: 0 });
          } else {
            this.setState({ offset: this.state.offset + 10 });
        }});
    }
  }

  render() {
    let deck, content;

    if (this.props.fetchedEvents.length > 0) {
       deck = [
        <View key={ this.state.currentEvent } style={ styles.container } >
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
        </View>,
        <SwipeResult />
      ];
    }

    if (this.props.fetchedEvents.length === 0) {
      content = <EmptyEvent />;
    } else {
      content =
        <Swiper {...this._panResponder.panHandlers}
          ref='swiper'
          showsPagination={false}
          onMomentumScrollEnd={ this.handleSwipe } >
          { deck }
        </Swiper>;
    }

    return (
      <View>
        <Loading visible={this.state.visible}/>
        <View style={ styles.header }>
          <Text h4 style={ styles.headerTxt }>Devise</Text>
          <TouchableOpacity onPress={ Actions.timeline }>
            <View >
              <Text style={styles.timeline}>&#9202;</Text>
            </View>
          </TouchableOpacity>
        </View>
      {content}
    </View>
    );
  }
}

export const styles = StyleSheet.create({
  headerTxt: {
    color: 'black',
    marginLeft: '40%',
    fontFamily: "BentonSans Regular"
  },
  header: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '10%'
  },
  container: {
    height: '80%',
    width: '90%',
    marginLeft: '5%',
    borderRadius: 8,
    elevation: 1
  },
  resultContainer: {
    height: '100%',
    width: '100%',
    borderRadius: 8,
    elevation: 1
  },
  overlay: {
    borderRadius: 8,
    position: 'absolute',
    height: '100%',
    width: '100%',
    elevation: 2,
  },
  leftMsgView: {
    position: 'absolute',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'red',
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
    opacity: 0.2
  },
  leftMsgTxt: {
    color: 'red',
    top: '30%',
    left: '40%',
    position: 'absolute',
    transform: [{ rotate: '20deg'}],
    fontFamily: "BentonSans Regular"
  },
  rightMsgView: {
    position: 'absolute',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'green',
    backgroundColor: 'green',
    height: '100%',
    width: '100%',
    opacity: 0.2
  },
  rightMsgTxt: {
    color: 'green',
    top: '35%',
    left: '3%',
    position: 'absolute',
    transform: [{ rotate: '-25deg'}]
  },
  timeline: {
    fontSize: 40,
    marginBottom: 10,
    marginRight: 20
  },
  image: {
    height: '75%',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column'
  },
  captionHeader: {
    fontWeight: 'bold',
    width: '90%',
    marginLeft: '5%',
    marginTop: 5,
    marginBottom: 5,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 5,
    textAlign: 'left',
    lineHeight: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#eeeeee'
  },
  captionText: {
    paddingLeft: 25,
    paddingRight: 10,
    overflow: 'scroll'
  }
});
