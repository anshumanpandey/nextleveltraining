import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Text,
  StatusBar,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Icon } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import ImageProgress from 'react-native-image-progress';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import { Formik } from 'formik';
import CheckBox from '@react-native-community/checkbox';
import useAxios from 'axios-hooks'
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from './styles';
import UserCard from './UserCard';
import TeamMatchCard from './TeamMatchCard';
import TeamUpComingCard from './TeamUpComingCard';
import NavigationService from '../../navigation/NavigationService';
import {
  useGlobalState,
} from '../../state/GlobalState';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';
import PlayerInfo from './playerLeadForm/PlayerInfo';

const PlayerProfile = (props) => {
  const [triggerChange, setTriggerChange] = useState(true);
  const [profilePic, setProfilePic] = useState();
  const [submit, setSubmit] = useState(props.submit)
  const [profile] = useGlobalState('profile');
  const { AboutUs, Achievements, Teams, UpcomingMatches } = profile;

  const resolveProfilePic = () => {
    if (profile?.ProfileImage) {
      setProfilePic({ uri: profile.ProfileImage });
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
  }, [props.navigation]);

  useEffect(() => {
    resolveProfilePic();
    setTriggerChange((o) => !o);
  }, [profile.ProfileImage]);


  return (
    <>
      {HasCompletedVerificationProcess(profile) ? (
        <PlayerInfo navigation={props.navigation} />
      ) : (
        <>
          {props.navigation && (
            <Header
              hideCreatePost
              toggleDrawer={props.navigation.toggleDrawer}
              navigate={props.navigation.navigate}
            />
          )}
          <ScrollView>
            <View>
              <View style={styles.userView}>
                <View style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    onPress={async () => {
                      NavigationService.navigate('ProfilePic', {
                        goBackTo: props.goBackTo || 'AboutMe',
                      })
                    }}
                    style={{ position: 'relative' }}>
                    {triggerChange == true && (
                      <ImageProgress
                        resizeMode="contain"
                        source={
                          profilePic
                            ? { uri: profilePic.uri }
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
                            ? { uri: profilePic.uri }
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
                        style={{ color: 'white', fontSize: 25 }}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text
                    style={{ alignSelf: 'center', marginTop: 10, color: 'red' }}>
                    *Required
                  </Text>
                </View>
              </View>

              <UserCard
                title="About Me"
                data={AboutUs}
                onEditPress={() =>
                  NavigationService.navigate('EditInput', {
                    title: 'About Me',
                    data: AboutUs,
                    cb: aboutMe => { },
                  })
                }
              />

              <UserCard
                title="Achievements"
                data={Achievements}
                onEditPress={() =>
                  NavigationService.navigate('EditInput', {
                    title: 'Achievements',
                    data: Achievements,
                    cb: achievements => { },
                  })
                }
              />

              <TeamMatchCard
                title="Teams"
                data={Teams}
                onEditPress={item =>
                  NavigationService.navigate('AddTeam', {
                    title: 'Teams',
                    cb: team => { },
                    ...item,
                  })
                }
              />

              <TeamUpComingCard
                title="Upcoming Matches"
                data={UpcomingMatches}
                onEditPress={item =>
                  NavigationService.navigate('UpComingMatch', {
                    title: 'Teams',
                    cb: upComing => { },
                    ...item,
                  })
                }
              />
            </View>
          </ScrollView>
        </>
      )}
    </>
  )
};

export default PlayerProfile;
