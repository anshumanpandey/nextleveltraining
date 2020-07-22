import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorLabel from '../../components/ErrorLabel';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import moment from 'moment'
import { Picker } from '@react-native-community/picker';
import DocumentPicker from 'react-native-document-picker';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';


const AddTeam = (props) => {
  const [file, setFile] = useState();
  const formikRef = useRef()

  const [postTeamReq, postDbsCertificate] = useAxios({
    url: '/Users/SaveDBSCeritificate',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  useEffect(() => {
    AsyncStorage.getItem(`DbsCert-file`)
    .then(file => {
      if (!file) return
      setFile(JSON.parse(file))
      formikRef.current.setFieldValue("file", JSON.parse(file).file)
    })
  },[])

  return (
    <Formik
      innerRef={(r) => formikRef.current = r}
      initialValues={{
        type: props.navigation.state.params.Type || undefined,
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
          .then(r => AsyncStorage.setItem(`DbsCert-file`, JSON.stringify({file: values.file, uploaded: false})))
          .then(r => getUserData())
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            NavigationService.goBack()
          })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <>
          <View>
            <HeaderClosePlus
              isLoading={postTeamReq.loading || getUserReq.loading}
              isSaveButton={true}
              saveOnPress={handleSubmit}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View>
              <View style={[styles.inputContain, { paddingHorizontal: 30 }]}>
                <Picker
                  selectedValue={values.type}
                  style={{ height: 50, width: "100%" }}
                  onValueChange={(itemValue, itemIndex) => {
                    if (itemValue == 0) return
                    setFieldValue('type', itemValue)
                  }}>
                  <Picker.Item color='gray' label="Select DBS Certificate Type" value={0} />
                  <Picker.Item label="Basic DBS Check" value="Basic DBS Check" />
                  <Picker.Item label="Standard DBS Check" value="Standard DBS Check" />
                  <Picker.Item label="Standard DBS Check" value="Standard DBS Check" />
                  <Picker.Item label="Enhanced DBS Check - excluding barred list check" value="Enhanced DBS Check - excluding barred list check" />
                  <Picker.Item label="Enhanced DBS Check - including barred list check" value="Enhanced DBS Check - including barred list check" />
                </Picker>
              </View>
              {errors.type && touched.type && <ErrorLabel text={errors.type} />}

              <TouchableOpacity onPress={() => {
                DocumentPicker.pick({
                  type: [DocumentPicker.types.images],
                })
                  .then((file) => {
                    setFieldValue('file', file)
                  })
              }}>
                <View style={[styles.inputContain, { paddingHorizontal: 30 }]}>
                  <TextInput
                    editable={false}
                    style={{ textAlign: 'left', padding: Dimension.px10, fontSize: 15 }}
                    placeholder="Upload DBS Certificate"
                    keyboardType="email-address"
                    onChangeText={handleChange('file')}
                    onBlur={handleBlur('file')}
                    value={values.file?.name}
                  />
                </View>
              </TouchableOpacity>
              {values.file && <Image style={{ height: '80%', width: Dimensions.get("screen").width,resizeMode: 'contain'}} source={{ uri: values.file?.uri }} />}
              {errors.file && touched.file && <ErrorLabel text={errors.file} />}

            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddTeam;
