import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../../../constants/image';
import styles from './information/information-style';
import { Icon, Spinner } from 'native-base';
import NavigationService from '../../../navigation/NavigationService';
import Dimension from '../../../constants/dimensions';
import Axios from 'axios'
import TeachingCard from '../components/subcomponents/TeachingCard';
import Colors from '../../../constants/color';
import moment from 'moment';
import Tabs from './information/Tabs';
import { Calendar } from 'react-native-calendars';
import { useGlobalState } from '../../../state/GlobalState';
import useAxios from 'axios-hooks'
import getDistance from 'geolib/es/getDistance';
import { UseNLMarkedDates } from '../../../utils/UseNLMarkedDates';
import CalendarRules from '../../../components/CalendarRules';
import { isAfter } from 'date-fns';

const _today = new Date();

const BookNow = ({ navigation: { addListener, state: { params: { coach, BookingId, FromTime, ToTime, Location, SentDate, isEditing = false } } } }) => {
  const activeColor = Colors.s_blue;
  const inActiveColor = 'gray';

  const [profile] = useGlobalState('profile')

  const [dropdownOptions, setDropdownOptions] = useState([])
  const [searchStartDate, setSearchStartDate] = useState(_today)
  const [searchEndDate, setSearchEndDate] = useState(_today)
  const [sessions, setSessions] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState()
  const { markedDays, markAvailableDay, selectRange, isUpdating } = UseNLMarkedDates({ EmailID: coach.EmailID, Id: coach.Id, Bookings: coach.Bookings });

  const addSession = (session) => {
    const uniqueSessions = new Set(sessions)
    if (uniqueSessions.has(session)){
      uniqueSessions.delete(session)
    } else {
      uniqueSessions.add(session)
    }
    
    setSessions(Array.from(uniqueSessions.values()))
  }

  const isSessionSelected = (session) => {
    return sessions.find(s => s.TimeTag == session.TimeTag) != null
  }

  const selectSearchRange = (date) => {
    if (!searchStartDate && !searchEndDate) {
      setSearchStartDate(date)
    } else if (searchStartDate && !searchEndDate) {
      if (isAfter(searchStartDate, date)) {
        setSearchStartDate(date)
        setSearchEndDate(searchStartDate)
      } else {
        setSearchEndDate(date)
      }
    } else {
      setSearchStartDate(date)
      setSearchEndDate(null)
    }
  }

  const [availableTimePerCoach, getUserData] = useAxios({
    url: '/Users/GetAvailableTimeByCoachId',
    method: 'POST',
  }, { manual: true })

  const [rescheduleBookingReq, doRescheduleBooking] = useAxios({
    url: '/Users/RescheduleBooking',
    method: 'POST',
  }, { manual: true })

  const [{ data, loading, error }, getBookings] = useAxios({
    url: '/Users/GetBookings',
    method: 'POST',
  }, { manual: true })

  const initFn = () => {
    SentDate && setDate(moment(SentDate).toDate())
    FromTime && ToTime && addSession(`${FromTime}-${ToTime}`)
    Location && setSelectedLocation({
      id: Location.Id,
      title: Location.LocationName,
      subTitle: Location.LocationAddress,
    })
  }

  useEffect(() => {
    markAvailableDay(moment(_today).format('YYYY-MM-DD'))
    initFn()
    const focusListener = addListener('didFocus', () => {
      initFn()
    });
    return () => focusListener?.remove();
  }, [])

  useEffect(() => {
    if (!searchStartDate || !searchEndDate) return

    const data = {
      "coachID": coach.Id,
      "date": searchStartDate.toISOString(),
      "endDate": searchEndDate.toISOString(),
    }
    getUserData({ data })
      .then((r) => {
        setDropdownOptions(r.data)
        if (r.data.length == 0) {
          setSessions([])
        }
      })
  }, [searchStartDate, searchEndDate])

  const isLoading = () => {
    return loading || rescheduleBookingReq.loading
  }

  const filterLocationCoachCanTravel = (location) => {
    if (!coach?.TravelMile?.TravelDistance) return true
    const startPoint = { latitude: coach.Lat, longitude: coach.Lng }
    const endPoint = { latitude: location.Lat, longitude: location.Lng }
    const milesAwayFromLocation = getDistance(startPoint, endPoint)
    return milesAwayFromLocation <= coach.TravelMile.TravelDistance
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.topContain}>
        <View style={[styles.orgView]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Icon
              onPress={() => NavigationService.goBack()}
              name="close"
              type="MaterialIcons"
              style={{ fontSize: 25, color: Colors.s_blue, padding: 10 }}
            />
            <TouchableOpacity
              style={{ width: '40%' }}
              disabled={selectedLocation == undefined || rescheduleBookingReq.loading}
              onPress={() => {
                if (isEditing == true) {
                  const [startDate, endDate] = time.split('-')
                  doRescheduleBooking({
                    data: {
                      "bookingId": BookingId,
                      "fromTime": startDate,
                      "toTime": endDate
                    }
                  })
                    .then(r => {
                      return getBookings({
                        data: {
                          "userID": profile.Id,
                          "role": profile.Role
                        }
                      })
                    })
                    .then(({ data }) => {
                      NavigationService.navigate("JobDetails", data.find(i => i.Id == BookingId))
                    })
                } else {
                  NavigationService.navigate('PaymentConcent', { coach, selectedLocation, sessions })
                }
              }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '5%' }}>
                {isLoading() && <Spinner color="white" style={{ marginRight: '10%' }} />}
                <Text style={{ color: Colors.s_blue, fontSize: 18, opacity: (selectedLocation) || !isLoading() ? 1 : 0.5 }}>
                  Book Now
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <Image source={coach.ProfileImage ? { uri: coach.ProfileImage } : Images.PlayerPlaceholder} style={styles.userImg} />
            <Text style={{ color: Colors.s_blue, fontSize: 18, marginLeft: 15 }}>
              {coach.FullName}
            </Text>
          </View>
        </View>
        <View>
          <Calendar
            onDayPress={(day) => {
              selectRange(moment(day.dateString, 'YYYY-MM-DD').toDate())
              selectSearchRange(moment(day.dateString, 'YYYY-MM-DD').toDate())
              markAvailableDay(day.dateString)
            }}
            markingType={'period'}
            markedDates={markedDays}
            disableAllTouchEventsForDisabledDays={true}
            theme={{
              dayTextColor: Colors.s_blue,
              todayTextColor: Colors.nl_yellow,
              arrowColor: Colors.nl_yellow,
              monthTextColor: Colors.nl_yellow,
            }}
          />
          {isUpdating() == true && (
            <View style={{ backgroundColor: `${Colors.nl_yellow}60`, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <Spinner size={150} color={Colors.nl_yellow} style={{ height: '100%' }} />
            </View>
          )}
          <CalendarRules />
        </View>

        <View style={[styles.whenView, { marginTop: "5%" }]}>
          <Text style={{ color: Colors.s_blue, fontSize: 14 }}>When?</Text>
          {availableTimePerCoach.loading && <Spinner color={Colors.s_blue} />}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {!availableTimePerCoach.loading && availableTimePerCoach?.data?.length == 0 && <Text>No results. Select a new time range</Text> }

            {!availableTimePerCoach.loading && availableTimePerCoach.data && availableTimePerCoach.data.map(t => {
              const isSelected = isSessionSelected(t)

              return <TouchableOpacity onPress={() => addSession(t)} style={{ width: '45%', padding: '1%', marginBottom: '1%', backgroundColor: isSelected ? `${Colors.nl_yellow}30` : '#00000005' }}>
                <Text style={{ padding: '1%', textAlign: 'center' }}>{t.TimeTag}</Text>
              </TouchableOpacity>
            })}
          </View>
        </View>
        <View style={styles.whenView}>
          <Text style={{ color: Colors.s_blue, fontSize: 14 }}>Where?</Text>
        </View>

        <View style={styles.tabContain}>
          <Tabs
            tabTitle={[
              { id: 1, title: 'Training Pitch Location' },
              { id: 2, title: 'Home Pitch Location' },
            ]}
            selectedTab={selectedTab}
            activeColor={activeColor}
            inActiveColor={inActiveColor}
            onChangeTab={(index) => setSelectedTab(index)}
          />
        </View>

        {selectedTab === 0 && (
          <>
            {coach.TrainingLocations.length != 0 && (
              <TeachingCard
                selectedItem={selectedLocation}
                onPress={(i) => setSelectedLocation(i)}
                data={coach.TrainingLocations.map(i => ({
                  id: i.Id,
                  title: i.LocationName,
                  subTitle: i.LocationAddress,
                  ...i,
                }))} />
            )}
            {coach.TrainingLocations.length == 0 && <Text style={{ padding: '5%', textAlign: 'center', fontSize: 14 }}>No Training Locations</Text>}
          </>
        )}

        {selectedTab === 1 && (
          <>
            {profile.TrainingLocations.filter(filterLocationCoachCanTravel).length != 0 && (
              <TeachingCard
                selectedItem={selectedLocation}
                onPress={(i) => setSelectedLocation(i)}
                data={profile.TrainingLocations.filter(filterLocationCoachCanTravel).map(i => ({
                  id: i.Id,
                  title: i.LocationName,
                  subTitle: i.LocationAddress,
                }))} />
            )}
            {profile.TrainingLocations.filter(filterLocationCoachCanTravel).length == 0 && <Text style={{ padding: '5%', textAlign: 'center', fontSize: 14 }}>No Training Locations</Text>}
          </>
        )}
      </View>
    </ScrollView>
  );
}

export default BookNow;
