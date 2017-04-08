import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import FacebookButtonContainer from './facebook_button_container.js';

class Auth extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <Image source={require('../../images/landing.jpg')}
          style={styles.container}>
          <Text style={styles.header}>Devise</Text>
          <FacebookButtonContainer style={styles.button}/>
        </Image>
      </View>
    );
  }
}

// <Text style={styles.description}>Discover new and interesting events near by</Text>

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
    color: 'floralwhite'
  }

});

export default Auth;
