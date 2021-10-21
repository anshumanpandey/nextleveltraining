import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { Spinner, Text } from 'native-base'
import useAxios from 'axios-hooks'
import { parseISO } from 'date-fns'

import Header from '../../components/header/Header'
import BookCard from './components/BookCard'
import { useGlobalState } from '../../state/GlobalState'
import Colors from '../../constants/color'

const Booking = (props) => {
  const [profile] = useGlobalState('profile')
  const [{ data, loading }, getBookings] = useAxios({
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

  console.log({ data })

  return (
    <View style={{ flex: 1 }}>
      <Header
        title="My Bookings"
        hideCreatePost
        navigate={props.navigation.navigate}
      // customButton={() => {
      //   return (
      //     <>
      //       <View style={{width: '70%'}} />
      //       <TouchableOpacity
      //         onPress={() => {
      //           props.navigation.navigate('Notification')
      //         }}
      //         style={{marginHorizontal: 10}}>
      //         <BadgeNotification />
      //       </TouchableOpacity>
      //       <TouchableOpacity
      //         onPress={() => {
      //           props.navigation.navigate('LastMessage')
      //         }}
      //         style={{marginHorizontal: 10}}>
      //         <Icon
      //           type="Feather"
      //           name="message-square"
      //           style={{color: 'black', fontSize: 25}}
      //         />
      //       </TouchableOpacity>
      //     </>
      //   )
      // }}
      />
      {loading && <Spinner size={80} color={Colors.s_yellow} />}
      {!loading && data && data.length == 0 && (
        <Text style={{ textAlign: 'center', fontSize: 24, paddingVertical: 50 }}>
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
          renderItem={({ item }) => <BookCard {...item} />}
        />
      )}
    </View>
  )
}
export default Booking
