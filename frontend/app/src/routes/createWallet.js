import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import EnterOTP from '../components/login/EnterOTP';
import LoginChoice from '../components/login/login';
import WordsChain from '../components/login/wordsChain';


const createWalletNavigator = createStackNavigator({
    OTP : {screen: EnterOTP},
    VOTP : {screen: EnterOTP},
    WordsChain: {screen: WordsChain},
    LoginChoice: {screen: LoginChoice}
},
{
    initialRouteName:'LoginChoice',
    defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#ff4326',
        },
        headerTintColor: '#fcd6cf',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
});
  
export default createWalletNavigator;