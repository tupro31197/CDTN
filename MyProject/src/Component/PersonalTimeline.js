import React, { Component } from 'react';
import {
    Text, View, Image, StyleSheet, TouchableOpacity
} from 'react-native';

//library imports

//custom components imports 
import IconTimetable from '../media/appIcon/ic_timetable_green.png';
import IconBack from '../media/appIcon/back_white.png';

export default class PersonalTimeline extends Component {

    static navigationOptions =  {
        drawerIcon: (
            <Image source={IconTimetable} 
            style={{height: 25, width: 25}} />
        )
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body
        } = styles;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Image source={IconBack} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>Thời khóa biểu cá nhân</Text>
                    <View />
                </View>
                <View style={body}>
                
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, backgroundColor: '#fff' },
    header: { flex: 1, backgroundColor: '#4267B2', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 10 },// eslint-disable-line
    headerTitle: { fontFamily: 'Avenir', color: '#fff', fontSize: 20 },
    backIconStyle: { width: 30, height: 30 },
    body: { flex: 10, backgroundColor: '#DCDCDC', justifyContent: 'center' },
});