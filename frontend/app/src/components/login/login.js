import React, { Component } from 'react';
import { Container, View, Header, Content, Button, Text } from 'native-base';
import { StyleSheet, Image, EdgeInsetsPropType } from 'react-native';

export default class LoginChoice extends Component {
    
    render() {
        const navigator = this.props.navigation.navigate;
        return (
            <View styles={styles.loginPage}>
                <View style={styles.loginButton}>
                    <Button full light>
                        <Text onPress={()=>navigator('OTP')}>Add Account</Text>
                    </Button>
                    <Button full success>
                        <Text onPress={()=>navigator('OTP')}>Import Account</Text>
                    </Button>
                </View>
            </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
      loginButton:{
      },
      loginPage:{
          justifyContent:'space-between',
          flexDirection:"column",
          flex:1,
      },
      ImageStyle:{
          height: '20%',
          width:'20%'
        }
  });