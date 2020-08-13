import React, { Component, useEffect } from 'react'
import { View, StatusBar, FlatList } from 'react-native'
import Header from '../../components/header/Header'
import BookCard from './components/BookCard'
import useAxios from 'axios-hooks'
import { Spinner, Text } from 'native-base'
import Colors from '../../constants/color'
import { useGlobalState } from '../../state/GlobalState'


const Booking = (props) => {
  const [profile] = useGlobalState('profile')
  const [{ data, loading, error }, getBookings] = useAxios({
    url: '/Users/GetBookings',
    method: 'POST',
    data: {
      "userID": profile?.Id,
      "role": profile?.Role
    }
  })

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {
      getBookings({
        data: {
          "userID": profile?.Id,
          "role": profile?.Role
        }
      })
    });

    return () => focusListener.remove()
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <Header title="My Bookings" hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
      {loading && <Spinner size={80} color={Colors.s_yellow} />}
      {!loading && data && data.length == 0 && <Text style={{ textAlign: 'center', fontSize: 24 }}>No Bookings Yet.</Text>}
      {!loading && (
        <FlatList
          horizontal={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <BookCard {...item} />
          )}
        />
      )}
    </View>
  )
}
export default Booking
