import React from 'react'
import { Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import PropTypes from 'prop-types';
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

    const currentStyles = active === true ? YesStyles : NoStyles

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.wrapper, currentStyles.view]}>
                <Text style={[styles.text, currentStyles.text]}>
                    {active === true ? 'YES' : 'NO'}
                </Text>
                <View style={[styles.toggle, currentStyles.circle]} />
            </View>
        </TouchableWithoutFeedback>
    );
}

NLToggleButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
}

const styles = StyleSheet.create({
    wrapper: {
        borderRadius: BASE_UNIT,
        height: BASE_UNIT / 2,
        width: 70,
        padding: '5%',
        justifyContent: 'center',
    },
    toggle: {
        width: BASE_UNIT,
        height: BASE_UNIT,
        borderRadius: BASE_UNIT / 2,
        backgroundColor: 'white',
        position: 'absolute',
    },
    text: {
        color: 'white'
    }
});

export default NLToggleButton;
