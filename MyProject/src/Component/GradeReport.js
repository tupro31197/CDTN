import React, { Component } from 'react';
import {
    Text, View, Image, StyleSheet, TouchableOpacity
} from 'react-native';

//library imports
import { DataTable } from 'react-native-paper';

//custom components imports 
import IconBack from '../media/appIcon/back_white.png';
import IconGradeReport from '../media/appIcon/ic_grade_green.png';

export default class GradeReport extends Component {

    static navigationOptions = {
        drawerIcon: (
            <Image source={IconGradeReport}
                style={{ height: 25, width: 25 }} />
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
                    <Text style={headerTitle}>Bảng điểm</Text>
                    <View />
                </View>
                <View style={body}>
                    <DataTable>
                        <DataTable.Header>
                            <DataTable.Title>Dessert</DataTable.Title>
                            <DataTable.Title numeric>Calories</DataTable.Title>
                            <DataTable.Title numeric>Fat</DataTable.Title>
                        </DataTable.Header>

                        <DataTable.Row>
                            <DataTable.Cell>Frozen yogurt</DataTable.Cell>
                            <DataTable.Cell numeric>159</DataTable.Cell>
                            <DataTable.Cell numeric>6.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Row>
                            <DataTable.Cell>Ice cream sandwich</DataTable.Cell>
                            <DataTable.Cell numeric>237</DataTable.Cell>
                            <DataTable.Cell numeric>8.0</DataTable.Cell>
                        </DataTable.Row>

                        <DataTable.Pagination
                            page={1}
                            numberOfPages={3}
                            onPageChange={(page) => { console.log(page); }}
                            label="1-2 of 6"
                        />
                    </DataTable>
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