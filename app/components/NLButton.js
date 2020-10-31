import React, { Component } from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { View } from 'native-base';
import Colors from '../constants/color';
import dimensions from '../constants/dimensions';
import Color from 'color';

const NLButton = ({ value, onPress, disabled = false, color = Colors.nl_yellow, style = {} }) => {

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[styles.level_btn_coach, { backgroundColor: disabled ? Color(color).lighten(0.1): color}, { ...style } ]}
            onPress={() => onPress()}
        >
            <View style={styles.level_btn_player_view}>
                <Text adjustsFontSizeToFit style={[styles.level_player_text, { color: disabled ? '#ffffff80': 'white'}]}>{value}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    level_btn_coach:{
        height:dimensions.px50,
        borderRadius:25
    },
    level_btn_player_view:{
        alignItems: 'center',
        display:'flex',
        flexDirection:'row',
        justifyContent:'center',
        width: '100%',
        height: '100%',
    },
    level_player_text:{
        fontSize:18,
        color:'white',
        fontWeight:'500',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
})


export default NLButton;
