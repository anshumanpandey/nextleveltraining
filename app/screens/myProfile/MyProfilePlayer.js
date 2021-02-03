import React, {useState, useEffect} from 'react'
import {View, Image, ScrollView, TouchableOpacity} from 'react-native'
import {Tab, Tabs, Spinner, Text} from 'native-base'
import Header from '../../components/header/Header'
import Images from '../../constants/image'
import styles from '../profile/styles'
import UserCard from '../profile/UserCard'
import {Icon} from 'native-base'
import TeamMatchCard from '../profile/TeamMatchCard'
import TeamUpComingCard from '../profile/TeamUpComingCard'
import {
  useGlobalState,
} from '../../state/GlobalState'
import AsyncStorage from '@react-native-community/async-storage'
import Colors from '../../constants/color'
import useAxios from 'axios-hooks'
import {FlatList} from 'react-native-gesture-handler'
import moment from 'moment'
import PostCard from '../home/components/PostCard'
import {NavigationActions} from 'react-navigation'

const MyProfilePlayer = props => {
  const [toggle, setToggle] = useState(false)
  const [profilePic, setProfilePic] = useState()
  const [profile] = useGlobalState('profile')

  const {AboutUs, Achievements, Teams, UpcomingMatches} = profile

  const [getPostByUserReq, getPostByUser] = useAxios({
    url: `/Users/GetPostsByUser/${profile.Id}`,
  })

  const initFn = () => {
    if (profile?.ProfileImage) {
      setProfilePic({uri: profile.ProfileImage})
    } else {
      AsyncStorage.getItem('ProfilePic').then(s => {
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
    })

    return () => focusListener.remove()
  }, [])

  return (
    <View style={{flex: 1}}>
      {props.navigation && (
        <Header
          title="My Profile"
          hideCreatePost={true}
          toggleDrawer={props.navigation.toggleDrawer}
          navigate={props.navigation.navigate}
          customButton={() => {
            return (
              <Icon
                onPress={() => props.navigation.goBack()}
                type="Feather"
                name="arrow-left"
                style={{
                  left: 15,
                  fontSize: 22,
                  color: '#2D7AF0',
                }}
              />
            )
          }}
        />
      )}
      <Tabs tabBarUnderlineStyle={{backgroundColor: Colors.s_blue}}>
        <Tab
          activeTextStyle={{color: Colors.s_blue}}
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          heading="Profile">
          <ScrollView>
            <View>
              <View style={[styles.userView, {flexDirection: 'row'}]}>
                <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                    const d = NavigationActions.navigate({
                      routeName: 'ProfilePic',
                      params: {goBackTo: 'MyProfilePlayer'},
                    })
                    props.navigation.dispatch(d)
                  }}
                  style={{marginTop: 50}}>
                  {toggle == true && (
                    <Image
                      resizeMode="contain"
                      source={
                        profilePic
                          ? {uri: profilePic.uri}
                          : Images.PlayerPlaceholder
                      }
                      style={styles.userImg}
                    />
                  )}
                  {toggle == false && (
                    <Image
                      resizeMode="contain"
                      source={
                        profilePic
                          ? {uri: profilePic.uri}
                          : Images.PlayerPlaceholder
                      }
                      style={styles.userImg}
                    />
                  )}
                </TouchableOpacity>
              </View>

              <UserCard
                title={'About Me'}
                disabledEdit={true}
                data={AboutUs}
                // onEditPress={() =>
                //   NavigationService.navigate('EditInput', {
                //     title: 'About Me',
                //     data: AboutUs,
                //     goBackTo:
                //       props.navigation.getParam('editable', false) == true
                //         ? 'Profile'
                //         : 'AboutMe',
                //     cb: aboutMe => {},
                //   })
                // }
              />

              <UserCard
                title={'Achievements'}
                data={Achievements}
                disabledEdit={true}
                // onEditPress={() =>
                //   NavigationService.navigate('EditInput', {
                //     title: 'Achievements',
                //     data: Achievements,
                //     goBackTo:
                //       props.navigation.getParam('editable', false) == true
                //         ? 'Profile'
                //         : 'AboutMe',
                //     cb: achievements => {},
                //   })
                // }
              />

              <TeamMatchCard
                title={'Teams'}
                data={Teams}
                disableEdit={true}
                // onEditPress={item =>
                //   NavigationService.navigate('AddTeam', {
                //     title: 'Teams',
                //     goBackTo:
                //       props.navigation.getParam('editable', false) == true
                //         ? 'Profile'
                //         : 'AboutMe',
                //     cb: team => {},
                //     ...item,
                //   })
                // }
              />

              <TeamUpComingCard
                title={'Upcoming Matches'}
                data={UpcomingMatches}
                disableEdit={true}
                // onEditPress={item =>
                //   NavigationService.navigate('UpComingMatch', {
                //     title: 'Teams',
                //     goBackTo:
                //       props.navigation.getParam('editable', false) == true
                //         ? 'Profile'
                //         : 'AboutMe',
                //     cb: upComing => {},
                //     ...item,
                //   })
                // }
              />
            </View>
          </ScrollView>
        </Tab>
        <Tab
          activeTextStyle={{color: Colors.s_blue}}
          tabStyle={{backgroundColor: 'white'}}
          activeTabStyle={{backgroundColor: 'white'}}
          heading="Media">
          {getPostByUserReq.loading && <Spinner color={Colors.s_blue} />}
          {getPostByUserReq.error && (
            <Text style={{fontSize: 18, textAlign: 'center', marginTop: '15%'}}>
              No Posts Yet
            </Text>
          )}
          {!getPostByUserReq.loading && getPostByUserReq.data && (
            <FlatList
              horizontal={false}
              style={{width: '100%', height: '100%'}}
              ListEmptyComponent={
                <Text style={{textAlign: 'center', marginTop: '15%'}}>
                  No post created yet
                </Text>
              }
              data={getPostByUserReq.data.map(p => {
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
                  j.fileType = 'image'
                  if (
                    p.MediaURL.includes('MOV') ||
                    p.MediaURL.includes('mp4')
                  ) {
                    j.fileType = 'video'
                  }
                  j.imageUri = p.MediaURL
                }
                return j
              })}
              keyExtractor={item => item.Id}
              renderItem={({item}) => (
                <PostCard
                  refreshCb={getPostByUser}
                  onPressOfComment={() =>
                    props.navigation.navigate(screen.CreateComment, {
                      post: item,
                    })
                  }
                  item={item}
                  onClickItem={item => {
                    setVisibleModal(item)
                  }}
                />
              )}
            />
          )}
        </Tab>
      </Tabs>
    </View>
  )
}

export default MyProfilePlayer
