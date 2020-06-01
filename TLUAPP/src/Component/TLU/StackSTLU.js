import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import MainTLU from './MainTLU';

const Stack = createStackNavigator();

export default class StackSTLU extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="News"
          component={MainTLU}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    );
  }
}
