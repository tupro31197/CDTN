import React, {Component} from 'react';
import {View, Text} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Main from './Main';
import Thongtincanhan from './Thongtincanhan';
import Lichthichinhthuc from './Lichthichinhthuc';
import Lichthidukien from './Lichthidukien';
import Dangkyhoc from './Dangkyhoc';
import Bangdiem from './Bangdiem';
import Thoikhoabieu from './Thoikhoabieu';
import Dangkythilai from './Dangkythilai';
import PhieuBaoDiem from './PhieuBaoDiem';
import TKBToanTruong from './ThoiKhoaBieuToanTruong';
import LichThiLaiToanTruong from './LichThiLaiToanTruong';
import ChuongTrinhDaoTao from './ChuongTrinhDaoTao';
const Stack = createStackNavigator();

export default class StackGocSinhvien extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Góc Sinh Viên" component={Main} />
        <Stack.Screen name="Thông tin cá nhân" component={Thongtincanhan} />
        <Stack.Screen name="Lịch thi chính thức" component={Lichthichinhthuc} />
        <Stack.Screen name="Lịch thi dự kiến" component={Lichthidukien} />
        <Stack.Screen name="Đăng ký học" component={Dangkyhoc} />
        <Stack.Screen name="Bảng điểm" component={Bangdiem} />
        <Stack.Screen name="Thời khóa biểu" component={Thoikhoabieu} />
        <Stack.Screen name="Đăng ký thi lại" component={Dangkythilai} />
        <Stack.Screen name="Phiếu báo điểm" component={PhieuBaoDiem} />
        <Stack.Screen
          name="Thời khóa biểu toàn trường"
          component={TKBToanTruong}
        />
        <Stack.Screen
          name="Lịch thi lại toàn trường"
          component={LichThiLaiToanTruong}
        />
        <Stack.Screen
          name="Chương trình đào tạo"
          component={ChuongTrinhDaoTao}
        />
      </Stack.Navigator>
    );
  }
}
