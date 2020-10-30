import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Colors from '../constants/color';

const CalendarRules = ({ text, style }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', backgroundColor: "white", paddingBottom: '3%' }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: Colors.s_blue, textAlign: 'center' }}>Not available</Text>
                <View style={{ backgroundColor: 'red', height: 40, width: 40 }}></View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ color: Colors.s_blue, textAlign: 'center' }}>Partial Booked</Text>
                <View style={{ backgroundColor: Colors.s_blue, height: 40, width: 40 }}></View>
            </View>
        </View>
    );
}

export default CalendarRules;


