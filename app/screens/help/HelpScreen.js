import React from 'react'
import { View, Linking, ImageBackground } from 'react-native'
import { Icon } from 'native-base'
import UserTypeFactory from '../../utils/UserTypeFactory';
import { useGlobalState } from '../../state/GlobalState';
import NLButton from '../../components/NLButton';

const CoachHelpBackground = require('../../assets/images/CoachHelpBackground.jpeg')
const PlayerHelpBackground = require('../../assets/images/PlayerHelpBackground.jpeg')

const HelpScreen = (props) => {
    const [profile] = useGlobalState('profile')

    const backgroundImage = UserTypeFactory({
        user: profile,
        forCoach: () => CoachHelpBackground,
        forPlayer: () => PlayerHelpBackground
    })

    const videoUrl = UserTypeFactory({
        user: profile,
        forCoach: () => "https://youtu.be/NNO-bSD51_I",
        forPlayer: () => "https://youtu.be/aI51h_5fYQs"
    })

    return (
        <View style={{ flexGrow: 1 }}>
            <ImageBackground style={{ flexGrow: 1 }} resizeMode="stretch" source={backgroundImage}>
                <View>
                    <Icon
                        onPress={() => props.navigation.goBack()}
                        type="Feather"
                        name="arrow-left"
                        style={{
                            paddingVertical: 10,
                            paddingRight: 10,
                            left: 15,
                            fontSize: 22,
                            color: '#2D7AF0',
                        }}
                    />
                </View>
                <NLButton onPress={() => Linking.openURL(videoUrl)} style={{ marginTop: '130%', width: '80%', marginLeft: 'auto', marginRight: 'auto' }} value="View Help Videos" />
            </ImageBackground>
        </View>
    );
}

export default HelpScreen;
