import React, {useEffect} from 'react'
import {View, FlatList, TouchableOpacity} from 'react-native'
import {Spinner, Text, Icon} from 'native-base'
import useAxios from 'axios-hooks'
import {parseISO} from 'date-fns'

import Header from '../../components/header/Header'
import BookCard from './components/BookCard'
import {useGlobalState} from '../../state/GlobalState'
import Colors from '../../constants/color'

const Booking = (props) => {
  const [profile] = useGlobalState('profile')
  const [{data, loading}, getBookings] = useAxios({
    url: '/Users/GetBookings',
    method: 'POST',
    data: {
      userID: profile?.Id,
      role: profile?.Role,
    },
  })

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {
      getBookings({
        data: {
          userID: profile?.Id,
          role: profile?.Role,
        },
      })
    })

    return () => focusListener.remove()
  }, [])

  const NotificationCountComponent = ({currentNotifications}) => {
    console.log(currentNotifications.length)
    return (
      <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>
        {currentNotifications.filter((i) => i.IsRead == false).length}
      </Text>
    )
  }

  const BadgeNotification = () => {
    const [notifications] = useGlobalState('notifications')

    return (
      <View style={{marginTop: 7, alignItems: 'center'}}>
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
                key={notifications.filter((n) => n.IsRead).length}
                currentNotifications={notifications}
              />
            </View>
            <Icon
              type="Feather"
              name="bell"
              style={{color: 'black', fontSize: 25}}
            />
          </View>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Header
        title="My Bookings"
        hideCreatePost={true}
        navigate={props.navigation.navigate}
        customButton={() => {
          return (
            <>
              <View style={{width: '70%'}} />
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Notification')
                }}
                style={{marginHorizontal: 10}}>
                <BadgeNotification />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('LastMessage')
                }}
                style={{marginHorizontal: 10}}>
                <Icon
                  type="Feather"
                  name="message-square"
                  style={{color: 'black', fontSize: 25}}
                />
              </TouchableOpacity>
            </>
          )
        }}
      />
      {loading && <Spinner size={80} color={Colors.s_yellow} />}
      {!loading && data && data.length == 0 && (
        <Text style={{textAlign: 'center', fontSize: 24, paddingVertical: 50}}>
          No Bookings Yet
        </Text>
      )}
      {!loading && (
        <FlatList
          horizontal={false}
          data={
            data
              ? data.sort((a, b) => parseISO(b.SentDate) - parseISO(a.SentDate))
              : []
          }
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <BookCard {...item} />}
        />
      )}
    </View>
  )
}
export default Booking
