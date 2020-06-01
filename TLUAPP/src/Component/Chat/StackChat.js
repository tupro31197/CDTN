import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  StyleSheet,
} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import ListGroup from './ListGroup';
import Chat from './Chat';


const Stack = createStackNavigator();

export default class ChatStack extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="ChatView">
        <Stack.Screen name="ListGroupView" component={ListGroup} options={{ headerShown: false }} />
        <Stack.Screen name="ChatView" component={Chat} options={{ tabBarVisible: false }} options={{ headerShown: false }} />
      </Stack.Navigator>
    );
  }
}