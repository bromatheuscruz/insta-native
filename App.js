import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './src/screens/Login';
import Feed from './src/screens/Feed';

const stackNavigator = createStackNavigator(
  {
    Login: { screen: Login },
    Feed: { screen: Feed }
  }
);

const AppContainer = createAppContainer(stackNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}