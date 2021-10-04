import React, { useRef } from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import ErrorLabel from '../../components/ErrorLabel';
import { dispatchGlobalState, getGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';
import NLCropperImagePicker from '../../components/NLCropperImagePicker';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';
import { useFileUploader, FILE_TYPE_UPLOAD } from '../../utils/useFileUpload';

const ProfilePicScreen = (props) => {
    const [profile] = useGlobalState('profile')
    const formikRef = useRef()

    const [{ loading: isFileUploading }, uploadFile] = useFileUploader()

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    const isSaving = () => getUserReq.loading === true || isFileUploading

    return (
        <Formik
            innerRef={(r) => { formikRef.current = r }}
            initialValues={{
                file: profile?.ProfileImage || undefined,
            }}
            validate={(values) => {
                const errors = {}

                if (!values.file) errors.file = 'Required'

                return errors
            }}
            onSubmit={values => {
                uploadFile({
                    file: values.file,
                    type: FILE_TYPE_UPLOAD.PROFILE
                })
                    .then(() => getUserData())
                    .then((r) => {
                        console.log(r.data)
                        dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                        if (HasCompletedVerificationProcess(profile)) {
                            const goTo = props?.navigation?.getParam("goBackTo", "AboutMe")
                            const params = goTo != "Profile" ? undefined : { player: getGlobalState("profile"), ...getGlobalState("profile"), hideConnect: true, hideCoachButtons: true, editable: true }
                            console.log("profilepic: back to", goTo)
                            NavigationService.navigate(goTo, params)
                        } else {
                            NavigationService.goBack()
                        }
                        console.log("new profile")
                    })
            }}
        >
            {({ handleSubmit, setFieldValue, values, errors, touched }) => (
                <View>
                    <View style={{ borderWidth: 0 }}>
                        <HeaderClosePlus
                            onGoBack={() => {
                                const goTo = props?.navigation?.getParam("goBackTo", "AboutMe")
                                const params = goTo !== "Profile" ? undefined : { player: getGlobalState("profile"), ...getGlobalState("profile"), hideConnect: true, hideCoachButtons: true, editable: true }
                                console.log("profilepic: back to", goTo)
                                NavigationService.navigate(goTo, params)
                            }}
                            isLoading={isSaving()}
                            isSaveButton
                            saveOnPress={handleSubmit}
                        />
                        <View>

                            {/* <View style={[styles.inputContain, { paddingHorizontal: 30 }]}>
                                    {values.file?.uri && <Text numberOfLines={1} style={{ color: 'black', paddingVertical: '4%' }}>{values.file.uri}</Text>}
                                    {values.file && !values.file?.uri && <Text numberOfLines={1} style={{ color: 'black', paddingVertical: '4%' }}>{values.file}</Text>}
                                    {!values.file && <Text numberOfLines={1} style={{ color: 'rgba(0,0,0,0.3)', paddingVertical: '4%' }}>Upload profile pic</Text>}
                                </View> */}
                            <NLCropperImagePicker onFileSelected={(file) => {
                                setFieldValue("file", file)
                            }} />
                            {values.file?.uri && <Image style={{ height: '80%', width: Dimensions.get("screen").width, resizeMode: 'contain' }} source={{ uri: values.file.uri }} />}
                            {values.file && !values.file?.uri && <Image style={{ height: '80%', width: Dimensions.get("screen").width, resizeMode: 'contain' }} source={{ uri: values.file }} />}
                            {errors.file && touched.file && <ErrorLabel text={errors.file} />}

                        </View>
                    </View>
                </View>
            )}
        </Formik>
    );
};

export default ProfilePicScreen;
