import React, { useState } from 'react'
import Video from 'react-native-video';
import { View, Spinner, Text } from 'native-base';
import { Alert } from 'react-native';
import Colors from '../../constants/color';

const VideoScreen = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isReady, setIsReady] = useState(false)
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        Alert.alert("", "We could not load the video")
        props.navigation.goBack();
    }

    return (
        <>
            {!isReady && (
                <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1000, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size={80} color={Colors.s_blue} />
                    <Text>Loading video...</Text>
                </View>
            )}
            <Video
                source={{ uri: props.navigation.getParam("source") }}
                paused={false}
                onLoadStart={(d) => {
                    console.log('onLoadStart')
                    setIsLoading(true)
                }}
                onLoad={(d) => {
                    console.log('onLoad')
                    setIsReady(true)
                    setIsLoading(false)
                }}
                controls={isReady}
                resizeMode="cover"
                onError={() => {
                    console.log('onError')
                    setHasError(true)
                    setIsLoading(false)
                }}
                style={{
                    position: isReady ? 'absolute' : "relative", top: 0, bottom: 0, left: 0, right: 0
                }} />
        </>
    );
}

export default VideoScreen