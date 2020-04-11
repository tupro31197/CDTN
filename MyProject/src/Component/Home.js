import React, { Component } from 'react';
import {
    Text, View, Image, StyleSheet
} from 'react-native';

//library imports
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { ChatScreen } from 'react-native-easy-chat-ui';


//custom components imports 
import CustomHeader from './CustomHeader';
import IconHome from '../media/appIcon/ic_home_green.png';
import IconGroup from '../media/appIcon/ic_groupchat_green.png';
import News from '../Component/News/News';
import ListGroup from './Chat/ListGroup';
import StackChat from './Chat/StackChat'

function NewsView() {
    return (
        <News />
    );
}

function StackChatView() {
    return (
        <StackChat />
    );
}

const Tab = createBottomTabNavigator();


export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedTab: 'home' };
    }

    static navigationOptions = {
        drawerIcon: (<Image source={IconHome} style={{ height: 25, width: 25 }} />)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CustomHeader title="NewsView" drawerOpen={() => this.props.navigation.navigate('DrawerOpen')} />
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: () => {
                                let iconName;

                                if (route.name === 'NewsView') {
                                    iconName = IconHome;
                                } else if (route.name === 'StackChatView') {
                                    iconName = IconGroup;
                                }

                                // You can return any component that you like here!
                                return <Image source={iconName} style={{ height: 25, width: 25 }} />;
                            },
                        })}
                        tabBarOptions={{
                            activeTintColor: '#34B089',
                            inactiveTintColor: '#191414',
                        }}
                    >
                        <Tab.Screen name="NewsView" component={NewsView} />
                        <Tab.Screen name="StackChatView" component={StackChatView} />
                    </Tab.Navigator>
                </NavigationContainer>
            </View>
        );
    }
}