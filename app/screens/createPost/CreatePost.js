import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform, Alert } from 'react-native'
import Header from '../../components/header/Header'
import { Textarea, Icon, Input, Spinner } from 'native-base'
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import Video from 'react-native-video';
import Colors from '../../constants/color'
import ImageCropPicker from 'react-native-image-crop-picker';
import MentionInput from 'react-native-mention';
import LoadableVideo from '../../components/LoadableVideo';

const Profile = (props) => {
  const inputEl = useRef(null);
  const formikRef = useRef()

  const [postReq, doPost] = useAxios({
    url: '/Users/CreatePost',
    method: 'POST'
  }, { manual: true })

  const [getconnectedUserReq, refetchConnected] = useAxios({
    url: '/Users/GetConnectedUsers',
  })

  const [getHashtags, refetchHashtags] = useAxios({
    url: '/Users/GetHashTags',
  })


  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {
      refetchConnected()
      refetchHashtags()
    });

    const blurListener = props.navigation.addListener('didBlur', () => {
      formikRef?.current?.setFieldValue("bodyText", "")
      formikRef?.current?.setFieldValue("file", null)
      formikRef?.current?.setErrors({
        bodyText: undefined
      })
    });
    return () => {
      focusListener?.remove();
      blurListener?.remove();
    }
  }, [])

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1, backgroundColor: 'white' }}>
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
          if (!values.file) errors.file = "Required"

          return errors;
        }}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          const data = {
            "body": values.bodyText,
            "header": "sss",
            "numberOfLikes": 0,
            "taggedUserIds": inputEl.current?.getUser().map(u => u.id)
          }

          doPost({ data })
            .then(r => {
              if (values?.file) {
                if (values?.file?.mime) {
                  values.file.type = values.file.mime
                  values.file.uri = values.file.path
                }
                if (Platform.OS == "android") {
                  values.file.uri = values.file.uri.replace("file://", "");
                }
                console.log(values.file)
                AsyncStorage.setItem(`post-${r.data.Id}-file`, JSON.stringify({ file: values.file, uploaded: false }))
              }
            })
            .then(() => {
              props.navigation.navigate('Home')
              resetForm({ values: {file: null, bodyText: ''} })
            })

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={styles.scrollView}>
              <View style={styles.post_view}>
                <View style={{ padding: '5%' }}>
                  <MentionInput
                    inputField={styles.textArea}
                    ref={(cd) => inputEl.current = cd}
                    reference={comp => { }}
                    isLoading={getconnectedUserReq.loading}
                    loadingComponent={
                      <Text>Loading...</Text>
                    }
                    placeholder="Post about training here..."
                    onChangeText={(e) => {
                      console.log("onChangeText", e)
                      setFieldValue("bodyText", e)
                    }}
                    mentionData={getconnectedUserReq.data ? getconnectedUserReq.data.map(u => ({ id: u.Id, name: u.FullName.replace(" ", "_"), ...u })) : []}
                    hashtagData={getHashtags.data ? getHashtags.data.map(u => ({ id: u.Id, name: u.Tag.replace(" ", "_").replace("#", "") })) : []}
                    mentioningChangeText={(e) => { }}
                    onMentionSelected={(mnetion) => {
                      console.log("onMentionSelected", mnetion)
                    }}
                    onHashtagSelected={(hashtag) => {
                      console.log("onHashtagSelected", hashtag)
                    }}
                    renderMentionCell={({ item }) => {
                      console.log(item)
                      return (
                        <View style={{ padding: '2%', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)', flexDirection: 'row' }}>
                          <Image style={{ width: 25, height: 25, borderRadius: 25/2, marginRight: '5%' }} source={{ uri: item.ProfileImage }} />
                          <Text>{item.name}</Text>
                        </View>
                      )
                    }}
                    style={styles.inputField}
                  />
                  {errors.bodyText && touched.bodyText && <ErrorLabel text={errors.bodyText} />}


                </View>

                {values.file && !values.file.type.includes('video') && (
                  <View style={{ justifyContent: 'center' }}>
                    <Image resizeMode="stretch" source={{ uri: values.file.uri }} style={{ width: Dimensions.get('screen').width, height: (Dimensions.get('screen').height / 100) * 50 }} />
                  </View>
                )}

                {values.file && values.file.type.includes('video') && (
                  <LoadableVideo
                    source={{ uri: values.file.uri, }}   // Can be a URL or a local file.
                    style={{ flex: 2, width: Dimensions.get('screen').width, height: (Dimensions.get('screen').height / 100) * 50 }}
                  />
                )}

              </View>
            </ScrollView>
            {errors.bodyText && touched.bodyText && <ErrorLabel style={{ textAlign: 'center' }} text={errors.bodyText} />}
            <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', flex: values.file ? 0.8 : 0.3 }}>

              <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {
                ImageCropPicker.openCamera({ cropping: true })
                  .then(image => {
                    image.type = image.mime
                    image.uri = image.path
                    setFieldValue('file', image)
                  });
              }}>
                <Icon type="FontAwesome" name="camera" style={{ fontSize: 28, color: Colors.s_blue }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {

                ImageCropPicker.openPicker({ cropping: true, mediaType: "photo" })
                  .then(image => {
                    image.type = image.mime
                    image.uri = image.path
                    setFieldValue('file', image)
                  });
              }}>
                <Icon type="FontAwesome" name="photo" style={{ fontSize: 28, color: Colors.s_blue }} />
              </TouchableOpacity>

              <TouchableOpacity style={{ flexDirection: 'row', borderWidth: 1, borderColor: Colors.s_blue, padding: '2%', borderRadius: 50 }} onPress={() => {
                DocumentPicker.pick({
                  type: [DocumentPicker.types.video],
                })
                  .then((file) => {
                    file.type.includes('video')
                    console.log(file.type)
                    setFieldValue('file', file)
                  })
              }}>
                <Icon type="Entypo" name="video" style={{ fontSize: 28, color: Colors.s_blue }} />
              </TouchableOpacity>

            </View>
          </>
        )}
      </Formik>
    </ScrollView>
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
    borderColor: Colors.s_blue,
    borderRadius: 15,
    textAlignVertical: 'top',
    height: 200
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default Profile
