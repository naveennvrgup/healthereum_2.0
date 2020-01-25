import React, { Component } from 'react';
import { Container, Header, Content, Button, Text } from 'native-base';
import { StyleSheet, View } from 'react-native';

export default class PatientButtons extends Component {
  render() {
    return (
        <View style={styles.buttons}>
          <Button style={styles.button} block danger>
            <Text>S.O.S</Text>
          </Button>
          <Button style={styles.button} block>
            <Text>Q R Code</Text>
          </Button>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    buttons:{
        flexDirection:"row",
        justifyContent:"center"
    },
    button:{
        margin:20
    }
});