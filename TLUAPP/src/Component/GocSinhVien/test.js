import React, { Component } from 'react';
import {StyleSheet,Text, View, Picker} from 'react-native';
import Timeline from 'react-native-timeline-feed';

export default class Example extends Component {
  constructor(){
    super()
    this.state = {
    	data: [],
    	dataPicker: [], 
    	dataYear: [],
    	semester: '',
    	year: ''
    }
  }

  updateSemester = (semester) => {
  	this.setState({semester: semester});
    fetch("http://192.168.0.102:8080/api/teacher/timelineMobile/5d9b41827885e9948f870119/" + semester)
  	.then((response)=>response.json())
  	.then((responseJson)=>{
	    this.setState ({
	    	data: responseJson
	    })
  	});
   }

   updateYear = (year) => {
   	this.setState({year: year});
   	fetch("http://192.168.0.102:8080/api/semester/getListSemesterMobile/" + year)
  	.then((response)=>response.json())
  	.then((responseJson)=>{
	    this.setState ({
	    	dataPicker: responseJson
	    })
	    fetch("http://192.168.0.102:8080/api/teacher/timelineMobile/5d9b41827885e9948f870119/" + this.state.dataPicker[0]._id)
	  	.then((response)=>response.json())
	  	.then((responseJson)=>{
	    this.setState ({
	    	data: responseJson
	    })
  		});
  	});
   }

   getData(semester) {
   	fetch("http://192.168.0.102:8080/api/teacher/timelineMobile/5d9b41827885e9948f870119/" + semester)
  	.then((response)=>response.json())
  	.then((responseJson)=>{
	    this.setState ({
	    	data: responseJson
	    })
  	});

  	fetch("http://192.168.0.102:8080/api/semester/getAllYearMobile")
  	.then((response)=>response.json())
  	.then((responseJson)=>{
	    this.setState ({
	    	dataYear: responseJson
	    })
	    fetch("http://192.168.0.102:8080/api/semester/getListSemesterMobile/" + this.state.dataYear[0].year)
	  	.then((response)=>response.json())
	  	.then((responseJson)=>{
	    this.setState ({
	    	dataPicker: responseJson
	    })
  		});
  	});

   }

   componentDidMount() {
   	this.getData();
   }

  render() {
  	const data = this.state.data;
  	const dataPicker = this.state.dataPicker;
  	const dataYear = this.state.dataYear;
  	 
    return (
      <View style={styles.container}>
      		<Picker selectedValue = {this.state.year} onValueChange = {this.updateYear}>
		    {dataYear.map((item, index) => {
		        return (<Picker.Item label={item.label} value={item.year} key={index}/>) 
		    })}
			</Picker>
      		<Picker selectedValue = {this.state.semester} onValueChange = {this.updateSemester}>
		    {dataPicker.map((item, index) => {
		        return (<Picker.Item label={item.name} value={item._id} key={index}/>) 
		    })}
			</Picker>
        <Timeline 
          innerCircle={'dot'}
          style={styles.list}
          data={data}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13, height: 30}}
          descriptionStyle={{color:'gray'}}
          options={{
            style:{paddingTop:5}
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
		paddingTop:30,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:20,
  },
});