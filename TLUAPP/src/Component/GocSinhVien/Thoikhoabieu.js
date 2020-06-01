import React, {Component} from 'react';
import {SafeAreaView, StyleSheet, View, Alert, Text, Picker} from 'react-native';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';

let events_data = [];

fetch("http://192.168.50.108:8080/api/employee/getSchedule/5e9c57b560d8a23e59699981/5e9295c049dc3d05f638ff75")
    .then((response)=>response.json())
    .then((responseJson)=>{
    	const tableDataLoaded = [];
	    for (let i = 0; i < responseJson.length; i += 1) {
	    	if (responseJson[i].dayOfWeek === '2') {
	    		responseJson[i].dayOfWeek = 'MON'
	    	}else if (responseJson[i].thu === '3') {
	    		responseJson[i].dayOfWeek = 'TUE'
	    	}if (responseJson[i].dayOfWeek === '4') {
	    		responseJson[i].dayOfWeek = 'WED'
	    	}if (responseJson[i].dayOfWeek === '5') {
	    		responseJson[i].dayOfWeek = 'THU'
	    	}if (responseJson[i].dayOfWeek === '6') {
	    		responseJson[i].dayOfWeek = 'FRI'
	    	}if (responseJson[i].dayOfWeek === '7') {
	    		responseJson[i].dayOfWeek = 'SAT'
            }
            if (responseJson[i].dayOfWeek === '1') {
	    		responseJson[i].dayOfWeek = 'SUN'
	    	}
	    	const json = {
	    		title: responseJson[i].lessonName,
			    startTime: genTimeBlock(responseJson[i].dayOfWeek, parseInt(responseJson[i].startShift)),
			    endTime: genTimeBlock(responseJson[i].dayOfWeek, parseInt(responseJson[i].endShift) + 1),
			    location: responseJson[i].roomName
			    // extra_descriptions: [responseJson[i].tenLop],
	    	}
	     	tableDataLoaded.push(json);
	    }
	    events_data = tableDataLoaded;
    });

    

export default class Thoikhoabieu extends Component {
  constructor(props) {
    super(props);
    this.numOfDays = 7;
    this.pivotDate = genTimeBlock('MON');
    this.state = {
    	dataSemester: [], 
    	dataYear: [],
    	year: ''
    }
  }

  componentDidMount() {
    fetch('http://192.168.50.108:8080/api/semester/getAllYear')
    .then(response => response.json())
    .then(responseJson => {
        this.setState ({
	    	dataYear: responseJson
        })
        fetch("http://192.168.50.108:8080/api/semester/getListSemester/" + this.state.dataYear[0].year)
        .then((response)=>response.json())
        .then((responseJson)=>{
            console.log(responseJson);
            this.setState ({
                dataSemester: responseJson,
            })
        });
      });
    }

  

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  render() {
    const dataSemester = this.state.dataSemester;
    const dataYear = this.state.dataYear;
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <View style={styles.boxluachon}>
          <Picker style={{flex:5}} selectedValue = {this.state.year} >
            {dataYear.map((item, index) => {
		        return (<Picker.Item label={"Năm học " + item.year} value={item.year} key={index}/>) 
		    })}   
          </Picker>
          <View style={{flex:2,backgroundColor:'red'}}></View>
          <Picker style={{flex:5}} selectedValue = {this.state.semester}>
		    {dataSemester.map((item, index) => {
		        return (<Picker.Item label={"Học kì " + item.name + " nhóm " + item.group} value={item._id} key={index}/>) 
		    })}
			</Picker>
        </View> */}
        <View style={{backgroundColor:'white',flex:1.8}}>
          <Text style={{fontSize:18}}>Thời khóa biểu cá nhân theo kỳ. Sinh viên sử dụng chức năng này để kiểm tra kết quả đăng ký học.</Text>
          <View style={styles.boxluachon}>
          <Picker>
              <Picker.Item label="Chọn học kỳ" value="test 1" />
              <Picker.Item
                label="Học kỳ III nhóm 2 -11/05/2020 9:00:00 SA - 30/05/2020 4:00:00 CH"
                value="test 1"
              />
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
        <View style={styles.boxluachon2}>
          <Text style={{}}>GIỜ HỌC</Text>
          <Text>1: 7h-8h   2:8h-9h   3:9h-10h   4:10h-11h   5:11h-12h </Text>
          <Text>6: 7h-8h   7:8h-9h   8:9h-10h   9:10h-11h   10:11h-12h </Text>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8',
  },
  container: {
    flex: 6,
    backgroundColor: '#F8F8F8',
    textAlign: 'center',
    padding: 3,
  },
  boxluachon: {
    backgroundColor: '#999999',
    borderRadius: 25,
    marginTop: 12,
  },
  boxluachon2: {
    backgroundColor: 'white',
    //borderRadius: 25,
    flex: 1,
    flexDirection: 'column',
    borderTopColor: 'green',
    borderTopWidth: 2,
  },
});
