import React from 'react';
import { StyleSheet, View, Text } from 'react-native'; 

class EmptyEvent extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Check back tomorrow for more events!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
       width: '100%',
        height: '90%',
        justifyContent: 'center',
        backgroundColor: '#CDDC39'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 25,
        padding: 20
    }
});

export default EmptyEvent;