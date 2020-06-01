import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, Picker} from 'react-native';
import {Table, TableWrapper, Row} from 'react-native-table-component';
 
export default class PhieuBaoDiem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: [
        'STT',
        'Mã môn',
        'Tên học phần',
        'Kiểu thi',
        'Điểm quá trình',
        'Điểm cộng',
        'Điểm Kn1',
        'Điểm Kn2',
        'Kết quả',
      ],
      widthArr: [30, 60, 200, 50, 50, 50, 50, 50, 50],
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
        <View
          style={{
            backgroundColor: 'white',
            height: 80,
            borderTopColor: 'green',
            borderTopWidth: 2,
          }}>
              <Text>Phiếu báo điểm thi học kỳ (dữ liệu điểm mỗi học kỳ chỉ có sau kỳ thi kết thúc học kỳ).</Text>
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
            <Text><Text style={{color: 'red'}}>Phiếu điểm:</Text> Học kỳ II nhóm 2 năm 2019 - 2020</Text>
            <Text>Mã SV:A27957 - Đỗ Lê Phi Long - TE28e1</Text>
        </View>
        <View style={{flex:10, marginTop:100}}>
        <ScrollView horizontal={true}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {tableData.map((rowData, index) => (
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
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
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
  },
});
