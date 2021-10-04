import React, { useRef, useEffect } from 'react';
import {
  View, StyleSheet, Text, ScrollView, TouchableOpacity
} from 'react-native';
import {
  Input as TextInput, Spinner,
} from 'native-base';
import { Formik } from 'formik';
import useAxios from 'axios-hooks';
import { AirbnbRating } from 'react-native-ratings';
import ErrorLabel from '../../components/ErrorLabel';
import { useGlobalState } from '../../state/GlobalState';
import HeaderTitleBack from '../../components/header/HeaderTitleBack';
import NavigationService from '../../navigation/NavigationService';

const ReviewScreen = (props) => {
  const formikRef = useRef();
  const [profile] = useGlobalState('profile');

  const [postReq, doPost] = useAxios({
    url: '/Users/SaveBookingReview',
    method: 'POST',
  }, { manual: true });

  useEffect(() => {
    const focusListener = props.navigation.addListener('didBlur', () => {
      formikRef?.current?.setFieldValue('review', '');
      formikRef?.current?.setFieldValue('rate', 3);
    });
    return () => focusListener?.remove();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <HeaderTitleBack
        customButton={() => (
          <View style={{
            justifyContent: 'flex-end', flexDirection: 'row', flexGrow: 1, opacity: postReq.loading ? 0.5 : 1,
          }}
          >
            {postReq.loading && (
              <Spinner
                size={28}
                color="black"
                style={{

                }}
              />
            )}
            <TouchableOpacity disabled={postReq.loading} onPress={() => formikRef?.current?.handleSubmit()}>
              <Text style={{ fontSize: 18, paddingVertical: 25 }}>Save</Text>
            </TouchableOpacity>
          </View>
        )}
        onBackPress={() => props.navigation.navigate('Booking')}
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
      />
      <Formik
        innerRef={(r) => formikRef.current = r}
        initialValues={{ rate: 0, review: '' }}
        validate={(values) => {
          const errors = {};

          if (!values.review) errors.review = 'Required';
          if (values.rate == 0) errors.rate = 'Required';

          console.log(errors);

          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          const data = {
            playerId: profile.Id,
            bookingId: props.navigation.getParam('bookingId'),
            rating: values.rate,
            feedback: values.review,
          };

          return doPost({ data })
            .then(() => doPost({ url: `/Users/GetBookingById/${props.navigation.getParam('bookingId')}` }))
            .then((r) => {
              NavigationService.navigate('JobDetails', r.data);
              resetForm({ values: { rate: 0, review: '' } });
            });
        }}
      >
        {({
          handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched,
        }) => (
          <>
            <ScrollView contentContainerStyle={styles.scrollView}>
              <AirbnbRating reviews={[]} defaultRating={values.rate} onFinishRating={(r) => setFieldValue('rate', r)} />
              {errors.rate && touched.rate && <ErrorLabel style={{ textAlign: 'center' }} text={errors.rate} />}
              <View style={{ paddingHorizontal: '3%', marginTop: '5%' }}>
                <TextInput
                  style={{ color: 'black' }}
                  placeholderTextColor="rgba(0,0,0,0.3)"
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
  );
};

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
    flex: 0.3,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

export default ReviewScreen;
