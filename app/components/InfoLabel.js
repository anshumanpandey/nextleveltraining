import React, { Component } from 'react'
import { Text } from 'react-native'

const InfoLabel = ({ text, style }) => {
    return <Text style={{ color: 'rgba(0, 0, 0, 0.2)', ...style}}>{text}</Text>
}

export default InfoLabel;
