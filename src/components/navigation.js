import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { View, BackAndroid, StyleSheet } from 'react-native';
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
        <Router navigationBarStyle={{backgroundColor: 'white'}} titleStyle={{color: 'black', fontWeight: 'bold'}}>
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
