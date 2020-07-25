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
import Menu, { MenuItem } from 'react-native-material-menu';
import ImagePicker from 'react-native-image-picker';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';

const options = [
  "Passport",
  "License",
  "Utility Bill",
]

const AddTeam = (props) => {
  const [file, setFile] = useState();
  const formikRef = useRef()
  const menuRef = useRef()


  const [postTeamReq, postDbsCertificate] = useAxios({
    url: '/Users/SaveVerificationId',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  useEffect(() => {
    AsyncStorage.getItem(`Verification-file`)
      .then(file => {
        console.log(JSON.parse(file).file)
        if (!file) return
        setFile(JSON.parse(file))
        formikRef.current.setFieldValue("file", JSON.parse(file).file)
      })
  }, [])

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
          .then(r => AsyncStorage.setItem(`Verification-file`, JSON.stringify({ file: values.file, uploaded: false })))
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
                <Menu
                  ref={(r) => menuRef.current = r}
                  button={<Text style={{ color: values.type ? "black" : 'gray' }} onPress={() => menuRef.current?.show()}>{values.type ? values.type : "Select ID Type"}</Text>}
                >
                  {options.map(o => {
                    return <MenuItem onPress={() => {
                      setFieldValue('type', o)
                      menuRef.current?.hide()
                    }}>{o}</MenuItem>;
                  })}
                </Menu>
              </View>
              {errors.type && touched.type && <ErrorLabel text={errors.type} />}

              <TouchableOpacity onPress={() => {
                const options = {
                  title: 'Select picture',
                  chooseFromLibraryButtonTitle: '',
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };

                ImagePicker.launchImageLibrary(options, (file) => {

                  if (file.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (file.error) {
                    console.log('ImagePicker Error: ', file.error);
                  } else if (file.customButton) {
                    console.log('User tapped custom button: ', file.customButton);
                  } else {
                    setFieldValue('file', file)
                  }
                });
              }}>
                <View style={[styles.inputContain, { paddingHorizontal: 30 }]}>
                  <TextInput
                    editable={false}
                    style={{ textAlign: 'left', padding: Dimension.px10, fontSize: 15 }}
                    placeholder="Upload Valid ID"
                    keyboardType="email-address"
                    onChangeText={handleChange('file')}
                    onBlur={handleBlur('file')}
                    value={values.file?.name}
                  />
                </View>
              </TouchableOpacity>
              {values.file && <Image style={{ height: '80%', width: Dimensions.get("screen").width, resizeMode: 'contain' }} source={{ uri: values.file?.uri }} />}
              {errors.file && touched.file && <ErrorLabel text={errors.file} />}

            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddTeam;
