import React, { Component } from 'react'
import { Text } from 'react-native'

const ErrorLabel = ({ text }) => {
    return <Text style={{ color: 'rgba(255, 0, 0, 0.5)'}}>{text}</Text>
}

export default ErrorLabel;
