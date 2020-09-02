import React, { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { Spinner } from 'native-base'

const NLOriginalImage = ({ source, style, ...props }) => {
    const [originalSize, setOriginalSize] = useState()
    const [err, setErr] = useState()
    useEffect(() => {
        Image.getSize(source.uri, (width, height) => setOriginalSize({width, height}), (err) => {
            console.log(err)
            setErr(err)
        });
    }, [])

    if (err) return <Text>We could not load the image</Text>
    if (!originalSize) return <Spinner />
    return (
        <Image source={source} style={{ ...style, width: originalSize.width, height: originalSize.height }} {...props} />
    );
}

export default NLOriginalImage;
