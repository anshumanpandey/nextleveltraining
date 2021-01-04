import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import { View } from 'native-base';

const BASE_UNIT = 15

const NoStyles = {
    view: { backgroundColor: 'red' },
    circle: { right: BASE_UNIT / 2 },
    text: { textAlign: 'left' },
}
const YesStyles = {
    view: { backgroundColor: 'green' },
    circle: { left: BASE_UNIT / 2 },
    text: { textAlign: 'right' },
}

const NLToggleButton = ({ active = false, onPress }) => {

    const currentStyles = active == true ? YesStyles : NoStyles

    return (
        <TouchableWithoutFeedback onPress={() => onPress()}>
            <View style={{ borderRadius: BASE_UNIT, height: BASE_UNIT / 2, width: 70, padding: '5%', justifyContent: 'center', ...currentStyles.view }}>
                <Text style={{ color: 'white', ...currentStyles.text }}>{active == true ? 'YES' : 'NO'}</Text>
                <View style={{
                    width: BASE_UNIT,
                    height: BASE_UNIT,
                    borderRadius: BASE_UNIT / 2,
                    backgroundColor: 'white',
                    position: 'absolute',
                    ...currentStyles.circle
                }} />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default NLToggleButton;
