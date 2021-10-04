import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import useAxios from 'axios-hooks'
import { Icon } from 'native-base'
import styles from './styles'
import Header from '../../components/header/Header'

import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState'
import NavigationService from '../../navigation/NavigationService'
import Images from '../../constants/image'

const LastMessage = props => {
  const [notifications] = useGlobalState('notifications')

  const [getUserReq, getUserData] = useAxios({
    url: '/Users/GetLastMessages',
  },
    { manual: true })

  const [, readNotification] = useAxios(
    {
      url: '/Users/ReadNotification/',
    },
    { manual: true },
  )

  const [, getNotification] = useAxios(
    {
      url: '/Users/GetNotifications',
    },
    { manual: true },
  )
  const [profile] = useGlobalState('profile')
  const [profileId, setProfileId] = useState('')

  useEffect(() => {
    setProfileId(profile?.Id)
    const focusListener = props.navigation.addListener('didFocus', () => {
      getUserData()
        .then(async () => {
          const toMarkAsReaded = notifications
            .filter(a => a.Text === "You have a message")
            .filter(i => i.IsRead === false)
          for (const n of toMarkAsReaded) {
            await readNotification({ url: `/Users/ReadNotification/${n.Id}` })
          }
        })
        .then(() => getNotification())
        .then(({ data }) => {
          dispatchGlobalState({
            type: GLOBAL_STATE_ACTIONS.NOTIFICATIONS,
            state: data.Notifications,
          })
        })
    })

    return () => focusListener.remove()

    /* const intervalId = setInterval(() => {
        getUserData()
        setProfileId(profile.Id)
       // alert(profileId)
        console.log(getUserReq,'sss')
           }, 5000);

           return () => clearInterval(intervalId); */
  }, [])

  function Item({ item, key, id }) {
    // alert(id)
    return (
      <View style={styles.flatList} key={key}>
        <TouchableOpacity
          onPress={() => {
            if (item.Sender.Role == 'Player') {
              NavigationService.navigate('PlayerInfo', { player: item.Sender })
            } else {
              NavigationService.navigate('Information', { ...item.Sender })
            }
          }}
          style={{ flexDirection: 'row' }}>
          <Image
            source={
              (!item.ReceiverProfilePic && !item.SenderProfilePic) ||
                (item.SenderID === profileId && item.ReceiverProfilePic === '') ||
                (item.RecieverId === profileId && item.SenderProfilePic === '')
                ? Images.PlayerPlaceholder
                : {
                  uri:
                    item.SenderID === profileId
                      ? item.ReceiverProfilePic
                      : item.SenderProfilePic,
                }
            }
            style={styles.userImage}
          />
          <View style={styles.innerRow}>
            <Text style={styles.screenTitle}>
              {item.SenderID === profileId
                ? item.ReceiverName
                : item.SenderName}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.container_text}
          onPress={() =>
            props.navigation.navigate('Message', {
              RecieverId:
                item.RecieverID === profileId ? item.SenderID : item.RecieverID,
              SenderId: profileId,
              friendName:
                item.SenderID === profileId
                  ? item.ReceiverName
                  : item.SenderName,
            })
          }>
          <Text style={styles.description}>
            {new Date(item.SentDate).toLocaleDateString()}
          </Text>
          <Text style={styles.description}>{item.Message}</Text>
        </TouchableOpacity>
      </View>
    )
  }
  function ItemSeparator() {
    return <View style={{ height: 1, width: '100%', backgroundColor: 'black' }} />
  }

  return (
    <View style={styles.signup_container}>
      <Header
        title="Message"
        hideCreatePost
        toggleDrawer={props.navigation.toggleDrawer}
        customButton={() => (
          <Icon
            onPress={() => props.navigation.goBack()}
            type="Feather"
            name="arrow-left"
            style={{
              position: 'absolute',
              left: 15,
              fontSize: 22,
              zIndex: 1,
              color: '#2D7AF0',
            }}
          />
        )}
      />
      <View style={styles.fullFlatListContainer}>
        {!getUserReq.loading &&
          getUserReq.data &&
          getUserReq.data.length > 0 && (
            <FlatList
              data={getUserReq.data}
              renderItem={({ item, key }) => (
                <Item item={item} key={key} id={profile?.Id} />
              )}
              temSeparatorComponent={() => <ItemSeparator />}
              keyExtractor={item => item.id}
            />
          )}
        {!getUserReq.loading &&
          getUserReq.data &&
          getUserReq.data.length == 0 && (
            <Text style={styles.notFoundText}>No messages found</Text>
          )}
        {getUserReq.loading && (
          <Text style={styles.notFoundText}>Loading...</Text>
        )}
      </View>
    </View>
  )
}

export default LastMessage
