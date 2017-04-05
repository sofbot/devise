import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Icon, View, DeckSwiper,
          Card, CardItem, Thumbnail, Text } from 'native-base';

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
      <Container>
          <View>
            <DeckSwiper
                dataSource={cards}
                renderItem={item =>
                  <Card style={{ elevation: 3 }}>
                    <CardItem>
                      <Thumbnail source={item.image} />
                      <Text>{item.text}</Text>
                      <Text note>NativeBase</Text>
                    </CardItem>
                    <CardItem>
                      <Image style={{ resizeMode: 'cover', width: null }} source={item.image} />
                    </CardItem>
                    <CardItem>
                      <Icon name="ios-heart" style={{ color: '#ED4A6A' }} />
                      <Text>{item.name}</Text>
                    </CardItem>
                  </Card>
                }
              />
          </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  img: {
    opacity: 0.5,
  },
  title: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 5,
  },
});
