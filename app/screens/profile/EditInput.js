import React, { useState, useEffect } from 'react';
import { View, TextInput, Text } from 'react-native';
import styles from './styles';
import useAxios from 'axios-hooks'
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';
import ErrorLabel from '../../components/ErrorLabel';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';

const URL_MAP = {
  "About Me": {
    url: "/Users/ChangeAboutUs",
    getParams: (values) => ({ aboutUs: values }),
    validate: (values) => {
      let str = values.aboutUs.replace(/(^\s*)|(\s*$)/gi, "");
      str = str.replace(/[ ]{2,}/gi, " ");
      str = str.replace(/\n /, "\n");
      if (str.split(' ').length > 10) {
        return "Can be max of 10 words"
      }
      return null
    }
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
  ["Travel Miles"]: {
    url: "/Users/SaveTravelMile",
    getParams: (values, profile) => ({ coachId: profile.Id, travelDistance: values })
  },
  ["NO"]: {
    url: "",
    getParams: (values, profile) => ({})
  },
}

const EditInput = (props) => {
  const title = props.navigation.getParam("title", "")
  const data = props.navigation.getParam("data", {})
  const cb = props.navigation.getParam("db", () => { })
  const [values, setValues] = useState(data || '');
  const [profile] = useGlobalState('profile')
  const [error, setError] = useState(null)

  const [updateDataReq, updateData] = useAxios({
    url: URL_MAP[props.navigation.getParam("title", "NO")].url,
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  useEffect(() => setValues(data), [data])

  return (
    <View>
      <HeaderClosePlus
        onGoBack={props?.navigation?.getParam("goBackTo", undefined) ? () => {
          if (HasCompletedVerificationProcess(profile)) {
            NavigationService.navigate(props?.navigation?.getParam("goBackTo", undefined))
          } else {
            NavigationService.goBack()
          }
        } : undefined}
        isLoading={updateDataReq.loading || getUserReq.loading}
        isSaveButton={true}
        saveOnPress={() => {
          cb(values);
          const data = URL_MAP[props.navigation.state.params.title].getParams(values, profile)
          if (URL_MAP[props.navigation.state.params.title].validate) {
            const error = URL_MAP[props.navigation.state.params.title].validate(data)
            console.log(error)
            if (error) {
              setError(error)
              return error;
            } else {
              setError(null)
            }
          }
          updateData({ data })
            .then((r) => {
              return getUserData()
            })
            .then((r) => {
              console.log(r.data)
              dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
              dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.TOGGLE, state: null })
            })
        }}
      />
      <View style={{ padding: 15 }}>
        <Text style={styles.titleText}>{title}</Text>
        <View style={[styles.inputContain, { borderBottomWidth: 0 }]}>
          <TextInput
            value={(values == null || values == undefined || values == 0) ? "": values.toString()}
            onChangeText={(text) => setValues(text)}
            style={{ height: Dimension.px200, width: '100%', textAlign: 'left', color: "black" }}
            placeholder="Type here..."
            numberOfLines={15}
            textAlignVertical={'top'}
            multiline
            keyboardType={props.navigation.getParam("keyboardType", "") == "numeric" ? "numeric" : "email-address"}
          />
        </View>
        {error && <ErrorLabel text={error} />}
      </View>
    </View>
  );
};

export default EditInput;
