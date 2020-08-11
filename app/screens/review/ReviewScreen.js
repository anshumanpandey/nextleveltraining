import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import Header from '../../components/header/Header'
import { useGlobalState } from '../../state/GlobalState'
import Dimension from '../../constants/dimensions.js'
import { Textarea, Icon, Input as TextInput, Spinner } from 'native-base'
import Modal from 'react-native-modal';
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-picker';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import { Rating, AirbnbRating } from 'react-native-ratings';
import HeaderTitleBack from '../../components/header/HeaderTitleBack'

const ReviewScreen = (props) => {
  const formikRef = useRef()
  const [profile] = useGlobalState('profile')
  const [showModal, setShowModal] = useState(false)

  const [postReq, doPost] = useAxios({
    url: '/Users/SaveReview',
    method: 'POST'
  }, { manual: true })

  useEffect(() => {
    const focusListener = props.navigation.addListener('didBlur', () => {
      formikRef?.current?.setFieldValue("review", "")
      formikRef?.current?.setFieldValue("rate", 3)
    });
    return () => focusListener?.remove();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <HeaderTitleBack
        customButton={() => {
          return (
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row', flexGrow: 1, opacity: postReq.loading ? 0.5 : 1 }}>
              {postReq.loading && <Spinner size={28} color="black" style={{ right: 20, position: 'absolute', marginRight: '10%', height: '10%' }} />}
              <TouchableOpacity disabled={postReq.loading} onPress={formikRef?.current?.handleSubmit}>
                <Text style={{ fontSize: 18 }}>Save</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        onBackPress={() => props.navigation.navigate("Booking")}
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
      />
      <Formik
        innerRef={(r) => formikRef.current = r}
        initialValues={{ rate: 3, review: '' }}
        validate={(values) => {
          const errors = {}

          if (!values.review) errors.review = "Required"

          console.log(values.review)

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const data = {
            "coachId": props.navigation.getParam("coachId"),
            "playerId": profile.Id,
            "rating": values.rate,
            "feedback": values.review
          }

          doPost({ data })
            .then(() => {
              props.navigation.goBack()
              resetForm({ values: {} })
            })

        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <AirbnbRating defaultRating={values.rate} onFinishRating={(r) => console.log(r)} />
              <View style={{ paddingHorizontal: '3%', marginTop: '5%' }}>
                <TextInput
                  placeholderTextColor={'rgba(0,0,0,0.3)'}
                  placeholder="Write your review"
                  onChangeText={handleChange('review')}
                  onBlur={handleBlur('review')}
                  value={values.review}
                />
                {errors.review && touched.review && <ErrorLabel text={errors.review} />}
              </View>
            </ScrollView>
          </>
        )}
      </Formik>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: 'white',
  },
  post_view: {
    backgroundColor: 'white',
    flex: 1,
  },
  textArea: {
    flex: 0.3
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})

export default ReviewScreen
