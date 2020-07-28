import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './styles';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorLabel from '../../components/ErrorLabel';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';
import Upload from 'react-native-background-upload'
import { pickImage } from '../../helpers/ImagePicker';
import Images from '../../constants/image';
import { axiosInstance } from '../../api/AxiosBootstrap';

const ProfilePicScreen = (props) => {
    const [profile] = useGlobalState('profile')
    const [token] = useGlobalState('token')
    const [uploading, setUploading] = useState()
    const formikRef = useRef()

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetUser',
    }, { manual: true })

    return (
        <Formik
            innerRef={(r) => formikRef.current = r}
            initialValues={{
                file: profile.ProfileImage || undefined,
            }}
            validate={(values) => {
                const errors = {}

                if (!values.file) errors.file = 'Required'

                return errors
            }}
            onSubmit={values => {
                const data = { "file": values.file || '' }

                const options = {
                    url: 'http://44.233.116.105/NextLevelTrainingApi/api/Users/UploadFile',
                    path: values.file.uri,
                    method: 'POST',
                    type: 'multipart',
                    maxRetries: 2, // set retry count (Android only). Default 2
                    field: "File",
                    headers: {
                        'content-type': 'multipart/form-data', // Customize content-type
                        'Authorization': `Bearer ${token}`
                    },
                    parameters: {
                        Type: "profile",
                        Id: profile.Id
                    },
                    // Below are options only supported on Android
                    notification: {
                        enabled: false
                    },
                    useUtf8Charset: true
                }

                setUploading(true)
                return Upload.startUpload(options).then((uploadId) => {
                    console.log('Upload started')
                    Upload.addListener('progress', uploadId, (data) => {
                        console.log(`[${values.file.uri}] Progress: ${data.progress}%`)
                    })
                    Upload.addListener('error', uploadId, (data) => {
                        console.log(`[${values.file.uri}] Error: ${JSON.stringify(data)}`)
                    })
                    Upload.addListener('cancelled', uploadId, (data) => {
                        console.log(`[${values.file.uri}] Cancelled!`)
                    })
                    Upload.addListener('completed', uploadId, (data) => {
                        // data includes responseCode: number and responseBody: Object
                        console.log(`[${values.file.uri}] Completed!`)
                        setUploading(false)
                        return getUserData()
                            .then((r) => {
                                console.log(r.data)
                                dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
                                console.log("new profile")
                            })
                    })
                })
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
                return (
                    <View>
                        <View style={{ borderWidth: 0 }}>
                            <HeaderClosePlus
                                isLoading={uploading || getUserReq.loading}
                                isSaveButton={true}
                                saveOnPress={handleSubmit}
                            />
                            <View>
    
                                <TouchableOpacity onPress={async() => {
                                    const source = await pickImage();
                                    setFieldValue('file', source)
                                }}>
                                    <View style={[styles.inputContain, { paddingHorizontal: 30 }]}>
                                        {values.file?.uri && <Text numberOfLines={1} style={{ color: 'black', paddingVertical: '4%' }}>{values.file.uri}</Text>}
                                        {values.file && !values.file?.uri && <Text numberOfLines={1} style={{ color: 'black', paddingVertical: '4%' }}>{values.file}</Text>}
                                        {!values.file && <Text numberOfLines={1} style={{ color: 'rgba(0,0,0,0.3)', paddingVertical: '4%' }}>Upload profile pic</Text>}
                                    </View>
                                </TouchableOpacity>
                                {values.file?.uri && <Image style={{ height: '80%', width: Dimensions.get("screen").width, resizeMode: 'contain' }} source={{ uri: values.file.uri }} />}
                                {values.file && !values.file?.uri && <Image style={{ height: '80%', width: Dimensions.get("screen").width, resizeMode: 'contain' }} source={{ uri: values.file }} />}
                                {errors.file && touched.file && <ErrorLabel text={errors.file} />}
    
                            </View>
                        </View>
                    </View>
                )
            }}
        </Formik>
    );
};

export default ProfilePicScreen;