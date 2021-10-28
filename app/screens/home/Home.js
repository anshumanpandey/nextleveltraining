import React, { useState, useEffect } from 'react'
import { View, FlatList, Text, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import useAxios from 'axios-hooks'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import PushNotification from 'react-native-push-notification'
import Header from '../../components/header/Header'
import PostCard from './components/PostCard'
import NLLastesChangesModal from '../../components/NLLastesChangesModal/NLLastesChangesModal'
import DailyReminderModal from '../../components/DailyReminderModal'
import styles from './styles'
import {
  useGlobalState,
} from '../../state/GlobalState'
import screen from '../../utils/screen'
import Colors from '../../constants/color'
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess'

const Home = ({ navigation }) => {
  const [dataToShow, setDataToShow] = useState([])
  const [profile] = useGlobalState('profile')

  const [{ data, loading }, refetch] = useAxios(
    { url: '/Users/GetAllPosts' },
    { manual: true },
  )

  useEffect(() => {
    AsyncStorage.getItem("justRegistered")
      .then((item) => {
        if (HasCompletedVerificationProcess(profile) === true && item === "1" && profile.Role === "Coach") {
          navigation.navigate('AskFeatured', { goToOnCancel: "Home" })
        }
      })
  }, [])

  useEffect(() => {
    refetch()
    const focusListener = navigation.addListener('didFocus', () => {
      refetch()
      PushNotification.popInitialNotification(() => {
      })
    })
    return () => focusListener?.remove()
  }, [navigation, refetch])

  useEffect(() => {
    if (!data) return
    if (!data.length) return

    const dateFormat = 'DD MMM YYYY HH:mm'
    const posts = data.map((p) => {
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
      }
      return j
    })
    setDataToShow(
      posts.sort((left, right) => {
        console.log(left.time, right.time)
        return moment
          .utc(right.time, dateFormat)
          .diff(moment.utc(left.time, dateFormat))
      },
      ),
    )
  }, [loading])

  let body = (
    <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>
      Loading...
    </Text>
  )

  if (!loading && data && data.length === 0) {
    body = (
      <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>
        No Posts Yet
      </Text>
    )
  }

  const renderItem = ({ item }) => (
    <PostCard
      refreshCb={refetch}
      onPressOfComment={() => {
        navigation.navigate(screen.CreateComment, { post: item })
      }}
      item={item}
      onClickItem={() => { }}
    />
  )

  if (!loading && data && dataToShow.length !== 0) {
    body = (
      <FlatList
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        horizontal={false}
        data={dataToShow}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        removeClippedSubviews
      />
    )
  }

  const NotificationCountComponent = ({ currentNotifications }) => (
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
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 12 }}>
        {currentNotifications.filter(i => i.IsRead === false).length}
      </Text>
    </View>
  )

  const BadgeNotification = () => {
    const [notifications] = useGlobalState('notifications')

    const n = notifications
      .filter(a => a.Text !== "You have a message")

    console.log(n.length)

    return (
      <View
        style={{
          marginTop: 'auto',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <View>
          {n.filter(i => i.IsRead === false).length !== 0 && (
            <NotificationCountComponent
              key={n.length}
              currentNotifications={n}
            />
          )}
          <Icon
            type="Feather"
            name="bell"
            style={[styles.icons, { color: 'black' }]}
          />
        </View>
      </View>
    )
  }

  const MessagesNotification = () => {
    const [notifications] = useGlobalState('notifications')

    const n = notifications
      .filter(a => a.Text === "You have a message")

    return (
      <View>
        {n.filter(i => i.IsRead === false).length !== 0 && (
          <NotificationCountComponent
            key={n.length}
            currentNotifications={n}
          />
        )}
        <Icon
          type="Feather"
          name="message-square"
          style={[styles.icons, { color: 'black' }]}
        />
      </View>
    );
  }

  return (
    <View style={[styles.home_container]}>
      <Header
        navigate={navigation.navigate}
        home="home"
        customButton={() => (
          <>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}
              style={{ marginHorizontal: 10 }}>
              <BadgeNotification />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('LastMessage')}
              style={{ marginHorizontal: 10 }}>
              <MessagesNotification />
            </TouchableOpacity>
          </>
        )}
      />
      <DailyReminderModal id="OUTSIDE_CONTACT_WARNING">
        <Text style={{ textAlign: "center", padding: 5 }}>Please note that contacting out the app is forbidden and can lead to account termination.</Text>
      </DailyReminderModal>
      <NLLastesChangesModal changes={[{ title: "Login", body: "Now user can login with username or email" }, { title: "UI", body: "Fix on colors and layout" }]} />
      {body}
    </View>
  )
}

export default Home
