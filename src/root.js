import React from 'react';
import { View } from 'react-native';
import App from './src/components/app.js';
import Auth from './src/components/auth.js';
import Navigation from './src/components/navigation.js';

class Root extends React.Component {
  constructor(props){
    super(props);
  }

  render(){

    let landing;

    if (this.props.user) {
      landing = (
        <View>
          <App />
        </View>
      );
    } else {
      landing = (
        <View style={{flex:1}}>
          <Auth />
        </View>
      );
    }

    return (
      <View style={{flex:1}}>
          {landing}
      </View>
    );
  }

}

export default Root;
