import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, Picker} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
 
export default class TBKToanTruong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        'STT',
        'Mã môn',
        'Tên môn',
        'Tên lớp',
        'Thứ',
        'Ca',
        'TC',
        'Giáo viên',
      ],
      widthArr: [30, 60, 200, 100, 35, 40, 30, 130],
    }
  }
 
  render() {
    const state = this.state;
    const tableData = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }
 
    return (
      <View style={styles.container}>
        <View style={{backgroundColor:'white', height:140}}> 
        <View style={styles.boxluachon}>
          <Picker>
              <Picker.Item label="Chọn năm học" value="test 1" />
              <Picker.Item
                label="Học kỳ III nhóm 2 -11/05/2020 9:00:00 SA - 30/05/2020 4:00:00 CH"
                value="test 1"
              />
            </Picker> 
          </View>
          <View style={styles.boxluachon}>
          <Picker>
              <Picker.Item label="Chọn học kì" value="test 1" />
              <Picker.Item
                label="Học kỳ III nhóm 2 -11/05/2020 9:00:00 SA - 30/05/2020 4:00:00 CH"
                value="test 1"
              />
            </Picker> 
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    //paddingTop: 30,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  header: {height: 50, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: '100'},
  dataWrapper: {marginTop: -1},
  row: {height: 40, backgroundColor: '#E7E6E1'},
  boxluachon: {
    backgroundColor: '#999999',
    borderRadius: 25,
    marginTop: 12,
  },
});
