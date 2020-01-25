import React, { Component } from 'react';
import { Container, Button, Header, Text, Content, Input, Item } from 'native-base';
import { StyleSheet } from 'react-native';

export default class EnterOTP extends Component {
  render() {
    return (
        <Content style={styles.OtpContent}>
          <Item regular>
            <Input placeholder='Enter OTP' />
          </Item>
          <Button 
            onPress={()=>this.props.navigation.navigate('WordsChain')}
            style = {styles.submitButton}
            >
            <Text>Submit</Text>
          </Button>
        </Content>
    );
  }
}

const styles = StyleSheet.create({
    submitButton:{
        backgroundColor:'#ff4326',
    },
    OtpContent:{
        margin:'10%'
    }
});