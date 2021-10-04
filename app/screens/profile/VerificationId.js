import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Spinner } from 'native-base';
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
import { useFileUploader, FILE_TYPE_UPLOAD } from '../../utils/useFileUpload';

const options = [
  "Passport",
  "License",
  "Utility Bill",
]

const AddTeam = ({ navigation }) => {
  const [profile] = useGlobalState('profile')
  const formikRef = useRef()
  const menuRef = useRef()
  const [{ loading: isFileUploading }, uploadFile] = useFileUploader()


  const [postTeamReq, postDbsCertificate] = useAxios({
    url: '/Users/SaveVerificationId',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  const isLoading = () => postTeamReq.loading || getUserReq.loading || isFileUploading


  return (
    <Formik
      innerRef={(r) => { formikRef.current = r }}
      initialValues={{
        type: navigation.state.params.Type || undefined,
        file: profile?.VerificationDocument?.Path ? { uri: profile?.VerificationDocument?.Path } : undefined,
      }}
      validate={(values) => {
        const errors = {}

        if (!values.type) errors.type = 'Required'
        if (!values.file) errors.file = 'Required'

        return errors
      }}
      onSubmit={values => {
        uploadFile({
          file: values.file,
          type: FILE_TYPE_UPLOAD.VERIFICATION
        })
          .then(({ responseBody }) => {
            const data = {
              "type": values.type || '',
              "path": responseBody,
            }
            return postDbsCertificate({ data })
          })
          .then(() => getUserData())
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            if (HasCompletedVerificationProcess(profile)) {
              NavigationService.navigate("AboutMe")
            } else {
              NavigationService.goBack()
            }
          })

      }}
    >
      {({ handleSubmit, setFieldValue, values, errors, touched }) => (
        <>
          <View>
            <HeaderClosePlus
              onGoBack={navigation?.getParam("goBackTo", undefined) ? () => {
                if (HasCompletedVerificationProcess(profile)) {
                  NavigationService.navigate(navigation?.getParam("goBackTo", undefined))
                } else {
                  NavigationService.goBack()
                }
              } : undefined}
              isLoading={isLoading()}
              isSaveButton
              saveOnPress={handleSubmit}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View>
              <Menu
                ref={(r) => { menuRef.current = r }}
                style={{ width: '95%' }}
                button={
                  <TouchableOpacity onPress={() => menuRef.current?.show()} style={[styles.inputContain, { height: 50, justifyContent: 'center' }]}>
                    <Text style={{ color: values.type ? "black" : 'gray', paddingLeft: 30 }}>{values.type ? values.type : "Select ID Type"}</Text>
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
                <Text numberOfLines={1} style={{ color: (values.file?.fileName || values.file?.uri) ? 'black' : 'rgba(0,0,0,0.3)', paddingVertical: '4%' }}>{(values.file?.fileName || values.file?.uri) ? (values.file?.fileName || values.file?.uri) : "Upload Valid ID"}</Text>
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
      )}
    </Formik>
  );
};

export default AddTeam;
