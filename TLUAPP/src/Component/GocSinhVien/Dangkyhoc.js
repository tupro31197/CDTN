import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
  Picker,
  Text,
} from 'react-native';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';
import { ScrollView } from 'react-native-gesture-handler';

let events_data = [];

fetch("http://192.168.188.2:8080/api/lop-hoc/thoiKhoaBieuCaNhan/A29413")
    .then((response)=>response.json())
    .then((responseJson)=>{
    	const tableDataLoaded = [];
	    for (let i = 0; i < responseJson.length; i += 1) {
	    	if (responseJson[i].thu === '2') {
	    		responseJson[i].thu = 'TUE'
	    	}else if (responseJson[i].thu === '3') {
	    		responseJson[i].thu = 'WED'
	    	}if (responseJson[i].thu === '4') {
	    		responseJson[i].thu = 'THU'
	    	}if (responseJson[i].thu === '5') {
	    		responseJson[i].thu = 'FRI'
	    	}if (responseJson[i].thu === '6') {
	    		responseJson[i].thu = 'SAT'
	    	}if (responseJson[i].thu === '7') {
	    		responseJson[i].thu = 'SUN'
	    	}
	    	const json = {
	    		title: responseJson[i].tenMon,
			    startTime: genTimeBlock(responseJson[i].thu, parseInt(responseJson[i].caBatDau)),
			    endTime: genTimeBlock(responseJson[i].thu, parseInt(responseJson[i].caKetThuc) + 1),
			    location: responseJson[i].phongHoc,
			    extra_descriptions: [responseJson[i].tenLop],
	    	}
	     	tableDataLoaded.push(json);
	    }
	    events_data = tableDataLoaded;
    });

export default class Dangkyhoc extends Component {
  constructor(props) {
    super(props);
    this.numOfDays = 6;
    this.pivotDate = genTimeBlock('TUE');
  }

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  render() {

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 0.4, backgroundColor: 'white'}}>
          <Text style={{marginTop:2}}>Đăng ký học thuộc</Text>
          <View style={styles.boxluachon}>
            <Picker enabled={false}>
              <Picker.Item label=" Chọn môn" value="test 1" />
              <Picker.Item
                label="Học kỳ III nhóm 2 -11/05/2020 9:00:00 SA - 30/05/2020 4:00:00 CH"
                value="test 1"
              />
            </Picker>
          </View>
          <View style={styles.boxluachon}>
            <Picker enabled={false}>
              <Picker.Item label=" Chọn lớp" value="test 1" />
            </Picker>
          </View>
        </View>
        <View style={styles.container}>
          <TimeTableView
            scrollViewRef={this.scrollViewRef}
            events={events_data}
            pivotTime={1}
            pivotEndTime = {11}
            pivotDate={this.pivotDate}
            numberOfDays={this.numOfDays}
            onEventPress={this.onEventPress}
            headerStyle={styles.headerStyle}
            formatDateHeader="ddd"
            locale="vi"
          />
        </View>
        {/* <View style={styles.boxluachon2}>
          <Text style={{}}>GIỜ HỌC</Text>
          <ScrollView>
          <Text>1:07h00-07h50  2:8h00-8h50   3:9h05-9h55   4:10h05-10h55   5:11h05-11h55 </Text>
          <Text>6: 7h-8h   7:8h-9h   8:9h-10h   9:10h-11h   10:11h-12h </Text>
          </ScrollView>
        </View> */}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    textAlign: 'center',
  },
  boxluachon: {
    backgroundColor: '#999999',
    borderRadius: 25,
    marginTop: 12,
  },
  boxluachon2: {
    backgroundColor: 'white',
    //borderRadius: 25,
    flex: 0.2,
    flexDirection: 'column',
    borderTopColor: 'green',
    borderTopWidth: 2,
  },
});
