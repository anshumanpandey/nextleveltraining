import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from './styles';
import UserCard from './UserCard';
import TeamMatchCard from './TeamMatchCard';
import TeamUpComingCard from './TeamUpComingCard';
import NavigationService from '../../navigation/NavigationService';
import { pickImage } from '../../helpers/ImagePicker';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import AsyncStorage from '@react-native-community/async-storage';
import ImageProgress from 'react-native-image-progress';

const PlayerProfile = (props) => {
  const [triggerChange, setTriggerChange] = useState(true);
  const [profilePic, setProfilePic] = useState();
  const [profile] = useGlobalState('profile')
  const [token] = useGlobalState('token')
  const { user, AboutUs, Achievements, Teams, UpcomingMatches } = profile;

  useEffect(() => {
    if (profile.ProfileImage) {
      setProfilePic({ uri: profile.ProfileImage })
    } else {
      AsyncStorage.getItem('ProfilePic')
        .then((s) => {
          if (!s) return
          setProfilePic(JSON.parse(s))
        })
    }
  }, [])

  useEffect(() => {
    setTriggerChange(o => !o)
  }, [profile.ProfileImage])

  return (
    <View style={{ flex: 1 }}>
      {props.navigation && <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />}
      <ScrollView>
        <View>
          <View style={styles.userView}>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity
                onPress={async () => {
                  NavigationService.navigate('ProfilePic')
                }}
                style={{ position: 'relative' }}>
                {triggerChange == true && (
                  <ImageProgress
                    source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
                    style={styles.userImg}
                    imageStyle={styles.userImg}
                  />
                )}
                {triggerChange == false && (
                  <ImageProgress
                    source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
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
            </View>
          </View>

          <UserCard
            title={'About Me'}
            data={AboutUs}
            onEditPress={() =>
              NavigationService.navigate('EditInput', {
                title: 'About Me',
                data: AboutUs,
                cb: (aboutMe) => { },
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
                cb: (achievements) => { },
              })
            }
          />

          <TeamMatchCard
            title={'Teams'}
            data={Teams}
            onEditPress={(item) =>
              NavigationService.navigate('AddTeam', {
                title: 'Teams',
                cb: (team) => { },
                ...item
              })
            }
          />

          <TeamUpComingCard
            title={'Upcoming Matches'}
            data={UpcomingMatches}
            onEditPress={(item) =>
              NavigationService.navigate('UpComingMatch', {
                title: 'Teams',
                cb: (upComing) => { },
                ...item
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default PlayerProfile;
