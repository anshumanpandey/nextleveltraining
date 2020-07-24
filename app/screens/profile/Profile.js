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
import { useGlobalState } from '../../state/GlobalState';
import AsyncStorage from '@react-native-community/async-storage';
import { axiosInstance } from '../../api/AxiosBootstrap';
import Upload from 'react-native-background-upload'


const PlayerProfile = (props) => {
  const [profilePic, setProfilePic] = useState();
  const [profile] = useGlobalState('profile')
  const [token] = useGlobalState('token')
  const { user, AboutUs, Achievements, Teams, UpcomingMatches } = profile;

  useEffect(() => {
    if (profile.ProfileImage) {
      setProfilePic({ uri: profile.ProfileImage})
    } else {
      AsyncStorage.getItem('ProfilePic')
        .then((s) => {
          if (!s) return
          setProfilePic(JSON.parse(s))
        })
    }
  }, [])

  return (
    <View style={{ flex: 1 }}>
      {props.navigation && <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />}
      <ScrollView>
        <View>
          <View style={styles.userView}>
            <View style={{ marginTop: 50 }}>
              <TouchableOpacity
                onPress={async () => {
                  const source = await pickImage();
                  setProfilePic(source)
                  AsyncStorage.setItem('ProfilePic', JSON.stringify(source))

                  const options = {
                    url: 'http://44.233.116.105/NextLevelTrainingApi/api/Users/UploadFile',
                    path: source.uri,
                    method: 'POST',
                    type: 'multipart',
                    maxRetries: 2, // set retry count (Android only). Default 2
                    field: "File",
                    headers: {
                      'content-type': 'multipart/form-data', // Customize content-type
                      'Authorization': `Bearer ${token}`
                    },
                    parameters: {
                      Type: "profile",
                      Id: profile.Id
                    },
                    // Below are options only supported on Android
                    notification: {
                      enabled: false
                    },
                    useUtf8Charset: true
                  }


                  return Upload.startUpload(options).then((uploadId) => {
                    console.log('Upload started')
                    Upload.addListener('progress', uploadId, (data) => {
                      console.log(`[${source.uri}] Progress: ${data.progress}%`)
                    })
                    Upload.addListener('error', uploadId, (data) => {
                      console.log(`[${source.uri}] Error: ${JSON.stringify(data)}`)
                    })
                    Upload.addListener('cancelled', uploadId, (data) => {
                      console.log(`[${source.uri}] Cancelled!`)
                    })
                    Upload.addListener('completed', uploadId, (data) => {
                      // data includes responseCode: number and responseBody: Object
                      console.log(`[${source.uri}] Completed!`)
                      return axiosInstance({ url: '/Users/GetUser' })
                      .then((r) => {
                        console.log(r.data)
                        console.log("new profile")
                      })
                    })
                  })                  

                }}
                style={{ position: 'relative' }}>
                <Image
                  source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
                  style={styles.userImg}
                />
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
