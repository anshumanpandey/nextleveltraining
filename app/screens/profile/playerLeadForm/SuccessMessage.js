import React from 'react';
import {
  View,
  Text,
} from 'react-native';

const SuccessComponent = () => (
  <View
    style={{
      width: '95%',
      alignSelf: 'center',
      borderRadius: 10,
      height: 350,
      marginBottom: 20,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    }}>
    <Text
      style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
      {`Lead created successfully. \n A coach will contact you.`}
    </Text>
  </View>
)

export default SuccessComponent;