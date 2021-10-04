import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Spinner } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import Menu, { MenuItem } from 'react-native-material-menu';
import LoaderImage from 'react-native-image-progress';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';
import ErrorLabel from '../../components/ErrorLabel';
import NavigationService from '../../navigation/NavigationService';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import styles from './styles';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';
import NLCropperImagePicker from '../../components/NLCropperImagePicker';

const options = [
  "Basic DBS Check",
  "Standard DBS Check",
  "Enhanced DBS Check - excluding barred list check",
  "Enhanced DBS Check - including barred list check"
]

const AddTeam = (props) => {
  const [profile] = useGlobalState('profile')
  const formikRef = useRef()
  const menuRef = useRef()

  const [postTeamReq, postDbsCertificate] = useAxios({
    url: '/Users/SaveDBSCeritificate',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <Formik
      innerRef={(r) => formikRef.current = r}
      initialValues={{
        type: props.navigation.state.params.Type || undefined,
        file: profile?.DBSCeritificate?.Path ? { uri: profile?.DBSCeritificate?.Path } : undefined,
      }}
      validate={(values) => {
        const errors = {}

        if (!values.type) errors.type = 'Required'
        if (!values.file) errors.file = 'Required'

        return errors
      }}
      onSubmit={values => {
        const data = {
          "type": values.type || '',
          "file": values.file || '',
        }
        postDbsCertificate({ data })
          .then(() => getUserData())
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            if (HasCompletedVerificationProcess(profile)) {
              NavigationService.navigate("AboutMe")
            } else {
              NavigationService.goBack()
            }
          });
      }}
    >
      {({ handleSubmit, setFieldValue, values, errors, touched }) => {
        console.log(values.file)
        return (
          <>
            <View style={{ borderWidth: 0 }}>
              <HeaderClosePlus
                onGoBack={props?.navigation?.getParam("goBackTo", undefined) ? () => {
                  if (HasCompletedVerificationProcess(profile)) {
                    NavigationService.navigate(props?.navigation?.getParam("goBackTo", undefined))
                  } else {
                    NavigationService.goBack()
                  }
                } : undefined}
                isLoading={postTeamReq.loading || getUserReq.loading}
                isSaveButton
                saveOnPress={handleSubmit}
              />
              <View>
                <Menu
                  ref={(r) => menuRef.current = r}
                  style={{ width: '95%' }}
                  button={
                    <TouchableOpacity onPress={() => menuRef.current?.show()} style={[styles.inputContain, { height: 50, justifyContent: 'center' }]}>
                      <Text style={{ color: values.type ? "black" : 'gray', paddingLeft: 30 }}>{values.type ? values.type : "Select DBS Certificate Type"}</Text>
                    </TouchableOpacity>
                  }
                >
                  {options.map(o => <MenuItem style={{ maxWidth: 'auto', width: '200%' }} onPress={() => {
                    setFieldValue('type', o)
                    menuRef.current?.hide()
                  }}>{o}</MenuItem>)}
                </Menu>
                {errors.type && touched.type && <ErrorLabel text={errors.type} />}

                <View style={[styles.inputContain, { paddingHorizontal: 30 }]}>
                  <Text numberOfLines={1} style={{ color: (values.file?.fileName || values.file?.uri) ? 'black' : 'rgba(0,0,0,0.3)', paddingVertical: '4%' }}>{(values.file?.fileName || values.file?.uri) ? (values.file?.fileName || values.file?.uri) : "Upload DBS Certificate"}</Text>
                </View>
                <NLCropperImagePicker onFileSelected={(file) => {
                  console.log(file)
                  setFieldValue("file", file)
                }} />
                {values.file && <LoaderImage indicator={<Spinner />} style={{ height: '80%', width: Dimensions.get("screen").width, resizeMode: 'contain' }} source={{ uri: values.file?.uri }} />}
                {errors.file && touched.file && <ErrorLabel text={errors.file} />}

              </View>
            </View>
          </>
        )
      }}
    </Formik>
  );
};

export default AddTeam;
