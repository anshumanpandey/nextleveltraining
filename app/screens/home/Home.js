import React, {useState, useEffect} from 'react'
import Header from '../../components/header/Header'
import {View, FlatList, Text, TouchableOpacity} from 'react-native'
import {Icon} from 'native-base'
import PostCard from './components/PostCard'
import useAxios from 'axios-hooks'
import styles from './styles.js'
import moment from 'moment'
import SyncPosts from '../../utils/PostSyncher'
import AsyncStorage from '@react-native-community/async-storage'
import {
  useGlobalState,
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState'
import screen from '../../utils/screen'
import Colors from '../../constants/color'
import PushNotification from 'react-native-push-notification'

const Home = ({navigation}) => {
  const [dataToShow, setDataToShow] = useState([])

  const [{data, loading}, refetch] = useAxios(
    {url: '/Users/GetAllPosts'},
    {manual: true},
  )

  const [, getUserData] = useAxios({url: '/Users/GetUser'}, {manual: true})

  useEffect(() => {
    refetch()
    const focusListener = navigation.addListener('didFocus', () => {
      refetch()
      PushNotification.popInitialNotification(() => {
        console.log('Initial Notification', notification)
      })
    })
    return () => focusListener?.remove()
  }, [])

  useEffect(() => {
    if (!data) return
    if (!data.length) return

    const dateFormat = 'DD MMM YYYY HH:mm'
    const posts = data.map(p => {
      return AsyncStorage.getItem(`post-${p.Id}-file`).then(fileString => {
        const j = {
          id: p.Id,
          name: p.Header,
          time: moment(p.CreatedDate).format(dateFormat),
          description: p.Body,
          createdBy: p.CreatedBy,
          profileImage: p.ProfileImage,
          comments: p.Comments || [],
          likes: p.Likes || [],
          poster: p.Poster,
          width: p.Width,
          height: p.Height,
        }

        if (p.MediaURL) {
          j.fileType = 'image'
          if (p.MediaURL.includes('MOV') || p.MediaURL.includes('mp4')) {
            j.fileType = 'video'
          }
          j.imageUri = p.MediaURL
        } else if (fileString && JSON.parse(fileString).file) {
          console.log('no media url', fileString)
          const jsonFile = JSON.parse(fileString)
          j.imageUri = jsonFile.file.path
          j.fileType = jsonFile.file.type
          j.width = jsonFile.file.width
          j.height = jsonFile.file.height
          SyncPosts(jsonFile.file, p.Id)
            .then(() => AsyncStorage.removeItem(`post-${p.Id}-file`))
            .then(() => getUserData())
            .then(r => {
              dispatchGlobalState({
                type: GLOBAL_STATE_ACTIONS.PROFILE,
                state: r.data,
              })
              dispatchGlobalState({
                type: GLOBAL_STATE_ACTIONS.TOGGLE,
                state: null,
              })
            })
            .catch(err => console.log(err))
        }
        return j
      })
    })
    Promise.all(posts).then(p => {
      setDataToShow(
        p.sort((left, right) => {
          console.log(left.time, right.time)
          return moment
            .utc(right.time, dateFormat)
            .diff(moment.utc(left.time, dateFormat))
        },
        ),
      )
    })
  }, [loading])

  let body = (
    <Text style={{fontSize: 28, textAlign: 'center', marginTop: '10%'}}>
      Loading...
    </Text>
  )

  if (!loading && data && data.length == 0) {
    body = (
      <Text style={{fontSize: 28, textAlign: 'center', marginTop: '10%'}}>
        No Posts Yet
      </Text>
    )
  }

  const renderItem = ({item}) => {
    return (
      <PostCard
        refreshCb={refetch}
        onPressOfComment={() =>
          navigation.navigate(screen.CreateComment, {post: item})
        }
        item={item}
        onClickItem={() => {}}
      />
    )
  }

  if (!loading && data && dataToShow.length != 0) {
    body = (
      <FlatList
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        horizontal={false}
        data={dataToShow}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        removeClippedSubviews={true}
      />
    )
  }

  const NotificationCountComponent = ({currentNotifications}) => {
    return (
      <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>
        {currentNotifications.filter(i => i.IsRead == false).length}
      </Text>
    )
  }

  const BadgeNotification = () => {
    const [notifications] = useGlobalState('notifications')

    return (
      <View style={styles.tabContain}>
        <View
          style={{
            marginTop: 'auto',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <View>
            <View
              style={{
                backgroundColor: Colors.s_blue,
                zIndex: 2,
                position: 'absolute',
                top: '-50%',
                left: '50%',
                height: 18,
                width: 18,
                borderRadius: 18 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NotificationCountComponent
                key={notifications.filter(n => n.IsRead).length}
                currentNotifications={notifications}
              />
            </View>
            <Icon
              type="Feather"
              name="bell"
              style={[styles.icons, {color: 'black'}]}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={[styles.home_container]}>
      <Header
        navigate={navigation.navigate}
        home="home"
        customButton={() => {
          return (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}
                style={{marginHorizontal: 10}}>
                <BadgeNotification />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('LastMessage')}
                style={{marginHorizontal: 10}}>
                <Icon
                  type="Feather"
                  name="message-square"
                  style={[styles.icons, {color: 'black'}]}
                />
              </TouchableOpacity>
            </>
          )
        }}
      />
      {body}
    </View>
  )
}

export default Home
