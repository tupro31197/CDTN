import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import StackGocSinhvien from './src/Component/GocSinhVien/Stack';
import ChatStack from './src/Component/Chat/StackChat';
import StackNews from './src/Component/News/StackNews';
import StackCaiDat from './src/Component/CaiDat/StackCaiDat';
import StackSTLU from './src/Component/TLU/StackSTLU';
const Stack = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="TLU"
        tabBarOptions={{
          activeTintColor: '#157cdb',
          inactiveTintColor: '#262626',
        }}>
        <Stack.Screen
          name="Home"
          component={StackNews}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="newspaper-o" size={26} color={color} />
            ),
          }}
        />
        <Stack.Screen
          name="Góc sinh viên"
          component={StackGocSinhvien}
          options={{
            tabBarIcon: ({color}) => (
              <Icon3 name="school" size={26} color={color} />
            ),
          }}
        />
        <Stack.Screen
          name="TLU"
          component={StackSTLU}
          options={{
            tabBarIcon: ({color}) => (
              <Icon3 name="apps" size={26} color={color} />
            ),
          }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatStack}
          options={{
            tabBarIcon: ({color}) => (
              <Icon name="wechat" size={26} color={color} />
            ),
          }}
        />
        <Stack.Screen
          name="Cài đặt"
          component={StackCaiDat}
          options={{
            tabBarIcon: ({color}) => (
              <Icon3 name="settings" size={26} color={color} />
            ),
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
