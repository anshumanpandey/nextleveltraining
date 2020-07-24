import React, { Component } from 'react'
import { Text } from 'react-native'

const ErrorLabel = ({ text, style }) => {
    return <Text style={{ color: 'rgba(255, 0, 0, 0.5)', ...style}}>{text}</Text>
}

export default ErrorLabel;
