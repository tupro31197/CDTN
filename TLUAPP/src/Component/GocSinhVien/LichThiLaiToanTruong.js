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

export default class LichThiLaiToanTruong extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ChatView')}>
          <Text> ĐANG TRIỂN KHAI....</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
