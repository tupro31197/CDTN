import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import News from './News';

const Stack = createStackNavigator();

export default class StackNews extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="News" component={News} />
      </Stack.Navigator>
    );
  }
}
