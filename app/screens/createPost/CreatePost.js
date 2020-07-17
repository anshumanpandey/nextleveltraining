import React, { useState } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
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
      <Header toggleDrawer={props.toggleDrawer} />
      <Formik
        initialValues={{ file: {}, bodyText: '', title: '' }}
        validate={(values) => {
          const errors = {}

          if (!values.title) errors.title = "Required"
          if (!values.bodyText) errors.bodyText = "Required"

          return errors;
        }}
        onSubmit={values => {
          const data = {
            "header": values.title,
            "body": values.bodyText,
            "numberOfLikes": 0
          }

          doPost({ data })
          .then(r => AsyncStorage.setItem(`post-${r.data.Id}-file`, JSON.stringify({file: values.file, uploaded: false})))
          .then(() => props.navigation.navigate('Home'))

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.post_view}>
                <View>
                  <View style={{ justifyContent: 'space-between', flexDirection: 'row',flexGrow: 1 }}>
                    <View style={{ flexDirection: 'column', height: 60 }}>
                      <Input
                        placeholderTextColor="gray"
                        style={{ height: '90%', width: '100%'}}
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

                {values.file.uri && (
                  <View style={{ flex: 0.5, justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 16 }}>File Selected...</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                      <Image source={{ uri: values.file.uri }} style={{ width: 60, height: 60, marginRight: '5%' }} />
                    </View>
                  </View>
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
                    type: [DocumentPicker.types.images, DocumentPicker.types.video],
                  })
                    .then((file) => {
                      setShowModal(false)
                      setFieldValue('file', file)
                    })
                }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon type="FontAwesome" name="photo" style={{ fontSize: 28, color: 'green' }} />
                    <Text style={{ fontSize: 24, marginLeft: '8%' }}>Photo</Text>
                  </View>
                </TouchableOpacity>

                <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                  <Icon type="Entypo" name="video" style={{ fontSize: 28, color: 'steelblue' }} />
                  <Text style={{ fontSize: 24, marginLeft: '8%' }}>Video</Text>
                </View>

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
    flex: 1,
  },
  post_view: {
    padding: Dimension.pro5,
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
