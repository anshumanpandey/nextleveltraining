import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Tab, Tabs, Spinner, Text } from 'native-base';
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
import Colors from '../../constants/color';
import useAxios from 'axios-hooks'
import { FlatList } from 'react-native-gesture-handler';
import moment from "moment"
import PostCard from '../home/components/PostCard';
import dimensions from '../../constants/dimensions';
import { NavigationActions } from 'react-navigation';

const PlayerInfoScreen = (props) => {
  const [toggle, setToggle] = useState(false);
  const [profilePic, setProfilePic] = useState();
  let profile = props.navigation.getParam("player")

  if (!profile) {
    profile = useGlobalState('profile')
  }

  console.log(profile)

  const { AboutUs, Achievements, Teams, UpcomingMatches } = profile;

  const [getPostByUserReq, getPostByUser] = useAxios({
    url: `/Users/GetPostsByUser/${profile.Id}`,
  })

  const initFn = () => {
    if (profile?.ProfileImage) {
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
    setToggle(p => !p)
  }, [profilePic])

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
      <Tabs tabBarUnderlineStyle={{ backgroundColor: Colors.s_blue }}>
        <Tab activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Profile">
          <ScrollView>
            <View>
              <View style={[styles.userView, { flexDirection: 'row' }]}>
                <TouchableOpacity
                  disabled={!(props.navigation.getParam("editable", false) === true)}
                  onPress={() => {
                    const d = NavigationActions.navigate({ routeName: 'ProfilePic', params: { goBackTo: 'Profile' } })
                    props.navigation.dispatch(d)
                  }}
                  style={{ marginTop: 50 }}>
                  {toggle == true && (
                    <Image
                      resizeMode="contain"
                      source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
                      style={styles.userImg}
                    />
                  )}
                  {toggle == false && (
                    <Image
                      resizeMode="contain"
                      source={profilePic ? { uri: profilePic.uri } : Images.PlayerPlaceholder}
                      style={styles.userImg}
                    />
                  )}
                  {props.navigation.getParam("editable", false) == true && (
                    <View style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'absolute',
                      width: dimensions.px30,
                      height: dimensions.px30,
                      backgroundColor: Colors.s_blue,
                      borderRadius: dimensions.px30 / 2,
                      right: 0,
                      top: 3,
                    }}>
                      <Icon
                        type="EvilIcons"
                        name="pencil"
                        style={{ color: 'white', fontSize: 25 }}
                      />
                    </View>
                  )}
                </TouchableOpacity>
                {props?.navigation?.getParam("hideConnect", false) == false && (
                  <View style={{ position: 'absolute', right: '5%', alignSelf: 'flex-end' }}>
                    <ConnectedWidget userToConnectTo={profile.Id} />
                  </View>
                )}
              </View>

              <UserCard
                title={'About Me'}
                disabledEdit={!(props.navigation.getParam("editable", false) === true)}
                data={AboutUs}
                onEditPress={() =>
                  NavigationService.navigate('EditInput', {
                    title: 'About Me',
                    data: AboutUs,
                    goBackTo: props.navigation.getParam("editable", false) == true ? "Profile" : "AboutMe",
                    cb: (aboutMe) => { },
                  })
                }
              />

              <UserCard
                title={'Achievements'}
                data={Achievements}
                disabledEdit={!(props.navigation.getParam("editable", false) === true)}
                onEditPress={() =>
                  NavigationService.navigate('EditInput', {
                    title: 'Achievements',
                    data: Achievements,
                    goBackTo: props.navigation.getParam("editable", false) == true ? "Profile" : "AboutMe",
                    cb: (achievements) => { },
                  })
                }
              />

              <TeamMatchCard
                title={'Teams'}
                data={Teams}
                disableEdit={!(props.navigation.getParam("editable", false) === true)}
                onEditPress={(item) =>
                  NavigationService.navigate('AddTeam', {
                    title: 'Teams',
                    goBackTo: props.navigation.getParam("editable", false) == true ? "Profile" : "AboutMe",
                    cb: (team) => { },
                    ...item
                  })
                }
              />

              <TeamUpComingCard
                title={'Upcoming Matches'}
                data={UpcomingMatches}
                disableEdit={!(props.navigation.getParam("editable", false) === true)}
                onEditPress={(item) =>
                  NavigationService.navigate('UpComingMatch', {
                    title: 'Teams',
                    goBackTo: props.navigation.getParam("editable", false) == true ? "Profile" : "AboutMe",
                    cb: (upComing) => { },
                    ...item
                  })
                }
              />
            </View>
          </ScrollView>

        </Tab>
        <Tab activeTextStyle={{ color: Colors.s_blue }} tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: 'white' }} heading="Media">
          {getPostByUserReq.loading && <Spinner color={Colors.s_blue} />}
          {getPostByUserReq.error && <Text style={{ fontSize: 18, textAlign: 'center', marginTop: '15%' }}>No Posts Yet</Text>}
          {!getPostByUserReq.loading && getPostByUserReq.data && (
            <FlatList
              horizontal={false}
              style={{ width: '100%', height: '100%' }}
              ListEmptyComponent={
                <Text style={{ textAlign: 'center', marginTop: '15%' }}>No post created yet</Text>
              }
              data={getPostByUserReq.data
                .map(p => {
                  const j = {
                    id: p.Id,
                    name: p.Header,
                    time: moment(p.CreatedDate).format('DD MMM HH:mm'),
                    description: p.Body,
                    createdBy: p.CreatedBy,
                    profileImage: p.ProfileImage,
                    comments: p.Comments || [],
                    likes: p.Likes || [],
                    imageUri: p.MediaURL,
                    width: p.Width,
                    height: p.Height,
                  }

                  if (p.MediaURL) {
                    j.fileType = "image"
                    if (p.MediaURL.includes('MOV') || p.MediaURL.includes('mp4')) {
                      j.fileType = "video"
                    }
                    j.imageUri = p.MediaURL
                  }
                  return j

                })
              }
              keyExtractor={item => item.Id}
              renderItem={({ item }) => (
                <PostCard
                  refreshCb={getPostByUser}
                  onPressOfComment={() => props.navigation.navigate(screen.CreateComment, { post: item })}
                  item={item}
                  onClickItem={(item) => {
                    setVisibleModal(item)
                  }} />
              )
              }
            />
          )}
        </Tab>
      </Tabs>
    </View>
  );
}

export default PlayerInfoScreen;
