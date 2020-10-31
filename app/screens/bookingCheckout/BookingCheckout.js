import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform, Alert } from 'react-native'
import Header from '../../components/header/Header'
import { Textarea, Icon, Input, Spinner } from 'native-base'
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import useAxios from 'axios-hooks'
import ErrorLabel from '../../components/ErrorLabel'
import Video from 'react-native-video';
import Colors from '../../constants/color'
import ImageCropPicker from 'react-native-image-crop-picker';
import MentionInput from 'react-native-mention';
import LoadableVideo from '../../components/LoadableVideo';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import { lightFormat } from 'date-fns';
import NLButton from '../../components/NLButton';
import { getTotalBookingPrice } from '../payments/PaypalUtils';
import GlobalContants from '../../constants/GlobalContants';
import NavigationService from '../../navigation/NavigationService';

const BookingCheckout = (props) => {
  const [currentSessions, setCurrentSessions] = useState([]);
  const coach = props.navigation.getParam("coach")
  const sessions = props.navigation.getParam("sessions")
  const selectedLocation = props.navigation.getParam("selectedLocation")

  useEffect(() => {
    setCurrentSessions(sessions)
  }, [sessions])

  const deleteSession = (toDelete) => {
    const map = new Map(currentSessions.map(s => ([`${s.BookingDate}-${s.TimeTag}`, s])))

    if (map.has(`${toDelete.BookingDate}-${toDelete.TimeTag}`)) {
      map.delete(`${toDelete.BookingDate}-${toDelete.TimeTag}`)
    }

    setCurrentSessions(Array.from(map.values()))
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <Header
        title="Checkout"
        hideCreatePost={true}
        toggleDrawer={props.navigation.toggleDrawer}
        navigate={props.navigation.navigate}
      />
      <View style={{ flexGrow: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ paddingLeft: '5%', width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Training session with</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{coach.FullName}</Text>
          </View>

          <View style={{ paddingRight: '5%', width: '50%' }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'right' }}>Training Location</Text>
            <Text style={{ fontSize: 14, textAlign: 'right' }}>{selectedLocation.LocationAddress}</Text>
          </View>
        </View>

        <View style={{ marginLeft: '5%', marginTop: '5%', backgroundColor: '#00000010' }}>
          {currentSessions.map(session => {
            return (
              <View style={{ paddingHorizontal: '8%', paddingVertical: '3%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ffffff' }}>
                <View>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Day: {session.BookingDate.split('T')[0]}</Text>
                  <Text style={{ fontSize: 15 }}>Starting at {session.FromTime} to {session.ToTime}</Text>
                  <Text style={{ fontSize: 15 }}>Price of £{coach.Rate}</Text>
                  <Text style={{ fontSize: 12 }}>Next Level comission of £{GlobalContants.BOOKING_COMISSION}</Text>
                </View>
                {currentSessions.length > 1 && (
                  <TouchableOpacity onPress={() => deleteSession(session)} style={{ backgroundColor: '#ffffff90', padding: 10, borderRadius: 10 * 2 }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>X</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>

        <View style={{ marginTop: 'auto', backgroundColor: '#00000010' }}>
          <Text style={{ fontSize: 22, textAlign: 'center' }}>Total of £{getTotalBookingPrice(coach, currentSessions)}</Text>
        </View>

        <NLButton
          onPress={() => NavigationService.navigate('PaymentConcent', { coach, selectedLocation, sessions: currentSessions })}
          value={`Pay`}
          style={{ width: '80%', marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: '10%' }}
        />
      </View>
    </ScrollView>
  )
}

export default BookingCheckout
