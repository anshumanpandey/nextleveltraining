import React from 'react'
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native'


const NLSaveButton = ({ onPress, disabled }) => (
  <TouchableOpacity disabled={disabled} onPress={onPress}>
    <Text
      style={{
        paddingHorizontal: 5,
        paddingVertical: 15,
        fontSize: 18,
        opacity: 1,
        fontWeight: 'bold',
        color: disabled === true ? '#2D7AF050' : '#2D7AF0',
      }}>
      Save
    </Text>
  </TouchableOpacity>
)

NLSaveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  disabled: PropTypes.func,
}

NLSaveButton.defaultProps = {
  disabled: false,
}

export default NLSaveButton;