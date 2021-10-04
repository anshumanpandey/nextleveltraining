import React from 'react'
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StatusBar,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native'
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button'
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from '@react-native-community/checkbox'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../state/GlobalState'

const FindCoachForm = () => {
  const [profile] = useGlobalState('profile')

  const [experience, setExperience] = React.useState(null)
  const [age, setAge] = React.useState(null)
  const [coaching, setCoaching] = React.useState(null)
  const [days, setDays] = React.useState(null)
  const [timing, setTiming] = React.useState(null)
  const [weeks, setWeaks] = React.useState(null)
  const [price, setPrice] = React.useState(null)

  const [experienceFlag, setExperienceFlag] = React.useState(true)
  const [ageFlag, setAgeFlag] = React.useState(false)
  const [coachingFlag, setCoachingFlag] = React.useState(false)
  const [daysFlag, setDaysFlag] = React.useState(false)
  const [timingFlag, setTimingFlag] = React.useState(false)
  const [weeksFlag, setWeaksFlag] = React.useState(false)
  const [successFlag, setSuccessFlag] = React.useState(false)
  const [priceFlag, setPriceFlag] = React.useState(false)

  const [loadFlag, setLoading] = React.useState(false)

  const [, saveLead] = useAxios(
    {
      url: '/Users/SaveLead',
      method: 'POST',
    },
    { manual: true },
  )

  const PlayerInfoForm = () => {
    const ExperienceComponent = () => {
      const [value, setValue] = React.useState(
        experience ? experience.value : null,
      )
      const radioProps = [
        { label: 'No Experience', value: 0 },
        { label: 'Beginner', value: 1 },
        { label: 'Intermediate', value: 2 },
        { label: 'Advance', value: 3 },
      ]

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            What is the player&apos;s current level of experience?
          </Text>
          <View style={{ width: '90%' }}>
            <RadioForm animation>
              {radioProps.map((obj, i) => (
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#00000050',
                    justifyContent: 'center',
                    marginTop: 10,
                    backgroundColor: value === i ? '#D7EBFF' : 'white',
                  }}>
                  <RadioButton labelHorizontal key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={e => {
                        setValue(e)
                        setExperience(radioProps[e])
                        setExperienceFlag(false)
                        setAgeFlag(true)
                      }}
                      borderWidth={1}
                      buttonInnerColor="#5BADFE"
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal
                      onPress={value => {
                        setValue(value)
                        setExperience(radioProps[value])
                        setExperienceFlag(false)
                        setAgeFlag(true)
                      }}
                      labelStyle={{ fontSize: 20, color: 'black', width: '100%' }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                </View>
              ))}
            </RadioForm>
          </View>
          <TouchableOpacity
            disabled={value === null}
            onPress={() => {
              if (!experience) {
              } else {
                setExperienceFlag(false)
                setAgeFlag(true)
              }
            }}
            style={{
              backgroundColor: value === null ? '#031D7050' : '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      )
    }

    const AgeComponent = () => {
      const [value, setValue] = React.useState(age ? age.value : null)
      const radioProps = [
        { label: 'Child', value: 0 },
        { label: 'Teen', value: 1 },
        { label: 'Adult', value: 2 },
      ]

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            How old is the player?
          </Text>
          <View style={{ width: '90%' }}>
            <RadioForm animation>
              {radioProps.map((obj, i) => (
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#00000050',
                    justifyContent: 'center',
                    marginTop: 10,
                    backgroundColor: value === i ? '#D7EBFF' : 'white',
                  }}>
                  <RadioButton labelHorizontal key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={e => {
                        setValue(e)
                        setAge(radioProps[e])
                        setAgeFlag(false)
                        setCoachingFlag(true)
                      }}
                      borderWidth={1}
                      buttonInnerColor="#5BADFE"
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal
                      onPress={e => {
                        setValue(value)
                        setAge(radioProps[e])
                        setAgeFlag(false)
                        setCoachingFlag(true)
                      }}
                      labelStyle={{ fontSize: 20, color: 'black', width: '100%' }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                </View>
              ))}
            </RadioForm>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setExperienceFlag(true)
                setAgeFlag(false)
              }}
              style={{
                backgroundColor: '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={value === null}
              onPress={() => {
                if (!age) {
                } else {
                  setAgeFlag(false)
                  setCoachingFlag(true)
                }
              }}
              style={{
                backgroundColor: value === null ? '#031D7050' : '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const CoachingTypeComponent = () => {
      const [toggleCheckBox1, setToggleCheckBox1] = React.useState(
        coaching ? coaching[0] : false,
      )
      const [toggleCheckBox2, setToggleCheckBox2] = React.useState(
        coaching ? coaching[1] : false,
      )
      const [toggleCheckBox3, setToggleCheckBox3] = React.useState(
        coaching ? coaching[2] : false,
      )

      const btnNextIsDisabled = () => toggleCheckBox1 === false && toggleCheckBox2 === false && toggleCheckBox3 === false

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            What type of coaching would you consider?
          </Text>
          <View style={{ width: '90%' }}>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox1 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={newValue => setToggleCheckBox1(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox1(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  1-1 coaching
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox2 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={newValue => setToggleCheckBox2(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox2(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Small group sessions
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox3 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={newValue => setToggleCheckBox3(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox3(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Large group sessions (team)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setCoachingFlag(false)
                setAgeFlag(true)
              }}
              style={{
                backgroundColor: '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={btnNextIsDisabled()}
              onPress={() => {
                if (!toggleCheckBox1 && !toggleCheckBox2 && !toggleCheckBox3) {
                } else {
                  setCoaching([
                    toggleCheckBox1,
                    toggleCheckBox2,
                    toggleCheckBox3,
                  ])
                  setCoachingFlag(false)
                  setDaysFlag(true)
                }
              }}
              style={{
                backgroundColor: btnNextIsDisabled() ? '#031D7050' : '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const DaysComponent = () => {
      const [toggleCheckBox1, setToggleCheckBox1] = React.useState(
        days ? days[0] : false,
      )
      const [toggleCheckBox2, setToggleCheckBox2] = React.useState(
        days ? days[1] : false,
      )
      const [toggleCheckBox3, setToggleCheckBox3] = React.useState(
        days ? days[2] : false,
      )
      const [toggleCheckBox4, setToggleCheckBox4] = React.useState(
        days ? days[3] : false,
      )
      const [toggleCheckBox5, setToggleCheckBox5] = React.useState(
        days ? days[4] : false,
      )
      const [toggleCheckBox6, setToggleCheckBox6] = React.useState(
        days ? days[5] : false,
      )
      const [toggleCheckBox7, setToggleCheckBox7] = React.useState(
        days ? days[6] : false,
      )

      const btnNextIsDisabled = () => toggleCheckBox1 === false &&
        toggleCheckBox2 === false &&
        toggleCheckBox3 === false &&
        toggleCheckBox4 === false &&
        toggleCheckBox5 === false &&
        toggleCheckBox6 === false &&
        toggleCheckBox7 === false

      const allIsChecked = () => toggleCheckBox1 === true &&
        toggleCheckBox2 === true &&
        toggleCheckBox3 === true &&
        toggleCheckBox4 === true &&
        toggleCheckBox5 === true &&
        toggleCheckBox6 === true &&
        toggleCheckBox7 === true

      const toggleAll = () => {
        const toggle = () => btnNextIsDisabled()
        setToggleCheckBox1(toggle)
        setToggleCheckBox2(toggle)
        setToggleCheckBox3(toggle)
        setToggleCheckBox4(toggle)
        setToggleCheckBox5(toggle)
        setToggleCheckBox6(toggle)
        setToggleCheckBox7(toggle)
      }

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 650,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            Which day(s) would you consider for coaching ?
          </Text>
          <View style={{ width: '90%' }}>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox1 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={newValue => setToggleCheckBox1(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox1(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Monday
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox2 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={newValue => setToggleCheckBox2(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox2(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Tuesday
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox3 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={newValue => setToggleCheckBox3(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox3(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Wednesday
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox4 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox4}
                onValueChange={newValue => setToggleCheckBox4(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox4(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Thursday
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox5 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox5}
                onValueChange={newValue => setToggleCheckBox5(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox5(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Friday
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox6 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox6}
                onValueChange={newValue => setToggleCheckBox6(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox6(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Saturday
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox7 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox7}
                onValueChange={newValue => setToggleCheckBox7(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox7(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Sunday
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: allIsChecked() ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={allIsChecked()}
                onTouchEnd={toggleAll}
              />
              <TouchableOpacity
                onPress={toggleAll}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  All Day
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setDaysFlag(false)
                setCoachingFlag(true)
              }}
              style={{
                backgroundColor: '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={btnNextIsDisabled()}
              onPress={() => {
                if (
                  !toggleCheckBox1 &&
                  !toggleCheckBox2 &&
                  !toggleCheckBox3 &&
                  !toggleCheckBox4 &&
                  !toggleCheckBox5 &&
                  !toggleCheckBox6 &&
                  !toggleCheckBox7
                ) {
                } else {
                  setDays([
                    toggleCheckBox1,
                    toggleCheckBox2,
                    toggleCheckBox3,
                    toggleCheckBox4,
                    toggleCheckBox5,
                    toggleCheckBox6,
                    toggleCheckBox7,
                  ])
                  setDaysFlag(false)
                  setTimingFlag(true)
                }
              }}
              style={{
                backgroundColor: btnNextIsDisabled() ? '#031D7050' : '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const TimingComponent = () => {
      const [toggleCheckBox1, setToggleCheckBox1] = React.useState(
        timing ? timing[0] : false,
      )
      const [toggleCheckBox2, setToggleCheckBox2] = React.useState(
        timing ? timing[1] : false,
      )
      const [toggleCheckBox3, setToggleCheckBox3] = React.useState(
        timing ? timing[2] : false,
      )
      const [toggleCheckBox4, setToggleCheckBox4] = React.useState(
        timing ? timing[3] : false,
      )
      const [toggleCheckBox5, setToggleCheckBox5] = React.useState(
        timing ? timing[4] : false,
      )

      const btnNextIsDisabled = () => toggleCheckBox1 === false &&
        toggleCheckBox2 === false &&
        toggleCheckBox3 === false &&
        toggleCheckBox4 === false &&
        toggleCheckBox5 === false

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 550,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            Which time(s) of day would you consider for coaching ?
          </Text>
          <View style={{ width: '90%' }}>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox1 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={newValue => setToggleCheckBox1(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox1(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Early morning (06:00 - 09:00)
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox2 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={newValue => setToggleCheckBox2(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox2(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Late morning (09:00 - 12:00)
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox3 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={newValue => setToggleCheckBox3(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox3(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Early afternoon (12:00 - 15:00)
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox4 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox4}
                onValueChange={newValue => setToggleCheckBox4(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox4(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Late afternoon (15:00 - 18:00)
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: '100%',
                height: 50,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#00000050',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                marginTop: 10,
                backgroundColor: toggleCheckBox5 ? '#D7EBFF' : 'white',
              }}>
              <CheckBox
                style={{ height: '40%' }}
                disabled={false}
                value={toggleCheckBox5}
                onValueChange={newValue => setToggleCheckBox5(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox5(prev => !prev)
                }}
                activeOpacity={1}
                style={{ width: '80%' }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    width: '100%',
                    height: '100%',
                    marginTop: 25,
                  }}>
                  Evening (18:00 - 22:00)
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setTimingFlag(false)
                setDaysFlag(true)
              }}
              style={{
                backgroundColor: '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={btnNextIsDisabled()}
              onPress={() => {
                if (
                  !toggleCheckBox1 &&
                  !toggleCheckBox2 &&
                  !toggleCheckBox3 &&
                  !toggleCheckBox4 &&
                  !toggleCheckBox5
                ) {
                } else {
                  setTiming([
                    toggleCheckBox1,
                    toggleCheckBox2,
                    toggleCheckBox3,
                    toggleCheckBox4,
                    toggleCheckBox5,
                  ])
                  setTimingFlag(false)
                  setPriceFlag(true)
                }
              }}
              style={{
                backgroundColor: btnNextIsDisabled() ? '#031D7050' : '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const PriceComponent = () => {
      const [value, setValue] = React.useState(price ? price.value : null)
      const radioProps = [
        { label: '£10', value: 0 },
        { label: '£20', value: 1 },
        { label: '£30', value: 2 },
        { label: '£40', value: 3 },
        { label: '£50', value: 4 },
        { label: 'No Limit Depends on coach', value: 5 },
      ]

      const btnIsDisabled = () => value === null

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            Maximum Price Per Hour ?
          </Text>
          <View style={{ width: '90%' }}>
            <RadioForm animation>
              {radioProps.map((obj, i) => (
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#00000050',
                    justifyContent: 'center',
                    marginTop: 10,
                    backgroundColor: value === i ? '#D7EBFF' : 'white',
                  }}>
                  <RadioButton labelHorizontal key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={value => {
                        setValue(value)
                        setPrice(radioProps[value])
                        setPriceFlag(false)
                        setWeaksFlag(true)
                      }}
                      borderWidth={1}
                      buttonInnerColor="#5BADFE"
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal
                      onPress={value => {
                        setValue(value)
                        setPrice(radioProps[value])
                        setPriceFlag(false)
                        setWeaksFlag(true)
                      }}
                      labelStyle={{
                        fontSize: 20,
                        color: 'black',
                        width: '100%',
                      }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                </View>
              ))}
            </RadioForm>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setPriceFlag(false)
                setTimingFlag(true)
              }}
              style={{
                backgroundColor: '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={btnIsDisabled()}
              onPress={() => {
                if (!price) {
                } else {
                  setPriceFlag(false)
                  setWeaksFlag(true)
                }
              }}
              style={{
                backgroundColor: btnIsDisabled() ? '#031D7050' : '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const TrainTimeComponent = () => {
      const [value, setValue] = React.useState(weeks ? weeks.value : null)
      const radioProps = [
        { label: '1', value: 0 },
        { label: '2', value: 1 },
        { label: '3', value: 2 },
        { label: '4 +', value: 3 },
      ]

      const btnNextIsDisabled = () => value === null

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 450,
            marginBottom: 20,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
            How many times a week does the player want to train?
          </Text>
          <View style={{ width: '90%' }}>
            <RadioForm animation>
              {radioProps.map((obj, i) => (
                <View
                  style={{
                    width: '100%',
                    height: 50,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#00000050',
                    justifyContent: 'center',
                    marginTop: 10,
                    backgroundColor: value === i ? '#D7EBFF' : 'white',
                  }}>
                  <RadioButton labelHorizontal key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={value => {
                        setValue(value)
                        setWeaks(radioProps[value])
                        // setWeaksFlag(false)
                        // setSuccessFlag(true)
                      }}
                      borderWidth={1}
                      buttonInnerColor="#5BADFE"
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{ marginLeft: 10 }}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal
                      onPress={value => {
                        setValue(value)
                        setWeaks(radioProps[value])
                        // setWeaksFlag(false)
                        // setSuccessFlag(true)
                        // setNameFlag(true)
                      }}
                      labelStyle={{ fontSize: 20, color: 'black', width: '100%' }}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                </View>
              ))}
            </RadioForm>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setWeaksFlag(false)
                setPriceFlag(true)
              }}
              style={{
                backgroundColor: '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={btnNextIsDisabled()}
              onPress={() => {
                if (!weeks) {
                } else {
                  setLoading(true)
                  const coachingArr = []
                  const daysArr = []
                  const timingArr = []
                  if (coaching[0]) {
                    coachingArr.push('1-1 coaching')
                  }
                  if (coaching[1]) {
                    coachingArr.push('Small group sessions')
                  }
                  if (coaching[2]) {
                    coachingArr.push('Large group sessions (team)')
                  }

                  if (days[0]) {
                    daysArr.push('Monday')
                  }
                  if (days[1]) {
                    daysArr.push('Tuesday')
                  }
                  if (days[2]) {
                    daysArr.push('Wednesday')
                  }
                  if (days[3]) {
                    daysArr.push('Thursday')
                  }
                  if (days[4]) {
                    daysArr.push('Friday')
                  }
                  if (days[5]) {
                    daysArr.push('Saturday')
                  }
                  if (days[6]) {
                    daysArr.push('Sunday')
                  }

                  if (timing[0]) {
                    timingArr.push('Early morning (06:00 - 09:00)')
                  }
                  if (timing[1]) {
                    timingArr.push('Late morning (09:00 - 12:00)')
                  }
                  if (timing[2]) {
                    timingArr.push('Early afternoon (12:00 - 15:00)')
                  }
                  if (timing[3]) {
                    timingArr.push('Late afternoon (15:00 - 18:00)')
                  }
                  if (timing[4]) {
                    timingArr.push('Evening (18:00 - 22:00)')
                  }

                  const data = {
                    fullName: profile.FullName,
                    emailID: profile.EmailID,
                    mobileNo: profile.MobileNo,
                    location: profile.State,
                    experience: experience.label,
                    age: age.label,
                    coachingType: coachingArr,
                    days: daysArr,
                    coachingTime: timingArr,
                    maximumPrice: price.label,
                    daysOfWeek: [weeks.label],
                  }
                  saveLead({ data })
                    .then(() => {
                      setWeaksFlag(false)
                      setLoading(false)
                      setSuccessFlag(true)
                      AsyncStorage.removeItem("justRegistered")
                    })
                    .catch(() => {
                      setLoading(false)
                      Alert.alert('Error', 'Something went wrong, Try Again.')
                      // console.log('error', e)
                    })
                }
              }}
              style={{
                backgroundColor: btnNextIsDisabled() ? '#031D7050' : '#031D70',
                width: '40%',
                height: 45,
                alignSelf: 'center',
                borderRadius: 5,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )
    }

    const NameComponent = () => (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          height: 350,
          marginBottom: 20,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
          Name
        </Text>
        <View style={{ width: '90%' }}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#00000050',
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: 'white',
            }}>
            <TextInput
              placeholder="Enter your name"
              style={{ width: '100%', paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setNameFlag(false)
              setWeaksFlag(true)
            }}
            style={{
              backgroundColor: '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              PREVIOUS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setNameFlag(false)
              setEmailFlag(true)
            }}
            style={{
              backgroundColor: '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    const EmailComponent = () => (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          height: 350,
          marginBottom: 20,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
          Email
        </Text>
        <View style={{ width: '90%' }}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#00000050',
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: 'white',
            }}>
            <TextInput
              placeholder="Enter your email"
              style={{ width: '100%', paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setEmailFlag(false)
              setNameFlag(true)
            }}
            style={{
              backgroundColor: '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              PREVIOUS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setEmailFlag(false)
              setPhoneFlag(true)
            }}
            style={{
              backgroundColor: '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )

    const SuccessComponent = () => (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          height: 350,
          marginBottom: 20,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text
          style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
          {`Lead created successfully. \n A coach will contact you.`}
        </Text>
      </View>
    )

    const PhoneComponent = () => (
      <View
        style={{
          width: '95%',
          alignSelf: 'center',
          borderRadius: 10,
          height: 350,
          marginBottom: 20,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <Text style={{ fontSize: 20, fontWeight: '500', textAlign: 'center' }}>
          Phone
        </Text>
        <View style={{ width: '90%' }}>
          <View
            style={{
              width: '100%',
              height: 50,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#00000050',
              justifyContent: 'center',
              marginTop: 10,
              backgroundColor: 'white',
            }}>
            <TextInput
              placeholder="Enter your phone number"
              style={{ width: '100%', paddingLeft: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
          }}>
          <TouchableOpacity
            onPress={() => {
              setPhoneFlag(false)
              setEmailFlag(true)
            }}
            style={{
              backgroundColor: '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              PREVIOUS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              backgroundColor: '#031D70',
              width: '40%',
              height: 45,
              alignSelf: 'center',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'white' }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )

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
            {experienceFlag && <ExperienceComponent />}
            {ageFlag && <AgeComponent />}
            {coachingFlag && <CoachingTypeComponent />}
            {daysFlag && <DaysComponent />}
            {timingFlag && <TimingComponent />}
            {priceFlag && <PriceComponent />}
            {weeksFlag && <TrainTimeComponent />}
            {successFlag && <SuccessComponent />}
            {/* {nameFlag && <NameComponent />}
            {emailFlag && <EmailComponent />}
            {phoneFlag && <PhoneComponent />} */}
          </ScrollView>
        </SafeAreaView>
        {loadFlag && (
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

  return <PlayerInfoForm />
}

export default FindCoachForm
