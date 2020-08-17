import React, { Component, useState } from 'react'
import { Spinner, Text, Icon, View } from 'native-base'
import Video from 'react-native-video';
import Colors from '../constants/color'
import { TouchableOpacity, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import NavigationService from '../navigation/NavigationService';

const ModalVideo = ({ source }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [isReady, setIsReady] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [showModal, setshowModal] = useState(false)

    return (
        <>
            <TouchableOpacity onPress={() => {
                NavigationService.navigate("Video", {source} )
            }} style={{ height: 80, justifyContent: 'center' }}>
                <Icon style={{ textAlign: 'center', fontSize: 50 }} type="AntDesign" name="play" />
                <Text style={{ textAlign: 'center', opacity: 0.8, color: 'white' }}>Press to Open</Text>
            </TouchableOpacity>
        </>
    );
}

export default ModalVideo;
