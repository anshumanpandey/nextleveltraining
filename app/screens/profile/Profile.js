import React, {useState, useEffect} from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Header from '../../components/header/Header';
import Images from '../../constants/image';
import styles from './styles';
import UserCard from './UserCard';
import TeamMatchCard from './TeamMatchCard';
import TeamUpComingCard from './TeamUpComingCard';
import NavigationService from '../../navigation/NavigationService';
import {pickImage} from '../../helpers/ImagePicker';
import { useGlobalState } from '../../state/GlobalState';
import AsyncStorage from '@react-native-community/async-storage';

const Profile = (props) => {
  const [profilePic, setProfilePic] = useState();
  const [profile] = useGlobalState('profile')
  const {user, AboutUs, Achievements, Teams, UpcomingMatches} = profile;

  useEffect(() => {
    AsyncStorage.getItem('ProfilePic')
    .then((s) => {
      if (!s) return
      setProfilePic(JSON.parse(s))
    })
  }, [])

  return (
    <View style={{flex: 1}}>
      <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate}/>
      <ScrollView>
        <View>
          <View style={styles.userView}>
            <View style={{marginTop: 50}}>
              <TouchableOpacity
                onPress={async () => {
                  const source = await pickImage();
                  setProfilePic(source)
                  AsyncStorage.setItem('ProfilePic', JSON.stringify(source))
                }}
                style={{position: 'relative'}}>
                <Image
                  source={profilePic ? { uri: profilePic.uri } : Images.MessiPlayer}
                  style={styles.userImg}
                />
                <View style={styles.editView}>
                  <Icon
                    type="EvilIcons"
                    name="pencil"
                    style={{color: 'white', fontSize: 25}}
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
            onEditPress={() =>
              NavigationService.navigate('AddTeam', {
                title: 'Teams',
                cb: (team) =>{}
              })
            }
          />

          <TeamUpComingCard
            title={'Upcoming Matches'}
            data={UpcomingMatches}
            onEditPress={() =>
              NavigationService.navigate('UpComingMatch', {
                title: 'Teams',
                cb: (upComing) =>{},
              })
            }
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default Profile;
