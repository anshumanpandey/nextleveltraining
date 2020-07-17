import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import { View } from 'native-base';

const NoStyles = {
    view: { backgroundColor: 'red' },
    circle: { right: 20 / 2 },
    text: { textAlign: 'left' },
}
const YesStyles = {
    view: { backgroundColor: 'green' },
    circle: { left: 20 / 2 },
    text: { textAlign: 'right' },
}

const NLToggleButton = ({ active = false, onPress }) => {

    const currentStyles = active == true ? YesStyles : NoStyles

    return (
        <TouchableWithoutFeedback onPress={() => onPress()}>
            <View style={{ borderRadius: 20, height: 10, width: 80, padding: '5%', justifyContent: 'center', ...currentStyles.view }}>
                <Text style={{ color: 'white', ...currentStyles.text }}>{active == true ? 'YES' : 'NO'}</Text>
                <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20 / 2,
                    backgroundColor: 'white',
                    position: 'absolute',
                    ...currentStyles.circle
                }} />
            </View>
        </TouchableWithoutFeedback>
    );
}

export default NLToggleButton;
