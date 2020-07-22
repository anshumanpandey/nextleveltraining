import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Header from '../../components/header/Header'
import { useGlobalState } from '../../state/GlobalState'
import Dimension from '../../constants/dimensions.js'
import { Textarea, Icon, Input } from 'native-base'
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import Video from 'react-native-video';

const Profile = (props) => {
  const [profile] = useGlobalState('profile')
  const [showModal, setShowModal] = useState(false)

  const [postReq, doPost] = useAxios({
    url: '/Users/CreatePost',
    method: 'POST'
  }, { manual: true })

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
      <Header hideCreatePost={true} toggleDrawer={props.toggleDrawer} navigate={props.navigation.navigate} />
      <Formik
        initialValues={{ file: null, bodyText: '', title: '' }}
        validate={(values) => {
          const errors = {}

          if (!values.title) errors.title = "Required"
          if (!values.bodyText) errors.bodyText = "Required"

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const data = {
            "header": values.title,
            "body": values.bodyText,
            "numberOfLikes": 0
          }

          doPost({ data })
            .then(r => {
              AsyncStorage.setItem(`post-${r.data.Id}-file`, JSON.stringify({ file: values.file, uploaded: false }))
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
                <View style={{ padding: Dimension.pro5 }}>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row', flexGrow: 1 }}>
                    <View style={{ flexDirection: 'column', height: 60, width: '90%' }}>
                      <Input
                        placeholderTextColor="gray"
                        style={{ height: '90%', width: '100%', }}
                        onChangeText={handleChange('title')}
                        onBlur={handleBlur('title')}
                        value={values.title}
                        placeholder="Title..."
                      />
                      {errors.title && touched.title && <ErrorLabel text={errors.title} />}
                    </View>
                    <TouchableOpacity onPress={handleSubmit}>
                      <Text style={{ fontSize: 18 }}>Post</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={() => setShowModal(true)}>
                    <View style={{ borderWidth: 1, borderRadius: 8, paddingHorizontal: '5%', width: '30%', marginTop: '3%', flexDirection: 'row', justifyContent: 'space-between' }}>
                      <Text>Upload</Text>
                      <Icon type="AntDesign" name="upload" style={{ fontSize: 18 }} />
                    </View>
                  </TouchableOpacity>
                </View>
                <Textarea
                  onChangeText={handleChange('bodyText')}
                  onBlur={handleBlur('bodyText')}
                  value={values.bodyText}
                  style={styles.textArea}
                  placeholder="What's on your mind"
                />
                {errors.bodyText && touched.bodyText && <ErrorLabel text={errors.bodyText} />}

                {values.file && !values.file.type.includes('video') && (
                  <View style={{ flex: 1, justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image resizeMode="stretch" source={{ uri: values.file.uri }} style={{ width: Dimensions.get('screen').width, height: (Dimensions.get('screen').height / 100) * 50 }} />
                    </View>
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
            <Modal
              onBackdropPress={() => setShowModal(false)}
              isVisible={showModal}
              style={styles.modal}>
              <View style={{ backgroundColor: 'white', height: '50%', padding: '8%' }}>
                <TouchableOpacity onPress={() => {
                  DocumentPicker.pick({
                    type: [DocumentPicker.types.images],
                  })
                    .then((file) => {
                      console.log(file)
                      setShowModal(false)
                      setFieldValue('file', file)
                    })
                }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon type="FontAwesome" name="photo" style={{ fontSize: 28, color: 'green' }} />
                    <Text style={{ fontSize: 24, marginLeft: '8%' }}>Photo</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  DocumentPicker.pick({
                    type: [DocumentPicker.types.video],
                  })
                    .then((file) => {
                      setShowModal(false)
                      file.type.includes('video')
                      setFieldValue('file', file)
                    })
                }}>
                  <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                    <Icon type="Entypo" name="video" style={{ fontSize: 28, color: 'steelblue' }} />
                    <Text style={{ fontSize: 24, marginLeft: '8%' }}>Video</Text>
                  </View>
                </TouchableOpacity>

              </View>
            </Modal>
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
    flex: 0.5
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default Profile
