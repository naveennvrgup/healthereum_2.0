// @flow
import React from "react";
import { createStackNavigator, createDrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import BlankPage from "./container/BlankPageContainer";

const App = createStackNavigator(
  {
    BlankPage: { screen: BlankPage }
  },
  {
    initialRouteName: "BlankPage",
    headerMode: "none"
  }
);

export default () => (
  <Root>
    <App />
  </Root>
);
