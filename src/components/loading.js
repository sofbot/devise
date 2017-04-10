import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
class Loading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({animating: false});
      clearTimeout(this.timer);
    }, 5000);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
      <Spinner
        textContent={"Finding Events Near You"}
        visible={this.state.animating}
        textStyle={{color: '#FFF'}}
        cancelable={true}
        overlayColor={'rgba(0, 0, 0, 0.5)'}/>
      </View>
    );
  }
}

export default Loading;
