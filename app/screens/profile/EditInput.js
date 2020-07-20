import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import styles from './styles';
import useAxios from 'axios-hooks'
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';

const URL_MAP = {
  "About Me": {
    url: "/Users/ChangeAboutUs",
    getParams: (values) => ({ aboutUs: values })
  },
  Achievements: {
    url: "/Users/ChangeAchievement",
    getParams: (values) => ({ achievements: values })
  },
  Accomplishment: {
    url: "/Users/SaveAccomplishment",
    getParams: (values) => ({ accomplishment: values })
  },
  ["Price Per Hour"]: {
    url: "/Users/ChangeRate",
    getParams: (values) => ({ rate: values })
  },
}

const EditInput = (props) => {
  const title = props.navigation.state.params.title;
  const data = props.navigation.state.params.data;
  const cb = props.navigation.state.params.cb;
  const [values, setValues] = useState(data || '');

  const [updateDataReq, updateData] = useAxios({
    url: URL_MAP[props.navigation.state.params.title].url,
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <View>
      <HeaderClosePlus
        isLoading={updateDataReq.loading || getUserReq.loading}
        isSaveButton={true}
        saveOnPress={() => {
          cb(values);
          updateData({ data: URL_MAP[props.navigation.state.params.title].getParams(values)})
          .then((r) => {
            return getUserData()
          })
          .then((r) => {
            console.log(r.data)
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data})
          })
        }}
      />
      <View style={{padding: 15}}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={[styles.inputContain, { borderBottomWidth: 0}]}>
          <TextInput
            value={values.toString()}
            onChangeText={(text) => setValues(text)}
            style={{height: Dimension.px200, width: '100%',textAlign: 'left' }}
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
