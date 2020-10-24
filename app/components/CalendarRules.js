import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/color';

const CalendarRules = ({ text, style }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: Colors.s_blue, paddingBottom: '3%' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>No available</Text>
                <View style={{ backgroundColor: 'red', height: 40, width: 40 }}></View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Partial Booked</Text>
                <View style={{ backgroundColor: 'orange', height: 40, width: 40 }}></View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: 'white', textAlign: 'center' }}>Partial Booked</Text>
                <View style={{ backgroundColor: 'white', height: 40, width: 40 }}></View>
            </View>
        </View>
    );
}

export default CalendarRules;


