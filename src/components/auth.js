import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import FacebookButtonContainer from './facebook_button_container.js';
import { Actions } from 'react-native-router-flux';

class Auth extends Component {
  constructor(props){
    super(props);
    this.demoLogin = this.demoLogin.bind(this);
  }

  demoLogin(){
    this.props.fetchUser({
      id: "2",
      firstName: "Guest",
      lastName: "User",
      email: null,
      imageUrl: null,
      friends: []
    });
    Actions.events({user: {id: "1"}});
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <Image source={require('../../images/gif.gif')}
          style={styles.container}>
          <Text style={styles.header}>devise</Text>
          <FacebookButtonContainer style={styles.button}/>
            <View style={styles.demoButton}>
              <Button onPress={this.demoLogin} title="Continue as a Guest"
                color='crimson' />
            </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: undefined,
    height: undefined,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    fontSize: 24,
    color: 'floralwhite'
  },
  header: {
    fontSize: 75,
    fontWeight: "900",
    marginTop: 20,
    color: 'floralwhite',
    fontFamily: "BentonSans Regular"
  },
  demoButton: {
    // alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    // paddingLeft: 10,
    // paddingRight: 10,
    width: 180,
    height: 17,
  }

});

export default Auth;
