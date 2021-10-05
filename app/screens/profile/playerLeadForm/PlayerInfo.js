import React, { useRef, useEffect } from 'react';
import { ActivityIndicator, View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import {
  useGlobalState,
} from '../../../state/GlobalState';

import Experience from './Experience';
import Age from './Age';
import CoachingType from './CoachingType';
import CoachingDays from './CoachingDays';
import CoachingSessions from './CoachingSessions';
import PricePerHour from './PricePerHour';
import TimerPerWeek from './TimerPerWeek';
import SuccessMessage from './SuccessMessage';

const PlayerInfoForm = ({ navigation }) => {
  const formikRef = useRef();
  const [profile] = useGlobalState('profile');

  const [{ loading: loadingLead }, getLead] = useAxios({
    url: `/Users/GetLead/${profile.Id}`,
    method: "GET"
  },
    { manual: true },
  )

  const [{ loading: savingLead }, saveLead] = useAxios({
    url: '/Users/SaveLead',
    method: 'POST',
  },
    { manual: true },
  )

  const isFetching = () => savingLead || loadingLead

  useEffect(() => {
    const focusListener = navigation?.addListener('didFocus', () => {
      getLead()
        .then(({ data }) => {
          formikRef.current.setValues({
            experience: data.Experience,
            age: data.Age,
            coachingType: data.CoachingType,
            coachingDays: data.Days,
            coachingSessions: data.CoachingTime,
            timesPerWeeks: data.DaysOfWeek[0],
            pricePerHour: data.MaximumPrice,
            currentStep: 0,
          })
        })
        .catch(err => console.log({ err }))
    });

    return () => focusListener?.remove();
  }, [navigation]);


  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <SafeAreaView
        style={{
          backgroundColor: '#1967CD',
          height: '100%',
          justifyContent: 'center',
        }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
            height: 750,
          }}>
          <Text
            style={{
              color: 'white',
              width: '100%',
              marginBottom: 20,
              textAlign: 'center',
              fontSize: 25,
              fontWeight: '500',
            }}>
            Enter Player Details
          </Text>
          <Formik
            innerRef={r => { formikRef.current = r }}
            initialStatus={{ success: false }}
            initialValues={{
              experience: '',
              age: '',
              coachingType: [],
              coachingDays: [],
              coachingSessions: [],
              timesPerWeeks: '',
              pricePerHour: '',
              currentStep: 0,
            }}
            onSubmit={(values, extras) => {
              const data = {
                fullName: profile.FullName,
                emailID: profile.EmailID,
                mobileNo: profile.MobileNo,
                location: profile.State,
                experience: values.experience,
                age: values.age,
                coachingType: values.coachingType,
                days: values.coachingDays,
                coachingTime: values.coachingSessions,
                maximumPrice: values.pricePerHour,
                daysOfWeek: [values.timesPerWeeks],
              }

              saveLead({ data })
                .then(() => {
                  extras.setStatus({ success: true })
                  extras.setFieldValue("currentStep", 7)

                  setTimeout(() => { navigation.navigate("Home") }, 2000)
                  setTimeout(() => {
                    extras.setFieldValue("currentStep", 0)
                    extras.setStatus({ success: false })
                  }, 2500)
                })
            }}>
            {({ values, status }) => (
              <>
                {values.currentStep === 0 && <Experience />}
                {values.currentStep === 1 && <Age />}
                {values.currentStep === 2 && <CoachingType />}
                {values.currentStep === 3 && <CoachingDays />}
                {values.currentStep === 4 && <CoachingSessions />}
                {values.currentStep === 5 && <PricePerHour />}
                {values.currentStep === 6 && <TimerPerWeek />}
                {status.success === true && <SuccessMessage />}
              </>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
      {isFetching() && (
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#00000020',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
          }}>
          <ActivityIndicator color="white" size="large" />
        </View>
      )}
    </>
  )
}

export default PlayerInfoForm;