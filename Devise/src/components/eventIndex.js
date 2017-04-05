import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Card, Text } from 'react-native-elements';

const cards = [
    {
        text: 'Card One',
        name: 'One',
        image: require('../../images/prty.png'),
    },
    {
        text: 'Card Two',
        name: 'Two',
        image: require('../../images/prty.png'),
    },
    {
        text: 'Card Three',
        name: 'Three',
        image: require('../../images/prty.png'),
    },

];

export default class EventIndex extends Component {
  render() {
    return (
      <View>
        <Card
          title="EVENT"
          image={require('../../images/prty.png')}
          imageStyle={styles.image}
          containerStyle={styles.container}>
          <Text style={{marginBottom: 10}}>
            lalala description
          </Text>
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    height: '89%',
    borderRadius: 3
  },
  image: {
    height: '85%'
  }
});









// <DeckSwiper
//     dataSource={cards}
//     onSwipeRight={() => console.log('swiped right')}
//     onSwipeLeft={() => console.log('swiped left')}
//     renderItem={item =>
//       <Card style={{elevation: 3}}>
//         <CardItem>
//           <Thumbnail source={item.image} />
//           <Text>{item.text}</Text>
//           <Text note>NativeBase</Text>
//         </CardItem>
//         <CardItem>
//           <Image style={{ resizeMode: 'cover', width: null }} source={item.image} />
//         </CardItem>
//         <CardItem>
//           <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
//           <Text>{item.name}</Text>
//         </CardItem>
//       </Card>
//     }
//   />
