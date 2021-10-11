import React from 'react'
import { Text, TouchableOpacity, StyleSheet, ViewPropTypes, TextPropTypes } from 'react-native'
import { View, Spinner } from 'native-base';
import PropTypes from 'prop-types';
import Color from 'color';
import Colors from '../constants/color';
import dimensions from '../constants/dimensions';

const NLButton = ({ value, onPress, disabled, color, style = {}, textStyles = {}, variant, loading }) => {
    let backgroundColor = color;
    if (variant === "secondary") {
        backgroundColor = Colors.s_blue
    }

    const isLoading = () => loading === true
    const btnIsDisabled = () => disabled === true || isLoading()

    return (
        <TouchableOpacity
            disabled={btnIsDisabled()}
            style={[styles.level_btn_coach, { backgroundColor: btnIsDisabled() ? Color(backgroundColor).fade(0.5) : backgroundColor }, { ...style }]}
            onPress={() => onPress()}
        >
            <View style={styles.level_btn_player_view}>
                <Text adjustsFontSizeToFit style={[styles.level_player_text, { color: btnIsDisabled() ? '#ffffff80' : 'white' }, textStyles]}>
                    {value}
                </Text>
                {isLoading() && <Spinner style={{ paddingLeft: 8 }} color="white" size={25} />}
            </View>
        </TouchableOpacity>
    )
}

NLButton.propTypes = {
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    color: PropTypes.string,
    variant: PropTypes.string,
    loading: PropTypes.bool,
    onPress: PropTypes.func.isRequired,
    style: ViewPropTypes,
    textStyles: TextPropTypes
}

NLButton.defaultProps = {
    style: {},
    textStyles: {},
    disabled: false,
    loading: false,
    color: Colors.nl_yellow,
    variant: undefined
}

const styles = StyleSheet.create({
    level_btn_coach: {
        height: dimensions.px50,
        borderRadius: 25
    },
    level_btn_player_view: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
    },
    level_player_text: {
        fontSize: 18,
        color: 'white',
        fontWeight: '500',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
})


export default NLButton;
