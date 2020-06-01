import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Picker,
  ScrollView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileItem = ({icon, name, cathi}) => (
  <View
    style={{marginBottom: 2, backgroundColor: 'white', flexDirection: 'row'}}>
    <MaterialCommunityIcons name={icon} size={40} color="black" />
    <View style={{marginLeft:10}}>
      <Text style={[styles.itemText, {marginLeft: icon ? 0 : 0}]}>{name}</Text>
      <Text style={styles.cathi}>{cathi}</Text>
    </View>
  </View>
);

export default class Lichthichinhthuc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerSelection: 'Mac dinh',
    };
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <View style={styles.divider} />
        <View style={styles.bodycontainer}>
          <View style={styles.boxtren}>
            <Text>Mời bạn chọn </Text>
            <View style={styles.boxluachon}>
              <Picker
                selectedValue={this.state.pickerSelection}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({lauguage: itemValue})
                }>
                <Picker.Item label="Học kỳ 1 nhóm 1 -2019" value="test 1" />
                <Picker.Item label="Học kỳ 1 nhóm 2 -2019" value="test 1" />
                <Picker.Item label="Học kỳ 1 nhóm 3 -2019" value="test 1" />
                <Picker.Item label="Học kỳ 2 nhóm 1 -2019" value="test 1" />
                <Picker.Item label="Học kỳ 2 nhóm 2 -2019" value="test 1" />
                <Picker.Item label="Học kỳ 2 nhóm 3 -2019" value="test 1" />
              </Picker>
            </View>
            <View style={styles.divider} />
            <View style={styles.boxhienthilichthi}>
              <Text>Lịch thi chính thức: </Text>
              <ScrollView>
                <ProfileItem
                  icon="database-settings"
                  name="Cơ sở dữ liệu phân tán"
                  cathi="Ngày 20/7/2020 "
                />
                <ProfileItem
                  icon="language-java"
                  name="Lập trình java"
                  cathi=" Ca1 Ngày: 05/7/2020"
                />
                <ProfileItem
                  icon="database"
                  name="Cơ sở dữ liệu"
                  cathi=" Ca 2 Ngày 05/07-2020"
                />
                <ProfileItem
                  icon="language-python"
                  name="Lập trình hướng đối tượng"
                  cathi="Ngày 20/7/2020 "
                />
                <ProfileItem
                  icon="language-python"
                  name="Ngôn ngữ lập trình"
                  cathi=" Ca1 Ngày: 05/7/2020"
                />
                <ProfileItem
                  icon="internet-explorer"
                  name="Mạng máy tinh"
                  cathi=" Ca 2 Ngày 05/07-2020"
                />
              </ScrollView>
            </View>
          </View>
          <View style={styles.boxduoi}>
            <ScrollView>
              <Text style={{borderColor:'black',fontSize:20}}>Chú ý</Text>
              <Text>
                {' '}
                + Sinh viên vào phòng thi phải đem theo THẺ SINH VIÊN và <Text style={{color: 'red'}}>
                Giấy chứng minh nhân dân(Quy định mới)
              </Text>
              </Text>
              <Text>
                {' '}
                + Những môn vừa thi viết và thi trên máy,sinh viên cần xem lịch
                thi chung để biết ngày thi trến máy.Sinh viên tự sắp xếp thời
                gian thi vấn đáp và thi trên máy để không bị trùng với môn thi
                khác trong cùng ngày của mình
              </Text>
              <Text>
                {' '}
                + Những sinh viên bị trùng ca thi của những môn học đi và học
                lại cần đến phòng giáo vụ đăng ký thi trùng ca trước thi kỳ thi
                chính thức bắt đầu.
              </Text>
              <Text>
                {' '}
                + Đối với môn Tiếng Anh, sau khi thi viết và nghe, Sinh viên
                phải ở lại để thi nói.
              </Text>
              <Text>
                {' '}
                + Đối với môn Giáo dục thể chất, xem lịch thi phân ca thi tại bộ
                môn.
              </Text>
              <Text>
                Ca 1: Từ 7h15 đến 8h45 Ca 2: Từ 9h30 đến 11h00 Ca 3: Từ 13h15
                đến 14h45 Ca 4: Từ 15h30 đến 17h00 Ca 5: Từ 17h20
              </Text>
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 10,
  },
  screenContainer: {
    flex: 1,
  },
  bodycontainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1e88e5',
    marginBottom: 10,
    borderWidth: 5,
    borderColor: 'white',
    borderRadius: 10,
  },
  boxluachon: {
    backgroundColor: '#999999',
    borderRadius: 25,
  },
  boxtren: {
    flex: 2,
    backgroundColor: 'white',
    fontSize: 500,
    paddingHorizontal: 5,
    paddingVertical: 0,
    marginTop: 0,
  },
  boxduoi: {
    flex: 0.6,
    backgroundColor: 'white',
    fontSize: 200,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 5,
    borderTopColor: 'green',
    borderTopWidth: 0,
  },
  inputText1: {
    color: '#969696',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '500',
  },
  boxhienthilichthi: {
    backgroundColor: 'white',
    marginBottom: 0,
    flexDirection: 'column',
    flex: 1,
  },
  cathi: {
    flex: 1,
    color: 'black',
    fontSize: 15,
  },
  itemText: {
    flex: 1,
    color: 'black',
    fontSize: 20,
  },
});
