import React, { Component, useRef, useEffect } from 'react'
import { StyleSheet, View, Linking, ImageBackground } from 'react-native'
import UserTypeFactory from '../../utils/UserTypeFactory';
import { useGlobalState } from '../../state/GlobalState';
import NLButton from '../../components/NLButton';
import NavigationService from '../../navigation/NavigationService';
const CoachHelpBackground = require('../../assets/images/CoachHelpBackground.jpeg')
const PlayerHelpBackground = require('../../assets/images/PlayerHelpBackground.jpeg')

const HelpScreen = (props) => {
    const [profile] = useGlobalState('profile')

    const backgroundImage = UserTypeFactory({
        user: profile,
        forCoach: () => {
            return CoachHelpBackground
        },
        forPlayer: () => {
            return PlayerHelpBackground
        }
    })

    const videoUrl = UserTypeFactory({
        user: profile,
        forCoach: () => {
            return "https://youtu.be/NNO-bSD51_I"
        },
        forPlayer: () => {
            return "https://youtu.be/aI51h_5fYQs"
        }
    })

    console.log(videoUrl)

    return (
        <View style={{ flexGrow: 1 }}>
            <ImageBackground style={{ flexGrow: 1 }} resizeMode={'stretch'} source={backgroundImage}>
                <NLButton onPress={() => Linking.openURL(videoUrl)} style={{ marginTop: '130%', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} value={"View Help Videos"} />
            </ImageBackground>
        </View>
    );
}

export default HelpScreen;
