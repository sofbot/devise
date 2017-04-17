import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import { View, BackAndroid, StyleSheet } from 'react-native';
import EventIndexContainer from './event_index_container.js';
import AuthContainer from './auth_container.js';
import TimelineContainer from './timeline_container';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = ({ loggedIn: false });
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentDidMount(){
    if (this.props.user && this.props.user.id) {
      Actions.events();
    }
  }

  loggedIn(){
    this.setState({ loggedIn: true});
  }

  render() {

    BackAndroid.addEventListener('hardwareBackPress',
    () => {
      console.log("pressed back");
      console.log(this.props.title);
      console.log(this.props.user);
      console.log(this.props.user.id);

      //for demo user
      if (this.props.title === "Navigation" && this.props.user
      && this.props.user.id === "1") {
        console.log("DEMO USER");
        Actions.events();
        return true;
      }

      //for Facebook user
      else if (this.props.title === "Navigation" && this.props.user
      && this.props.user.id) {
        console.log("Popping");
        BackAndroid.exitApp();
        return true;
      }

      else {
        return false;
      }
    });

    return (
      <View style={{flex:1}}>
        <Router navigationBarStyle={{backgroundColor: 'white'}} titleStyle={{color: 'black', fontWeight: 'bold'}}>
          <Scene key="root" >
            <Scene key="auth" component={ AuthContainer } title="Login"
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
