import React, { useEffect, useState } from 'react'
import { Image, Text, Dimensions, View } from 'react-native'
import { Spinner } from 'native-base'

const maxHeight = (Dimensions.get("screen").height / 100) * 45

const NLOriginalImage = ({ source, style, width, height,...props }) => {

    return (
        <View style={{ maxHeight: maxHeight }}>
            <Image resizeMode="contain" source={source} style={{ ...style, width: width, height: height, maxHeight: '100%', }} {...props} />
        </View>
    );
}

export default NLOriginalImage;
