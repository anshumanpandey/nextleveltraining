import React, { useEffect, useState } from 'react'
import { Image, Text, Dimensions, View } from 'react-native'
import { Spinner } from 'native-base'

function isValidURL(string) {
    return string.startsWith("http") || string.startsWith("https");
  };

const NLOriginalImage = ({ source, style, width, height,...props }) => {
    const [originalSize, setOriginalSize] = useState()
    const [err, setErr] = useState()
    useEffect(() => {
        if (isValidURL(source.uri)) {
            Image.getSize(source.uri, (width, height) => setOriginalSize({width, height}), (err) => {
                console.log(err)
                setErr(err)
            });
        } else if(width && height) {
            console.log(originalSize)
            console.log(source)
            setOriginalSize({width: width, height: height})
        }
    }, [])

    if (err) return <Text>We could not load the image</Text>
    if (!originalSize) return <Spinner />
    return (
        <View style={{ maxHeight: (Dimensions.get("screen").height / 100) * 45 }}>
            <Image resizeMode="contain" source={source} style={{ ...style, width: originalSize.width, height: originalSize.height, maxHeight: '100%', }} {...props} />
        </View>
    );
}

export default NLOriginalImage;
