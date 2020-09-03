import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Input as TextInput, Icon } from 'native-base';
import styles from './styles';
import { CheckBox } from 'native-base';
import HeaderClosePlus from '../../components/header/HeaderClosePlus';
import NavigationService from '../../navigation/NavigationService';
import ErrorLabel from '../../components/ErrorLabel';
import { Formik, FieldArray } from 'formik';
import useAxios from 'axios-hooks'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';
import { ScrollView } from 'react-native-gesture-handler';

const options = [
  { Qualification: "Level 1" },
  { Qualification: "Level 2-Certificate in Coaching Football" },
  { Qualification: "Level 3-UEFA B Licence" },
  { Qualification: "Level 4-UEFA A Licence" },
  { Qualification: "Level 5-UEFA Pro Licence" },
]


const AddTeam = (props) => {
  const [profile] = useGlobalState("profile")
  const formikRef = useRef()

  const [postTeamReq, postQulifications] = useAxios({
    url: '/Users/SaveQualification',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  console.log(props.navigation.getParam("Qualifications"))

  return (
    <Formik
      innerRef={(r) => formikRef.current = r}
      initialValues={{
        qualifications: props.navigation.getParam("Qualifications", []).length != 0 ? props.navigation.getParam("Qualifications")?.filter(q => options.map(e => e.Qualification).includes(q.Qualification) == true) : [],
        addOther: props.navigation.getParam("Qualifications", []).length ? props.navigation.getParam("Qualifications").find(q => options.map(e => e.Qualification).includes(q.Qualification) == false) != null : false,
        otherQualification: props.navigation.getParam("Qualifications", []).length ? props.navigation.getParam("Qualifications").find(q => options.map(e => e.Qualification).includes(q.Qualification) == false)?.Qualification : undefined,
        extraQualifications: props.navigation.getParam("Qualifications", []).length != 0 ? props.navigation.getParam("Qualifications")?.filter(q => options.map(e => e.Qualification).includes(q.Qualification) == false) : [],
      }}
      validate={(values) => {
        const errors = {}

        if (!values.qualifications) errors.qualifications = 'Required'

        return errors
      }}
      onSubmit={values => {
        const data = values.qualifications || []
        data.push(...values.extraQualifications)
        console.log(data)
        postQulifications({ data })
          .then(() => getUserData())
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            console.log(r.data)
            if (HasCompletedVerificationProcess(profile)) {
              NavigationService.navigate("AboutMe")
            } else {
              NavigationService.goBack()
            }
          })
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <HeaderClosePlus
              onGoBack={props?.navigation?.getParam("goBackTo", undefined) ? () => {
                if (HasCompletedVerificationProcess(profile)) {
                  NavigationService.navigate(props?.navigation?.getParam("goBackTo", undefined))
                } else {
                  NavigationService.goBack()
                }
              } : undefined}
              isLoading={postTeamReq.loading || getUserReq.loading}
              isSaveButton={true}
              saveOnPress={handleSubmit}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ flexGrow: 1, padding: 30 }}>
              <View style={{ flexGrow: 1 }}>
                {options.map(option => {
                  const fn = () => {
                    const found = values.qualifications.findIndex(i => option.Qualification == i.Qualification)
                    if (found == -1) {
                      setFieldValue('qualifications', [...values.qualifications, option])
                    } else {
                      setFieldValue('qualifications', [...values.qualifications.filter((_, idx) => idx != found)])
                    }
                  }
                  return (
                    <View style={{ height: '10%', justifyContent: 'space-between', width: '95%', alignItems: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.1)' }}>
                      <TouchableOpacity
                        style={{ justifyContent: 'flex-start', width: '95%' }}
                        onPress={fn}>
                        <View style={{ marginLeft: '5%', flex: 1, alignItems: 'flex-start' }}>
                          <Text style={{ fontSize: 16, padding: '3%' }}>{option.Qualification}</Text>
                        </View>
                      </TouchableOpacity>
                      <CheckBox
                        checked={values.qualifications.find(i => i.Qualification == option.Qualification) != null}
                        onPress={fn} />
                    </View>
                  );
                })}
                <View style={{ height: '15%' }}>
                  <FieldArray
                    name="extraQualifications"
                    render={arrayHelpers => (
                      <View>
                        {values.extraQualifications && values.extraQualifications.length > 0 ? (
                          values.extraQualifications.map((extraQualification, index) => (
                            <View key={index} style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: '5%', marginBottom: '4%' }}>
                              <View style={{ width: '85%', height: 35 }}>
                                <TextInput
                                  onChangeText={(txt) => arrayHelpers.replace(index, { Qualification: txt })}
                                  value={extraQualification.Qualification}
                                  placeholder="Type Here..."
                                  style={{
                                    width: '100%',
                                    fontSize: 16,
                                    height: 55,
                                    color: 'black'
                                  }}
                                />
                              </View>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  style={{ padding: '3%', marginRight: '5%'}}
                                  type="button"
                                  onPress={() => arrayHelpers.remove(index)}>
                                  <Icon type="AntDesign" name="close" style={{ fontSize: 22 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ padding: '3%'}} onPress={() => arrayHelpers.insert(index, { Qualification: '' })}>
                                  <Icon type="AntDesign" name="plus" style={{ fontSize: 22 }} />
                                </TouchableOpacity>
                              </View>
                            </View>
                          ))
                        ) : (
                            <TouchableOpacity style={{ marginBottom: '3%' }} onPress={() => arrayHelpers.push({ Qualification: ''})}>
                              <Text style={{ fontSize: 18 }}>Add Other Qualification</Text>
                            </TouchableOpacity>
                          )}
                      </View>
                    )}
                  />
                </View>
              </View>
              {errors.qualifications && touched.qualifications && <ErrorLabel text={errors.qualifications} />}

            </View>
          </ScrollView>
        </>
      )}
    </Formik>
  );
};

export default AddTeam;
