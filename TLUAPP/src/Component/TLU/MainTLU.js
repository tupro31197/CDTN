import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
export default class MainTLU extends Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor:'white', borderColor: 'black', borderWidth:3}}>
        <View style={{flex:1, backgroundColor:'white', flexDirection:'row', marginTop:3}}>
          <Image source={require('../TLU/long.jpg')} style={{height:140, width:140, borderRadius:100, marginLeft:10}} />
          <View style={{flexDirection: 'column', marginTop:30, marginLeft:15}}>
            <Text>
              Sinh Viên: <Text style={{color: 'red'}}> ĐỖ LÊ PHI LONG</Text>
            </Text>
            <Text>Mã SV: A27957</Text>
            <Text>Ngày sinh: 18/07/1997</Text>
            <Text>
              Tình trạng: <Text style={{color: 'brown'}}>Bình thường</Text>
            </Text>
          </View>
        </View>
        <View
          style={{
            marginTop: 1,
            flex: 3,
            backgroundColor: 'white',
            flexDirection: 'row',
          }}>
          <View style={{flex: 1, backgroundColor: 'blue'}}>
            <View style={{flex: 3, backgroundColor: 'yellow', alignItems:'center', justifyContent:'center'}} >
              <TouchableOpacity>
              <Icon name="book" size={40} />
              </TouchableOpacity>
              <Text>E-Learning</Text>
            </View>
            <View style={{flex: 3, backgroundColor: 'lightblue', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity>
              <Icon name="store" size={40} />
              </TouchableOpacity>
              <Text>TLU-Store</Text>
            </View>
            <View style={{flex: 3, backgroundColor: 'white'}} />
          </View>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex:3, backgroundColor:'red', alignItems:'center', justifyContent:'center'}}>
              <TouchableOpacity>
              <Icon3 name="rice" size ={40} />
              </TouchableOpacity>
              <Text>Cơm trưa VN279</Text>
            </View>
            <View style={{flex: 3, backgroundColor: 'blue', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity>
              <Icon3 name="account-group" size ={40} />
              </TouchableOpacity>
              <Text>Cộng đồng TLU</Text>
            </View>
            <View style={{flex: 3, backgroundColor: 'black'}} />
          </View>
        </View>
      </View>
    );
  }
}

//const styles = StyleSheet.create({});
