import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { View, Text } from 'react-native';
import App from './app.js';
import Auth from './auth.js';
import TimelineContainer from './timeline_container';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = ({ loggedIn: false });
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentDidMount(){
    // alert("props in Navigation " + this.props.user.id);
    console.log("componenet Did Moutn ", this.props.user);
    if (this.props.user && this.props.user.id) {
      this.loggedIn();
    }
  }

  loggedIn(){
    this.setState({ loggedIn: true});
  }

  render() {
    // alert (!this.state.loggedIn);
    return (
        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="auth" component={Auth} title="Auth"
              initial={!this.state.loggedIn} />
            <Scene key="app" component={App} title="App"
              initial={this.state.loggedIn} />
            <Scene key="timeline" component={TimelineContainer} title="Timeline"/>
          </Scene>
        </Router>

    );
  }
}
