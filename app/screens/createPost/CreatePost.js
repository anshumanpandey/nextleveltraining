import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Header from '../../components/header/Header'
import { useGlobalState } from '../../state/GlobalState'
import Dimension from '../../constants/dimensions.js'
import { Textarea, Icon, Input, Spinner } from 'native-base'
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import Video from 'react-native-video';
import Colors from '../../constants/color'

const Profile = (props) => {
  const formikRef = useRef()
  const [profile] = useGlobalState('profile')
  const [showModal, setShowModal] = useState(false)

  const [postReq, doPost] = useAxios({
    url: '/Users/CreatePost',
    method: 'POST'
  }, { manual: true })

  useEffect(() => {
    const focusListener = props.navigation.addListener('didBlur', () => {
      formikRef?.current?.setFieldValue("bodyText", "")
      formikRef?.current?.setFieldValue("file", null)
      formikRef?.current?.setErrors({
        bodyText: undefined
      })
    });
    return () => focusListener?.remove();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {/* <View style={{
          width: "100%",
          height: STATUS_BAR_HEIGHT,
          backgroundColor: "#0F2F80"
      }}>
          <StatusBar
              barStyle="light-content"
          />
      </View> */}
      <Header
        customButton={() => {
          return (
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flexGrow: 1, opacity: postReq.loading ? 0.5 : 1 }}>
              {postReq.loading && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
              <TouchableOpacity disabled={postReq.loading} onPress={formikRef?.current?.handleSubmit}>
                <Text style={{ fontSize: 18 }}>Post</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        hideCreatePost={true}
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
      />
      <Formik
        innerRef={(r) => formikRef.current = r}
        initialValues={{ file: null, bodyText: '' }}
        validate={(values) => {
          const errors = {}

          if (!values.bodyText) errors.bodyText = "Required"

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const data = {
            "body": values.bodyText,
            "header": "sss",
            "numberOfLikes": 0
          }

          doPost({ data })
            .then(r => {
              if (values?.file?.data) {
                delete values.file.data
                AsyncStorage.setItem(`post-${r.data.Id}-file`, JSON.stringify({ file: values.file, uploaded: false }))
              }
            })
            .then(() => {
              props.navigation.navigate('Home')
              resetForm({ values: {} })
            })

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.post_view}>
                <View style={{ padding: '5%' }}>
                  <Textarea
                    onChangeText={handleChange('bodyText')}
                    onBlur={handleBlur('bodyText')}
                    value={values.bodyText}
                    style={styles.textArea}
                    placeholder="Post about training here..."
                  />
                  {errors.bodyText && touched.bodyText && <ErrorLabel text={errors.bodyText} />}
                </View>

                {values.file && !values.file.type.includes('video') && (
                  <View style={{ justifyContent: 'center' }}>
                    <Image resizeMode="stretch" source={{ uri: values.file.uri }} style={{ width: Dimensions.get('screen').width, height: (Dimensions.get('screen').height / 100) * 50 }} />
                  </View>
                )}

                {values.file && values.file.type.includes('video') && (
                  <Video
                    paused={true}
                    currentPosition={10}
                    controls={true}
                    source={{ uri: values.file.uri, }}   // Can be a URL or a local file.
                    onError={() => {
                      Alert.alert('Error', 'We could not load the video')
                    }}               // Callback when video cannot be loaded
                    style={{
                      flex: 2,
                      height: '50%'
                    }} />
                )}

              </View>
            </ScrollView>
            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flex: values.file ? 0.8 : 0.3 }}>

              <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {
                const options = {
                  title: 'Select picture',
                  chooseFromLibraryButtonTitle: '',
                  storageOptions: {
                    skipBackup: true,
                    path: 'images',
                  },
                };

                ImagePicker.launchCamera(options, (file) => {

                  if (file.didCancel) {
                    console.log('User cancelled image picker');
                  } else if (file.error) {
                    console.log('ImagePicker Error: ', file.error);
                  } else if (file.customButton) {
                    console.log('User tapped custom button: ', file.customButton);
                  } else {
                    setShowModal(false)
                    setFieldValue('file', file)
                  }
                });
              }}>
                <Icon type="FontAwesome" name="camera" style={{ fontSize: 28, color: Colors.s_blue }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {
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
                    setShowModal(false)
                    setFieldValue('file', file)
                  }
                });
              }}>
                <Icon type="FontAwesome" name="photo" style={{ fontSize: 28, color: Colors.s_blue }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {
                DocumentPicker.pick({
                  type: [DocumentPicker.types.video],
                })
                  .then((file) => {
                    setShowModal(false)
                    file.type.includes('video')
                    setFieldValue('file', file)
                  })
              }}>
                <Icon type="Entypo" name="video" style={{ fontSize: 28, color: Colors.s_blue }} />
              </TouchableOpacity>

            </View>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
  post_view: {
    backgroundColor: 'white',
    flex: 1,
  },
  textArea: {
    borderWidth: 1,
    borderColor: Colors.s_blue,
    borderRadius: 15,
    textAlignVertical: 'center'
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default Profile
