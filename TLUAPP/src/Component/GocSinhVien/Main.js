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
import { ScrollView } from 'react-native-gesture-handler';

const ProfileItem = ({icon, name}) => (
  <View style={styles.itemContainer}>
    <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
    <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>{name}</Text>
    <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
  </View>
);

export default class Main extends Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.divider} />

          <Text style={{fontSize:20}}>Toàn trường</Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Thời khóa biểu toàn trường')}>
          <ProfileItem name="Thời khóa biểu toàn trường" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Lịch thi lại toàn trường')}>
          <ProfileItem name="Lịch thi lại toàn trường" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Chương trình đào tạo')}>
          <ProfileItem name="Chương trình đào tạo" />
        </TouchableOpacity>
        <Text style={{fontSize:20}}>Cá nhân:</Text>
        <ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Thông tin cá nhân')}>
          <ProfileItem name="Thông tin cá nhân" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Đăng ký học')}>
          <ProfileItem name="Đăng ký học" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Đăng ký thi lại')}>
          <ProfileItem name="Đăng ký thi lại" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Thời khóa biểu')}>
          <ProfileItem name="Thời khóa biểu" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Bảng điểm')}>
          <ProfileItem name="Bảng điểm" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Lịch thi chính thức')}>
          <ProfileItem name="Lịch thi chính thức" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Lịch thi dự kiến')}>
          <ProfileItem name="Lịch thi dự kiến" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Phiếu báo điểm')}>
          <ProfileItem name="Phiếu báo điểm" />
        </TouchableOpacity>
        </ScrollView>
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
