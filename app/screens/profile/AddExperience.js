import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Icon } from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import DatePicker from 'react-native-datepicker';
import ErrorLabel from '../../components/ErrorLabel';
import { Formik } from 'formik';
import useAxios from 'axios-hooks'
import moment from 'moment'
import { compose } from 'redux';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';


const AddTeam = (props) => {
  const cb = props.navigation.state.params.cb;

  const [postTeamReq, postTeam] = useAxios({
    url: '/Users/SaveExperience',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <Formik
      initialValues={{
        experienceId: props.navigation.state.params.Id || undefined,
        jobPosition: props.navigation.state.params.JobPosition || '',
        club: props.navigation.state.params.Club || '',
        startDate: props.navigation.state.params.StartDate ? moment(props.navigation.state.params.StartDate) : '',
        endDate: props.navigation.state.params.EndDate ? moment(props.navigation.state.params.EndDate) : '',
        currentlyWorking: props.navigation.state.params.CurrentlyWorking || false,
      }}
      validate={(values) => {
        const errors = {}

        if (!values.jobPosition) errors.jobPosition = 'Required'
        if (!values.club) errors.club = 'Required'
        if (!values.startDate) errors.startDate = 'Required'
        if (!values.currentlyWorking) {
          if (!values.endDate) errors.endDate = 'Required'
        }

        return errors
      }}
      onSubmit={values => {
        const data = {
          "experienceId": values.experienceId || undefined,
          "jobPosition": values.jobPosition,
          "club": values.club,
          "startDate": values.startDate,
          "endDate": values.endDate,
          "currentlyWorking": values.currentlyWorking
        }
        if (values.currentlyWorking) {
          delete data.endDate
        }
        postTeam({ data })
          .then(r => getUserData())
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            NavigationService.goBack()
          })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <>
          <View>
            <HeaderClosePlus
              isLoading={postTeamReq.loading || getUserReq.loading}
              isSaveButton={true}
              saveOnPress={handleSubmit}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ padding: 30 }}>
              <View style={styles.inputContain}>
                <TextInput
                  style={{ textAlign: 'left', padding: Dimension.px10, fontSize: 15, width: '100%' }}
                  placeholder="Team Name"
                  keyboardType="email-address"
                  onChangeText={handleChange('jobPosition')}
                  onBlur={handleBlur('jobPosition')}
                  value={values.jobPosition}
                />
              </View>
              {errors.jobPosition && touched.jobPosition && <ErrorLabel text={errors.jobPosition} />}

              <View style={styles.inputContain}>
                <TextInput
                  style={{ textAlign: 'left', padding: Dimension.px10, fontSize: 15, width: '100%' }}
                  placeholder="Club Name"
                  keyboardType="email-address"
                  onChangeText={handleChange('club')}
                  onBlur={handleBlur('club')}
                  value={values.club}
                />
              </View>
              {errors.club && touched.club && <ErrorLabel text={errors.club} />}



                  <Text style={styles.timePeriod}>Time Period</Text>

                  <View style={styles.pickerView}>
                    <View>
                      <Text style={styles.dateText}>FROM</Text>
                      <DatePicker
                        mode="date"
                        date={values.startDate}
                        format="DD-MM-YYYY"
                        placeholder={'Select Date'}
                        showIcon={false}
                        customStyles={styles.dateInputs}
                        cancelBtnText="Cancel"
                        confirmBtnText="Confirm"
                        onDateChange={(_, date) => {
                          setFieldValue("startDate", date)
                        }}
                      />
                      {errors.startDate && touched.startDate && <ErrorLabel text={errors.startDate} />}
                    </View>


                    <View>
                      <Text style={styles.dateText}>TO</Text>
                      <DatePicker
                        disabled={values.currentlyWorking}
                        mode="date"
                        date={values.endDate}
                        format="DD-MM-YYYY"
                        placeholder={'Select Date'}
                        showIcon={false}
                        customStyles={styles.dateInputs}
                        cancelBtnText="Cancel"
                        confirmBtnText="Confirm"
                        onDateChange={(_, date) => {
                          setFieldValue("endDate", date)
                        }}
                      />
                      {errors.endDate && touched.endDate && <ErrorLabel text={errors.endDate} />}
                    </View>

                  </View>

              <TouchableOpacity
                onPress={() => setFieldValue("currentlyWorking", !values.currentlyWorking)}
                style={styles.checkView}>
                <Icon
                  name={values.currentlyWorking ? 'check-square' : 'square'}
                  type="Feather"
                  style={styles.checkIcon}
                />
                <Text style={styles.checkText}>Currently Coaching</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddTeam;
