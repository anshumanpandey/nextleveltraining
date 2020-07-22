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
    url: '/Users/SaveTeam',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <Formik
      initialValues={{
        teamID: props.navigation.getParam("Id") || undefined,
        teamName: props.navigation.getParam("TeamName") || '',
        startDate: props.navigation.getParam("StartDate") || '',
        endDate: props.navigation.getParam("EndDate") || '',
        isChecked: props.navigation.getParam("IsChecked") || false,
      }}
      validate={(values) => {
        const errors = {}

        if (!values.teamName) errors.teamName = 'Required'
        if (!values.startDate) errors.startDate = 'Required'
        if (values.isChecked == false) {
          if (!values.endDate) errors.endDate = 'Required'
        }

        return errors
      }}
      onSubmit={values => {
        const data = {
          teamID: values.teamID,
          teamName: values.teamName,
          startDate: values.startDate,
          endDate: values.endDate
        }

        if (values.isChecked == true) {
          delete data.endDate
        }

        postTeam({ data })
        .then(r => {
          console.log(r.data)
          return getUserData()
        })
        .then((r) => {
          dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data})
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
                  onChangeText={(text) => setTeamName(text)}
                  style={{ textAlign: 'left', padding: Dimension.px10, fontSize: 15, width: '100%' }}
                  placeholder="Team Name"
                  keyboardType="email-address"
                  onChangeText={handleChange('teamName')}
                  onBlur={handleBlur('teamName')}
                  value={values.teamName}
                />
              </View>
              {errors.teamName && touched.teamName && <ErrorLabel text={errors.teamName} />}

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
                    disabled={values.isChecked}
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
                onPress={() => setFieldValue("isChecked",!values.isChecked)}
                style={styles.checkView}>
                <Icon
                  name={values.isChecked ? 'check-square' : 'square'}
                  type="Feather"
                  style={styles.checkIcon}
                />
                <Text style={styles.checkText}>Currently playing with</Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default AddTeam;
