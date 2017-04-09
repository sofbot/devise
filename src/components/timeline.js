import React, { Component } from 'react';
import { List, ListItem } from 'react-native-elements';
import { View, StyleSheet, Text, Image, ScrollView } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

export default class Timeline extends Component {
  constructor(props){
    super(props);
  }

  renderHeader(event) {
    return (
      <View style={styles.header} key={event.title.title}>
        <Image source={{uri: event.title.imageUrl}}
          style={styles.image} />
        <Text style={styles.headerText}>{event.title.title}</Text>
      </View>
    );
  }

  renderContent(event) {

    // let friends = <View></View>;
    //
    // if ( event.content.friends && event.content.friends.length > 0) {
    //   const list = event.content.friends.map((friend, i) => (
    //     <Text key={i} style={styles.friends}>{friend.name}</Text>
    //   ));
    //   friends = <View>
    //               <Text style={styles.text}>Friends Attending: </Text>
    //                 { list }
    //             </View>;
    // }

    return (
      <View style={styles.content} key={event.time}>
        <Text style={styles.text}>Venue: {event.content.location}</Text>
        <Text style={styles.text}>Time: {event.content.time}</Text>
        <Text style={styles.text}>Details: {event.content.description}</Text>
      </View>
    );
  }

  formatDetail(desc){
    let summary = desc;
    // if (desc.split("").length > 200) {
    //   summary = desc.slice(0, 198) + "...";
    // }
    return summary;
  }

  formatTime(time){
    time = time.split(":");
    let hours = time[0];
    const minutes = time[1];
    let suffix = " AM";

    if (time[0] > 12) {
      hours = time[0] - 12;
      suffix = " PM";
    }
    return hours + ":" + minutes + suffix;
  }

  formatTitle(name){
    let title = name;
    if (name.split("").length > 28) {
      title = name.slice(0, 26) + "...";
    }
    return title;
  }


  render() {

    let events = <View></View>;

    if (this.props.timelineEvents) {
      events = this.props.timelineEvents.map((event, idx) => {
        const formattedTime = this.formatTime(event.startTime);
        const formattedDetail = this.formatDetail(event.summary);
        const formatTitle = this.formatTitle(event.title);
        return {
          title: {
            title: formatTitle,
            imageUrl: event.imageUrl
          },
          content: {
            location: event.location,
            time: formattedTime,
            description: formattedDetail,
          }
        };
      });
    }

    return(
      <View style={styles.background}>
        <ScrollView>
          <Accordion
          style={styles.container}
          sections={events}
          renderHeader={this.renderHeader}
          renderContent={this.renderContent}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    marginTop: 53,
    backgroundColor: 'white'
  },
  header:{
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 64,
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: 'lightgray',
    borderBottomWidth: .7
  },
  image: {
    height: 50,
    borderRadius: 25,
    width: 50,
    margin: 7
  },
  headerText: {
    fontWeight: "400",
    fontSize: 23,
    marginLeft: 10
  },
  content: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    padding: 7,
    marginLeft: 13
  }
  // friends: {
  //   fontSize: 18,
  //   marginLeft: 30,
  //   padding: 7
  // }
});
