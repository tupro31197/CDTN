import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  StatusBar
} from 'react-native';

//library imports 
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { Container, Content, Header, Body, Text } from 'native-base';

//custom files 
import Home from './src/Component/Home';
import Login from './src/Component/Login';
import GradeReport from './src/Component/GradeReport';
import PersonalTimeline from './src/Component/PersonalTimeline';
import Profile from './src/Component/Profile';
import Registration from './src/Component/Registration';
import SchoolTimeline from './src/Component/SchoolTimeline';

StatusBar.setHidden(true);

export default class TLUApp extends Component {

  render() {
    return (
      <MyApp />
    );
  }
}

const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={styles.drawerHeader}>
      <Body>
          <Image source={{uri: 'https://st.quantrimang.com/photos/image/072015/22/avatar.jpg'}} style={styles.drawerImage} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);

const MyApp = DrawerNavigator({

  // For each screen that you can navigate to, create a new entry like this:
  'Trang chủ': {
    screen: Home,
  },
  'Thông tin cá nhân': {
    screen: Profile
  },
  'Thời khóa biểu toàn trường': {
    screen: SchoolTimeline
  },
  'Đăng ký học': {
    screen: Registration
  },
  'Thời khóa biểu cá nhân': {
    screen: PersonalTimeline
  },
  'Bảng điểm': {
    screen: GradeReport
  },
  'Đăng xuất': {
    screen: Login
  }
},
  {
    initialRouteName: 'Trang chủ',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    contentOptions: {
      activeTintColor: '#34B089',
  }
  });


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#34B089'
  },
  drawerHeader: {
    height: 200,
    backgroundColor: '#34B089'
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    marginLeft: 50
  }
});

console.disableYellowBox = true;
