import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, Image, Dimensions, TextInput, StyleSheet
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';

import Chat from './Chat';
import ListGroup from './ListGroup';

const Stack = createStackNavigator();

export default class ChatStack extends Component {
    render() {
        return (
            <Stack.Navigator>
                <Stack.Screen name="ListGroupView" component={ListGroup} options={{ headerShown: false }} />
                <Stack.Screen name="ChatView" component={Chat} options={{ tabBarVisible: false }} options={{ headerShown: false }} />
            </Stack.Navigator>
        );
    }
}