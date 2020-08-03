import React ,{ useState } from "react";
import Video from 'react-native-video';
import { Spinner } from "native-base";
import { Text, Alert } from "react-native";
import Colors from "../constants/color";

const LoadableVideo = ({ source, style }) => {
  const [videoIsReady, setVideoIsReady] = useState(false);

    return (
        <>
            <Video
                source={source}
                paused={false}
                onLoadStart={(d) => {
                    console.log('onLoadStart')
                }}
                onLoad={(d) => {
                    console.log('onLoad')
                    setVideoIsReady(true)
                }}
                currentPosition={1}
                controls={true}
                onError={() => {
                    Alert.alert('Error', 'We could not load the video')
                }}               // Callback when video cannot be loaded
                style={style} />
            {!videoIsReady && (
                <>
                    <Spinner color={Colors.s_yellow} size={100} />
                    <Text style={{ textAlign: 'center', opacity: 0.8 }}>Loading video...</Text>
                </>
            )}
        </>
    );
}

export default LoadableVideo