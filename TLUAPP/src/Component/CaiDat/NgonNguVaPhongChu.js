import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
    <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
    <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
  </View>
);

export default class NgonNguVaPhongChu extends Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.divider} />
        <TouchableOpacity>
          <ProfileItem name="Thay đổi ngôn ngữ" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileItem name="Thay đổi phông chữ" />
        </TouchableOpacity>
        <TouchableOpacity>
          <ProfileItem name="Thay đổi kích thước văn bản" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      paddingTop: 50,
      paddingBottom: 4,
      backgroundColor: '#1e88e5',
      justifyContent: 'space-between',
    },
    inputText: {
      color: '#969696',
      fontSize: 14,
      marginLeft: 8,
      fontWeight: '500',
    },
    itemContainer: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      paddingHorizontal: 20,
      paddingVertical: 10,
      alignItems: 'center',
    },
    itemText: {
      flex: 1,
      color: '#1e1e1e',
    },
    divider: {
      height: 10,
    },
  });
