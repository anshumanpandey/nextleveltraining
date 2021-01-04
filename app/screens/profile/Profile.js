import React, {useState, useEffect} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
} from 'react-native';
import {Icon} from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from './styles';
import UserCard from './UserCard';
import TeamMatchCard from './TeamMatchCard';
import TeamUpComingCard from './TeamUpComingCard';
import NavigationService from '../../navigation/NavigationService';
import {pickImage} from '../../helpers/ImagePicker';
import {
  useGlobalState,
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState';
import AsyncStorage from '@react-native-community/async-storage';
import ImageProgress from 'react-native-image-progress';
import {NavigationActions, StackActions} from 'react-navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import CheckBox from '@react-native-community/checkbox';

const PlayerProfile = (props) => {
  const [triggerChange, setTriggerChange] = useState(true);
  const [profilePic, setProfilePic] = useState();
  const [submit, setSubmit] = useState(false);
  const [profile] = useGlobalState('profile');
  const [token] = useGlobalState('token');
  const {user, AboutUs, Achievements, Teams, UpcomingMatches} = profile;

  const [experience, setExperience] = React.useState(null);
  const [age, setAge] = React.useState(null);
  const [coaching, setCoaching] = React.useState(null);
  const [days, setDays] = React.useState(null);
  const [timing, setTiming] = React.useState(null);
  const [weeks, setWeaks] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [phone, setPhone] = React.useState(null);

  const [experienceFlag, setExperienceFlag] = React.useState(true);
  const [ageFlag, setAgeFlag] = React.useState(false);
  const [coachingFlag, setCoachingFlag] = React.useState(false);
  const [daysFlag, setDaysFlag] = React.useState(false);
  const [timingFlag, setTimingFlag] = React.useState(false);
  const [weeksFlag, setWeaksFlag] = React.useState(false);
  const [nameFlag, setNameFlag] = React.useState(false);
  const [emailFlag, setEmailFlag] = React.useState(false);
  const [phoneFlag, setPhoneFlag] = React.useState(false);

  const resolveProfilePic = () => {
    if (profile?.ProfileImage) {
      setProfilePic({uri: profile.ProfileImage});
    } else {
      AsyncStorage.getItem('ProfilePic').then((s) => {
        if (!s) return;
        setProfilePic(JSON.parse(s));
      });
    }
  };

  useEffect(() => {
    resolveProfilePic();

    if (profile.IsTempPassword) {
      props?.navigation?.replace('ForceChangePassword');
    }

    const focusListener = props?.navigation?.addListener('didFocus', () => {
      if (profile.IsTempPassword) {
        props?.navigation?.replace('ForceChangePassword');
      }
    });

    return () => focusListener?.remove();
  }, []);

  useEffect(() => {
    resolveProfilePic();
    setTriggerChange((o) => !o);
  }, [profile.ProfileImage]);

  const PlayerInfoForm = () => {

    const ExperienceComponent = () => {
      const [value, setValue] = React.useState(
        experience ? experience.value : null,
      );
      var radio_props = [
        {label: 'No Experience', value: 0},
        {label: 'Beginner', value: 1},
        {label: 'Intermediate', value: 2},
        {label: 'Advance', value: 3},
      ];

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            What is the player's current level of experience?
          </Text>
          <View style={{width: '90%'}}>
            <RadioForm animation={true}>
              {radio_props.map((obj, i) => (
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
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={(value) => {
                        setValue(value);
                        setExperience(radio_props[value]);
                        setExperienceFlag(false);
                        setAgeFlag(true);
                      }}
                      borderWidth={1}
                      buttonInnerColor={'#5BADFE'}
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setValue(value);
                        setExperience(radio_props[value]);
                        setExperienceFlag(false);
                        setAgeFlag(true);
                      }}
                      labelStyle={{fontSize: 20, color: 'black', width: '100%'}}
                      labelWrapStyle={{}}
                    />
                  </RadioButton>
                </View>
              ))}
            </RadioForm>
          </View>
          <TouchableOpacity
            onPress={() => {
              if (!experience) {
              } else {
                setExperienceFlag(false);
                setAgeFlag(true);
              }
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
            <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
              NEXT
            </Text>
          </TouchableOpacity>
        </View>
      );
    };

    const AgeComponent = () => {
      const [value, setValue] = React.useState(age ? age.value : null);
      var radio_props = [
        {label: 'Child', value: 0},
        {label: 'Teen', value: 1},
        {label: 'Adult', value: 2},
      ];

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            How old is the player?
          </Text>
          <View style={{width: '90%'}}>
            <RadioForm animation={true}>
              {radio_props.map((obj, i) => (
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
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={(value) => {
                        setValue(value);
                        setAge(radio_props[value]);
                        setAgeFlag(false);
                        setCoachingFlag(true);
                      }}
                      borderWidth={1}
                      buttonInnerColor={'#5BADFE'}
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setValue(value);
                        setAge(radio_props[value]);
                        setAgeFlag(false);
                        setCoachingFlag(true);
                      }}
                      labelStyle={{fontSize: 20, color: 'black', width: '100%'}}
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
                setExperienceFlag(true);
                setAgeFlag(false);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!age) {
                } else {
                  setAgeFlag(false);
                  setCoachingFlag(true);
                }
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const CoachingTypeComponent = () => {
      const [toggleCheckBox1, setToggleCheckBox1] = React.useState(
        coaching ? coaching[0] : false,
      );
      const [toggleCheckBox2, setToggleCheckBox2] = React.useState(
        coaching ? coaching[1] : false,
      );
      const [toggleCheckBox3, setToggleCheckBox3] = React.useState(
        coaching ? coaching[2] : false,
      );

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 500,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            What type of coaching would you consider?
          </Text>
          <View style={{width: '90%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={(newValue) => setToggleCheckBox1(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox1((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={(newValue) => setToggleCheckBox2(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox2((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={(newValue) => setToggleCheckBox3(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox3((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                setCoachingFlag(false);
                setAgeFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!toggleCheckBox1 && !toggleCheckBox2 && !toggleCheckBox3) {
                } else {
                  setCoaching([
                    toggleCheckBox1,
                    toggleCheckBox2,
                    toggleCheckBox3,
                  ]);
                  setCoachingFlag(false);
                  setDaysFlag(true);
                }
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const DaysComponent = () => {
      const [toggleCheckBox1, setToggleCheckBox1] = React.useState(
        days ? days[0] : false,
      );
      const [toggleCheckBox2, setToggleCheckBox2] = React.useState(
        days ? days[1] : false,
      );
      const [toggleCheckBox3, setToggleCheckBox3] = React.useState(
        days ? days[2] : false,
      );
      const [toggleCheckBox4, setToggleCheckBox4] = React.useState(
        days ? days[3] : false,
      );
      const [toggleCheckBox5, setToggleCheckBox5] = React.useState(
        days ? days[4] : false,
      );
      const [toggleCheckBox6, setToggleCheckBox6] = React.useState(
        days ? days[5] : false,
      );
      const [toggleCheckBox7, setToggleCheckBox7] = React.useState(
        days ? days[6] : false,
      );

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 650,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            Which day(s) would you consider for coaching ?
          </Text>
          <View style={{width: '90%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={(newValue) => setToggleCheckBox1(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox1((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={(newValue) => setToggleCheckBox2(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox2((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={(newValue) => setToggleCheckBox3(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox3((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox4}
                onValueChange={(newValue) => setToggleCheckBox4(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox4((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox5}
                onValueChange={(newValue) => setToggleCheckBox5(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox5((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox6}
                onValueChange={(newValue) => setToggleCheckBox6(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox6((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox7}
                onValueChange={(newValue) => setToggleCheckBox7(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox7((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => {
                setDaysFlag(false);
                setCoachingFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
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
                  ]);
                  setDaysFlag(false);
                  setTimingFlag(true);
                }
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const TimingComponent = () => {
      const [toggleCheckBox1, setToggleCheckBox1] = React.useState(
        timing ? timing[0] : false,
      );
      const [toggleCheckBox2, setToggleCheckBox2] = React.useState(
        timing ? timing[1] : false,
      );
      const [toggleCheckBox3, setToggleCheckBox3] = React.useState(
        timing ? timing[2] : false,
      );
      const [toggleCheckBox4, setToggleCheckBox4] = React.useState(
        timing ? timing[3] : false,
      );
      const [toggleCheckBox5, setToggleCheckBox5] = React.useState(
        timing ? timing[4] : false,
      );

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 550,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            Which time(s) of day would you consider for coaching ?
          </Text>
          <View style={{width: '90%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox1}
                onValueChange={(newValue) => setToggleCheckBox1(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox1((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox2}
                onValueChange={(newValue) => setToggleCheckBox2(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox2((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox3}
                onValueChange={(newValue) => setToggleCheckBox3(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox3((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox4}
                onValueChange={(newValue) => setToggleCheckBox4(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox4((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                style={{height: '40%'}}
                disabled={false}
                value={toggleCheckBox5}
                onValueChange={(newValue) => setToggleCheckBox5(newValue)}
              />
              <TouchableOpacity
                onPress={() => {
                  setToggleCheckBox5((prev) => !prev);
                }}
                activeOpacity={1}
                style={{width: '80%'}}>
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
                setTimingFlag(false);
                setDaysFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
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
                  ]);
                  setTimingFlag(false);
                  setWeaksFlag(true);
                }
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const TrainTimeComponent = () => {
      const [value, setValue] = React.useState(weeks ? weeks.value : null);
      var radio_props = [
        {label: '1', value: 0},
        {label: '2', value: 1},
        {label: '3', value: 2},
        {label: '4 +', value: 3},
      ];

      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 450,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            How many times a week does the player want to train?
          </Text>
          <View style={{width: '90%'}}>
            <RadioForm animation={true}>
              {radio_props.map((obj, i) => (
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
                  <RadioButton labelHorizontal={true} key={i}>
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={value === i}
                      onPress={(value) => {
                        setValue(value);
                        setWeaks(radio_props[value]);
                        setWeaksFlag(false);
                        setNameFlag(true);
                      }}
                      borderWidth={1}
                      buttonInnerColor={'#5BADFE'}
                      buttonOuterColor={value === i ? '#2196f3' : '#00000050'}
                      buttonSize={13}
                      buttonOuterSize={20}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10}}
                    />
                    <RadioButtonLabel
                      obj={obj}
                      index={i}
                      labelHorizontal={true}
                      onPress={(value) => {
                        setValue(value);
                        setWeaks(radio_props[value]);
                        setWeaksFlag(false);
                        setNameFlag(true);
                      }}
                      labelStyle={{fontSize: 20, color: 'black', width: '100%'}}
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
                setWeaksFlag(false);
                setTimingFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!weeks) {
                } else {
                  setWeaksFlag(false);
                  setNameFlag(true);
                }
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const NameComponent = () => {
      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 350,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            Name
          </Text>
          <View style={{width: '90%'}}>
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
                style={{width: '100%', paddingLeft: 10}}
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
                setNameFlag(false);
                setWeaksFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setNameFlag(false);
                setEmailFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const EmailComponent = () => {
      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 350,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            Email
          </Text>
          <View style={{width: '90%'}}>
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
                style={{width: '100%', paddingLeft: 10}}
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
                setEmailFlag(false);
                setNameFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setEmailFlag(false);
                setPhoneFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                NEXT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    const PhoneComponent = () => {
      return (
        <View
          style={{
            width: '95%',
            alignSelf: 'center',
            borderRadius: 10,
            height: 350,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{fontSize: 20, fontWeight: '500', textAlign: 'center'}}>
            Phone
          </Text>
          <View style={{width: '90%'}}>
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
                style={{width: '100%', paddingLeft: 10}}
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
                setPhoneFlag(false);
                setEmailFlag(true);
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                PREVIOUS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSubmit(true)
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
              <Text style={{fontSize: 18, fontWeight: '500', color: 'white'}}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    };

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView
          style={{
            backgroundColor: '#1967CD',
            height: '100%',
            justifyContent: 'center',
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
          {weeksFlag && <TrainTimeComponent />}
          {nameFlag && <NameComponent />}
          {emailFlag && <EmailComponent />}
          {phoneFlag && <PhoneComponent />}
        </SafeAreaView>
      </>
    );
  };

  return (
    <>
      {!submit ? (
        <PlayerInfoForm />
      ) : (
        <>
          {props.navigation && (
            <Header
              hideCreatePost={true}
              toggleDrawer={props.navigation.toggleDrawer}
              navigate={props.navigation.navigate}
            />
          )}
          <ScrollView>
            <View>
              <View style={styles.userView}>
                <View style={{marginTop: 50}}>
                  <TouchableOpacity
                    onPress={async () => {
                      NavigationService.navigate('ProfilePic', {
                        goBackTo: props.goBackTo || 'AboutMe',
                      });
                    }}
                    style={{position: 'relative'}}>
                    {triggerChange == true && (
                      <ImageProgress
                        resizeMode="contain"
                        source={
                          profilePic
                            ? {uri: profilePic.uri}
                            : Images.PlayerPlaceholder
                        }
                        style={styles.userImg}
                        imageStyle={styles.userImg}
                      />
                    )}
                    {triggerChange == false && (
                      <ImageProgress
                        resizeMode="contain"
                        source={
                          profilePic
                            ? {uri: profilePic.uri}
                            : Images.PlayerPlaceholder
                        }
                        style={styles.userImg}
                        imageStyle={styles.userImg}
                      />
                    )}
                    <View style={styles.editView}>
                      <Icon
                        type="EvilIcons"
                        name="pencil"
                        style={{color: 'white', fontSize: 25}}
                      />
                    </View>
                    </TouchableOpacity>
                    <Text style={{ alignSelf: 'center', marginTop: 10, color:'red'}}>*Required</Text>
                </View>
              </View>

              <UserCard
                title={'About Me'}
                data={AboutUs}
                onEditPress={() =>
                  NavigationService.navigate('EditInput', {
                    title: 'About Me',
                    data: AboutUs,
                    cb: (aboutMe) => {},
                  })
                }
              />

              <UserCard
                title={'Achievements'}
                data={Achievements}
                onEditPress={() =>
                  NavigationService.navigate('EditInput', {
                    title: 'Achievements',
                    data: Achievements,
                    cb: (achievements) => {},
                  })
                }
              />

              <TeamMatchCard
                title={'Teams'}
                data={Teams}
                onEditPress={(item) =>
                  NavigationService.navigate('AddTeam', {
                    title: 'Teams',
                    cb: (team) => {},
                    ...item,
                  })
                }
              />

              <TeamUpComingCard
                title={'Upcoming Matches'}
                data={UpcomingMatches}
                onEditPress={(item) =>
                  NavigationService.navigate('UpComingMatch', {
                    title: 'Teams',
                    cb: (upComing) => {},
                    ...item,
                  })
                }
              />
            </View>
          </ScrollView>
        </>
      )}
    </>
  );
};

export default PlayerProfile;
