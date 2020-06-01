import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
export default class Thongtincanhan extends Component {
  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.divider} />
        <View style={styles.bodycontainer}>
          <View style={styles.box1}>
            <Text>Mã Sinh viên:</Text>
            <Text>Họ tên:</Text>
            <Text>Ngày sinh:</Text>
            <Text>Lớp:</Text>
            <Text>Giáo viên chủ nhiệm:</Text>
            <Text>Điện thoại:</Text>
            <Text>Email SV:</Text>
            <Text>Địa chỉ hộ khẩu:</Text>
            <Text>Chỗ ở hiện nay</Text>
            <TouchableOpacity>
              <Text> chuyen trang</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.box2}>
            <Text>A27957</Text>
            <Text>Đỗ Lê Phi Long</Text>
            <Text>18/07/1997</Text>
            <Text>TE28</Text>
            <Text>Đinh Thu Khánh</Text>
            <Text>0393633860</Text>
            <Text>dolephilong@gmail.com</Text>
            <Text>Trống</Text>
            <Text>Trống</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  divider: {
    height: 10,
  },
  bodycontainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  box1: {
    flex: 2,
    color: 'red',
    fontSize: 500,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
  },
  box2: {
    flex: 3,
    backgroundColor: '#1e88e5',
    fontSize: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
  },
});
