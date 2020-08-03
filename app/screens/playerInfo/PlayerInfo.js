import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from '../profile/styles';
import UserCard from '../profile/UserCard';
import TeamMatchCard from '../profile/TeamMatchCard';
import TeamUpComingCard from '../profile/TeamUpComingCard';
import NavigationService from '../../navigation/NavigationService';
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import AsyncStorage from '@react-native-community/async-storage';
import ConnectedWidget from '../../components/ConnectedWidget';


const PlayerInfoScreen = (props) => {
  const [profilePic, setProfilePic] = useState();
  const profile = props.navigation.getParam("player")
  const { AboutUs, Achievements, Teams, UpcomingMatches } = profile;

  const initFn = () => {
    if (profile.ProfileImage) {
      setProfilePic({ uri: profile.ProfileImage })
    } else {
      AsyncStorage.getItem('ProfilePic')
        .then((s) => {
          if (!s) return
          setProfilePic(JSON.parse(s))
        })
    }
  }

  useEffect(() => {
    initFn()
    const focusListener = props.navigation.addListener('didFocus', () => {
      initFn()
    });

    return () => focusListener.remove()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {props.navigation && <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />}
      <ScrollView>
        <View>
          <View style={[styles.userView, { flexDirection: 'row' }]}>
            <View style={{ marginTop: 50 }}>
              <Image
                source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
                style={styles.userImg}
              />
            </View>
            <View style={{ position: 'absolute', right: '5%', alignSelf: 'flex-end' }}>
              <ConnectedWidget />
            </View>
          </View>

          <UserCard
            title={'About Me'}
            disabledEdit={true}
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
            disabledEdit={true}
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
            disableEdit={true}
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
            disableEdit={true}
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

export default PlayerInfoScreen;
