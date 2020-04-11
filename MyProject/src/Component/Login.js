import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableHighlight,
    Image,
    Alert
} from 'react-native';
import IconLogOut from '../media/appIcon/ic_signout_green.png';
import IconTlu from '../media/temp/tlu.jpg';
import IconAccount from '../media/temp/account.png';
import IconPassword from '../media/temp/password.png';

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
      }
    }

    static navigationOptions =  {
        drawerIcon: (
            <Image source={IconLogOut} 
            style={{height: 22, width: 22, marginLeft: 5}} />
        )
    }
  
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.logoTlu}>
            <Image style={styles.logoTluIcon} source={IconTlu}/>
          </View>
  
        
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={IconAccount}/>
            <TextInput style={styles.inputs}
                placeholder="Account"
                underlineColorAndroid='transparent'
                onChangeText={(email) => this.setState({email})}/>
          </View>
          
          <View style={styles.inputContainer}>
            <Image style={styles.inputIcon} source={IconPassword}/>
            <TextInput style={styles.inputs}
                placeholder="Password"
                secureTextEntry={true}
                underlineColorAndroid='transparent'
                onChangeText={(password) => this.setState({password})}/>
          </View>
  
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() =>  this.props.navigation.navigate('Trang chủ')}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableHighlight>
  
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#DCDCDC',
    },
    logoTlu: {
      width: 120,
      height: 120,
      marginBottom:40,
      flexDirection: 'row',
      alignItems: 'center'
    },
    logoTluIcon: {
      width:120,
      height:120,
      borderRadius:120,
      justifyContent: 'center'
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:30,
        borderBottomWidth: 1,
        width:250,
        height:45,
        marginBottom:20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs:{
        height:45,
        marginLeft:16,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:25,
      height:25,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:20,
      width:250,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#555555",
    },
    loginText: {
      color: 'white',
    }
  });