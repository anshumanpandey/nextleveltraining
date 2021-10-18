import React from 'react'
import { Icon } from 'native-base'

const NLBackButton = ({ navigation }) => (
  <Icon
    onPress={() => navigation.goBack()}
    type="Feather"
    name="arrow-left"
    style={{
      position: 'absolute',
      left: 15,
      fontSize: 22,
      zIndex: 1,
      color: '#2D7AF0',
    }}
  />
)

export default NLBackButton;