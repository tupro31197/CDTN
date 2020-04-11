import React, { Component } from 'react';
import {
    Text, View, Image, StyleSheet, TouchableOpacity, TextInput
} from 'react-native';

//library imports

//custom components imports 
import IconProfile from '../media/appIcon/ic_profile_green.png';
import IconBack from '../media/appIcon/back_white.png';

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtName: 'Đặng Anh Tú',
            txtClass: 'TI29G2',
            txtEmail: 'tuda@gmail.com',
            txtPhone: '0965445197',
            txtAddress: 'Hà Nội',
            txtDob: '31/01/1997'
        };
    }

    static navigationOptions = {
        drawerIcon: (
            <Image source={IconProfile}
                style={{ height: 25, width: 25 }} />
        )
    }

    render() {
        const {
            wrapper, header, headerTitle, backIconStyle, body,
            signInContainer, signInTextStyle, textInput
        } = styles;
        const { txtName, txtClass, txtEmail, txtPhone, txtAddress, txtDob } = this.state;
        return (
            <View style={wrapper}>
                <View style={header}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
                        <Image source={IconBack} style={backIconStyle} />
                    </TouchableOpacity>
                    <Text style={headerTitle}>Thông tin cá nhân</Text>
                    <View />
                </View>
                <View style={body}>
                    <TextInput
                        style={textInput}
                        autoCapitalize="none"
                        value={txtName}
                        editable={false}
                        onChangeText={txtName => this.setState({ ...this.state, txtName })}
                    />
                    <TextInput
                        style={textInput}
                        autoCapitalize="none"
                        value={txtClass}
                        onChangeText={txtClass => this.setState({ ...this.state, txtName })}
                    />
                    <TextInput
                        style={textInput}
                        autoCapitalize="none"
                        value={txtEmail}
                        onChangeText={txtEmail => this.setState({ ...this.state, txtName })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your name"
                        autoCapitalize="none"
                        value={txtPhone}
                        onChangeText={txtPhone => this.setState({ ...this.state, txtName })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your address"
                        autoCapitalize="none"
                        value={txtAddress}
                        onChangeText={txtAddress => this.setState({ ...this.state, txtAddress })}
                    />
                    <TextInput
                        style={textInput}
                        placeholder="Enter your phone number"
                        autoCapitalize="none"
                        value={txtDob}
                        onChangeText={txtDob => this.setState({ ...this.state, txtPhone })}
                    />
                    <TouchableOpacity style={signInContainer}>
                        <Text style={signInTextStyle}>CHANGE YOUR INFOMATION</Text>
                    </TouchableOpacity>
                    <View style={{ height: 20 }} />
                    <TouchableOpacity style={signInContainer}>
                        <Text style={signInTextStyle}>Save</Text>
                    </TouchableOpacity>
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
    textInput: {
        height: 45,
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        fontFamily: 'Avenir',
        paddingLeft: 20,
        borderRadius: 20,
        marginBottom: 20,
        borderColor: '#4267B2',
        borderWidth: 1
    },
    signInTextStyle: {
        color: '#FFF', fontFamily: 'Avenir', fontWeight: '600', paddingHorizontal: 20
    },
    signInContainer: {
        marginHorizontal: 20,
        backgroundColor: '#4267B2',
        borderRadius: 20,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 250,
    },
    signInStyle: {
        flex: 3,
        marginTop: 50
    }
});
