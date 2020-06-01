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
import ManChinh from './ManChinh-CaiDat';
import ThongBao from './ThongBao';
import NgonNguVaPhongChu from './NgonNguVaPhongChu';


const Stack = createStackNavigator();

export default class StackCaiDat extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Cài đặt" component={ManChinh} />
        <Stack.Screen name="Thông báo" component={ThongBao} />
        <Stack.Screen
          name="Ngôn ngữ và phông chữ"
          component={NgonNguVaPhongChu}
        />
      </Stack.Navigator>
    );
  }
}