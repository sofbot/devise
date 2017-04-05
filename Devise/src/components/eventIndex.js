import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { Card } from 'react-native-elements';

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
          image={require('../../images/prty.png')}
          imageStyle={styles.image}
          containerStyle={styles.container}>
          <View style={styles.captionContainer}>
            <View style={styles.captionText}>
              <Text style={styles.title}>Event Title</Text>
              <Text style={styles.venue}>Venue or Distance</Text>
            </View>
            <View style={styles.captionText}>
              <Text>4 friends going</Text>
              <Text>5pm</Text>
            </View>
          </View>
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
    height: '87%'
  },
  captionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  captionText: {
    flexDirection: 'column'
  },
  title: {
    fontWeight: 'bold'
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
