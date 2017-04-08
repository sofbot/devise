import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import { View, Text, BackAndroid } from 'react-native';
import App from './app.js';
import Auth from './auth.js';

export default class Navigation extends React.Component {
  constructor(props){
    super(props);
    this.state = ({ loggedIn: false });
    this.loggedIn = this.loggedIn.bind(this);
  }

  componentDidMount(){
    alert("props in Navigation " + this.props.user.id);
    console.log("componenet Did Moutn ", this.props.user);
    if (this.props.user && this.props.user.id) {
      this.loggedIn();
    }
    BackAndroid.addEventListener('hardwareBackPress',
    () => alert("pressed back", this.props.title));
  }

  componentWillReceiveProps(){
    alert("new props");
  }

  componentWillUpdate(){
    alert("will update");
  }

  componentDidUpdate(){
    alert("did update");
  }

  loggedIn(){
    alert("changing logged in");
    this.setState({ loggedIn: true});
  }

  render() {
    alert (!this.state.loggedIn);
    return (

        <Router>
          <Scene key="root" hideNavBar={true}>
            <Scene key="auth" component={Auth} title="Auth"
              initial={!this.state.loggedIn} />
            <Scene key="app" component={App} title="App"
              initial={this.state.loggedIn} />
          </Scene>
        </Router>

    );
  }
}
