import React, { Component } from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import FacebookButtonContainer from './facebook_button_container.js';
import { Actions } from 'react-native-router-flux';

class Auth extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <Image source={require('../../images/landing.jpg')}
          style={styles.container}>
          <Text style={styles.header}>devise</Text>
          <FacebookButtonContainer style={styles.button}/>
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
  }

});

export default Auth;
