import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View, BackAndroid, StyleSheet } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import EventIndexContainer from './event_index_container.js';
import Auth from './auth.js';
import TimelineContainer from './timeline_container';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = ({ loggedIn: false });
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentDidMount(){
    if (this.props.user && this.props.user.id) {
      this.loggedIn();
    }
    BackAndroid.addEventListener('hardwareBackPress',
    () => alert("pressed back", this.props.title));
  }

  loggedIn(){
    this.setState({ loggedIn: true});
  }

  render() {
    // alert (!this.state.loggedIn);
    return (

      <View style={{flex:1}}>
        <View style={styles.header}>
          <Icon name="filter-list" />
          <Text h4>Devise</Text>
          <Icon name="timeline" onPress={ Actions.timeline } />
        </View>
        <Router>
          <Scene key="root" >
            <Scene key="auth" component={ Auth } title="Login"
              initial={!this.state.loggedIn} hideNavBar={true}/>
            <Scene key="events" component={ EventIndexContainer } title="Events"
              initial={this.state.loggedIn} hideNavBar={true}/>
            <Scene key="timeline" component={ TimelineContainer } title="Timeline" hideNavBar={false} />
          </Scene>
        </Router>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    width: '100%',
    padding: 10
  }
});
