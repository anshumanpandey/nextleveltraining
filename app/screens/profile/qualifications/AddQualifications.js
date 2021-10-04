import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Formik, FieldArray } from 'formik';
import useAxios from 'axios-hooks'
import { ScrollView } from 'react-native-gesture-handler';
import HeaderClosePlus from '../../../components/header/HeaderClosePlus';
import NavigationService from '../../../navigation/NavigationService';
import ErrorLabel from '../../../components/ErrorLabel';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../../state/GlobalState';
import HasCompletedVerificationProcess from '../../../utils/HasCompletedVerificationProcess';
import QualificationItem from './QualificationItem';
import QualificationInput from './QualificationInput';

const options = [
  { Qualification: "Level 1" },
  { Qualification: "Level 2-Certificate in Coaching Football" },
  { Qualification: "Level 3-UEFA B Licence" },
  { Qualification: "Level 4-UEFA A Licence" },
  { Qualification: "Level 5-UEFA Pro Licence" },
]

const noQualificationFilled = (qualifications, extraQualifications) => Array.isArray(qualifications) && qualifications.every(i => i.Qualification === "") &&
  Array.isArray(extraQualifications) && extraQualifications.every(i => i.Qualification === "")


const AddTeam = (props) => {
  const { navigation } = props;
  const [profile] = useGlobalState("profile")
  const formikRef = useRef()

  const [postTeamReq, postQulifications] = useAxios({
    url: '/Users/SaveQualification',
    method: 'POST'
  }, { manual: true })

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetUser',
  }, { manual: true })

  return (
    <Formik
      innerRef={(r) => { formikRef.current = r }}
      initialValues={{
        qualifications: navigation.getParam("Qualifications", []).length !== 0 ? navigation.getParam("Qualifications")?.filter(q => options.map(e => e.Qualification).includes(q.Qualification) === true) : [],
        addOther: navigation.getParam("Qualifications", []).length ? navigation.getParam("Qualifications").find(q => options.map(e => e.Qualification).includes(q.Qualification) === false) != null : false,
        otherQualification: navigation.getParam("Qualifications", []).length ? navigation.getParam("Qualifications").find(q => options.map(e => e.Qualification).includes(q.Qualification) === false)?.Qualification : undefined,
        extraQualifications: navigation.getParam("Qualifications", []).length !== 0 ? navigation.getParam("Qualifications")?.filter(q => options.map(e => e.Qualification).includes(q.Qualification) === false) : [],
      }}
      validate={(values) => {
        const errors = {}

        const noQualification = noQualificationFilled(values.qualifications, values.extraQualifications)

        if (!values.qualifications) {
          errors.qualifications = 'At least one qualification is required'
        } else if (noQualification === true) {
          errors.qualifications = 'At least one qualification is required'
        }

        return errors
      }}
      onSubmit={values => {
        const data = values.qualifications || []
        data.push(...values.extraQualifications.filter(i => i.Qualification !== ""))
        console.log("aaaaaa", { data })
        postQulifications({ data })
          .then(() => getUserData())
          .then((r) => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data })
            console.log(r.data)
            if (HasCompletedVerificationProcess(profile)) {
              NavigationService.navigate(props?.navigation?.getParam("goBackTo", "AboutMe"))
            } else {
              NavigationService.goBack()
            }
          })
      }}
    >
      {({ handleSubmit, setFieldValue, values, errors, touched }) => (
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
              isSaveButton
              saveOnPress={() => {
                const noQualification = noQualificationFilled(values.qualifications, values.extraQualifications)
                if (noQualification === true) {
                  Alert.alert("Alert", "Please select any Qualification")
                }

                handleSubmit()
              }}
            />
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ flexGrow: 1, padding: 30 }}>
              <View style={{ flexGrow: 1 }}>
                {options.map(option => {
                  const fn = () => {
                    const found = values.qualifications.findIndex(i => option.Qualification === i.Qualification)
                    if (found === -1) {
                      setFieldValue('qualifications', [...values.qualifications, option])
                    } else {
                      setFieldValue('qualifications', [...values.qualifications.filter((_, idx) => idx !== found)])
                    }
                  }
                  const isChecked = values.qualifications.find(i => i.Qualification === option.Qualification) !== undefined

                  return (
                    <QualificationItem
                      onCheck={fn}
                      label={option.Qualification}
                      isChecked={isChecked}
                    />
                  );
                })}
                <View style={{ height: '15%' }}>
                  <FieldArray
                    name="extraQualifications"
                    render={arrayHelpers => {
                      const maxQualificationAmount = 5
                      const hitQualificationsLimit = maxQualificationAmount === values.extraQualifications.length
                      return (
                        <View>
                          {values.extraQualifications && values.extraQualifications.length > 0 ? (
                            values.extraQualifications.map((extraQualification, index) => {
                              const onAddMorePress = () => {
                                if (hitQualificationsLimit === false) {
                                  arrayHelpers.insert(index + 1, { Qualification: '' })
                                }
                              }
                              const onRemovePress = () => arrayHelpers.remove(index)
                              const onChangeText = (txt) => arrayHelpers.replace(index, { Qualification: txt })
                              return (
                                <QualificationInput
                                  disabledPlusBtn={hitQualificationsLimit}
                                  key={`${index.toString()}-item`}
                                  onAddMorePress={onAddMorePress}
                                  onRemovePress={onRemovePress}
                                  onChangeText={onChangeText}
                                  label={extraQualification.Qualification}
                                />
                              )
                            })
                          ) : (
                            <TouchableOpacity style={{ marginBottom: '3%' }} onPress={() => {
                              if (hitQualificationsLimit === false) {
                                arrayHelpers.push({ Qualification: '' })
                              }
                            }}>
                              <Text style={{ fontSize: 18 }}>Add Other Qualification</Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      )
                    }}
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
