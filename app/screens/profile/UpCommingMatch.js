import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { Formik } from 'formik';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import Dimension from '../../constants/dimensions';
import DatePicker from 'react-native-datepicker';
import ErrorLabel from '../../components/ErrorLabel';
import useAxios from 'axios-hooks'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';

const UpComingMatch = (props) => {
  const cb = props.navigation.state.params.cb;


  const [postMatchReq, postMatch] = useAxios({
    url: '/Users/SaveUpcomingMatch',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <Formik
      initialValues={{
        upcomingMatchID: props.navigation.getParam("Id") || undefined,
        teamName: props.navigation.getParam("TeamName") || '',
        matchDate: props.navigation.getParam("MatchDate") || '',
      }}
      validate={(values) => {
        const errors = {}

        if (!values.teamName) errors.teamName = 'Required'
        if (!values.matchDate) errors.matchDate = 'Required'

        return errors
      }}
      onSubmit={values => {
        const data = values
        postMatch({ data })
        .then(r => getUserData())
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
              isLoading={postMatchReq.loading || getUserReq.loading}
              isSaveButton={true}
              saveOnPress={handleSubmit}
            />
            <View style={{ padding: 30 }}>
              <Text style={styles.titleText}>Playing Against Team Name</Text>
              <View style={[styles.inputContain, { marginTop: 0 }]}>
                <TextInput
                  style={{ textAlign: 'left', padding: Dimension.px10, width: '100%',fontSize: 15 }}
                  onChangeText={handleChange('teamName')}
                  onBlur={handleBlur('teamName')}
                  value={values.teamName}
                />
              </View>
              {errors.teamName && touched.teamName && <ErrorLabel text={errors.teamName} />}

              <Text style={[styles.titleText, { marginTop: 20 }]}>Match Date</Text>

              <View style={[styles.pickerView, { marginTop: Dimension.px15 }]}>
                <View style={{ width: '100%'}}>
                <DatePicker
                  mode="date"
                  date={values.matchDate}
                  format="DD-MM-YYYY"
                  placeholder={'Select Date'}
                  showIcon={false}
                  customStyles={styles.dateInputs}
                  cancelBtnText="Cancel"
                  confirmBtnText="Confirm"
                  onDateChange={(_, date) => {
                    setFieldValue("matchDate",date)
                  }}
                />
                {errors.matchDate && touched.matchDate && <ErrorLabel text={errors.matchDate} />}
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </Formik>
  );
};

export default UpComingMatch;
