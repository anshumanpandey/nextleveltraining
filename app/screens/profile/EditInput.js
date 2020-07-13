import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import {Icon} from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';

const EditInput = (props) => {
  const title = props.navigation.state.params.title;
  const data = props.navigation.state.params.data;
  const cb = props.navigation.state.params.cb;
  const [values, setValues] = useState(data);
  return (
    <View>
      <HeaderClosePlus
        isSaveButton={true}
        saveOnPress={() => {
          cb(values);
          NavigationService.goBack();
        }}
      />
      <View style={{padding: 15}}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={styles.inputContain}>
          <TextInput
            value={values}
            onChangeText={(text) => setValues(text)}
            style={{height: Dimension.px200, textAlign: 'left'}}
            placeholder="Type here..."
            numberOfLines={15}
            textAlignVertical={'top'}
            multiline
            keyboardType="email-address"
          />
        </View>
      </View>
    </View>
  );
};

export default EditInput;
