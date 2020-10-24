import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../../../constants/image';
import styles from './information/information-style';
import { Icon, Spinner } from 'native-base';
import NavigationService from '../../../navigation/NavigationService';
import Dimension from '../../../constants/dimensions';
import Menu from 'react-native-material-menu';
import TeachingCard from '../components/subcomponents/TeachingCard';
import Colors from '../../../constants/color';
import moment from 'moment';
import Tabs from './information/Tabs';
import { Calendar } from 'react-native-calendars';
import { useGlobalState } from '../../../state/GlobalState';
import useAxios from 'axios-hooks'
import getDistance from 'geolib/es/getDistance';

const _format = 'ddd, MMM DD, YYYY';
const _today = new Date();
let _menu = null;
const showMenu = () => {
  _menu.show();
};
const hideMenu = () => {
  _menu.hide();
};

const getWeeksDay = (except) => {
  const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysInWeek.filter(d => !except.includes(d))
}

const UseMarkedDates = (props) => {
  const [markedDays, setMarkedDay] = useState({})
  const [nonAvailableDays, setNonAvailableDays] = useState({})
  const [partialBookedDay, setPartialBookedDay] = useState({})

  const [singleUserReq, getSingleUser] = useAxios({}, { manual: true })

  const isUpdating = () => singleUserReq.loading

  useEffect(() => {
    getSingleUser({ url: `/Account/GetUserByEmail/${props.EmailID}` })
      .then(({ data }) => {
        getWeeksDay(data.Availabilities.map(i => i.Day)).forEach(d => {
          markDayOfWeekNonAvailable(d)
        })
      })

    const bookedDays = props.Bookings.reduce((newState, booking) => {
      newState[booking.BookingDate.split('T')[0]] = { selected: true, selectedColor: 'orange' }
      return newState
    }, {})
    setPartialBookedDay(bookedDays)
  }, [props.EmailID])

  const markAvailableDay = (string) => {
    setMarkedDay({ [string]: { selected: true, selectedColor: 'white' } })
  }

  const markDayOfWeekNonAvailable = (dayOfWeek) => {
    var dayOfW = moment().startOf('month')
    var month = dayOfW.month();

    const dayArr = []
    while (month === dayOfW.month()) {
      if (dayOfW.format('dddd') == dayOfWeek) {
        dayArr.push(dayOfW.format('YYYY-MM-DD'))
      }
      dayOfW = dayOfW.add(1, 'd');
    }
    const newDate = {}
    dayArr.forEach(d => {
      newDate[d] = { selected: true, selectedColor: 'red', disabled: true }
    })

    setNonAvailableDays((p) => ({ ...p, ...newDate }))
  }

  return {
    isUpdating,
    markedDays: { ...markedDays, ...nonAvailableDays, ...partialBookedDay },
    markAvailableDay,
    markDayOfWeekNonAvailable
  }
}


const BookNow = ({ navigation: { addListener, state: { params: { coach, BookingId, FromTime, ToTime, Location, SentDate, isEditing = false } } } }) => {
  const activeColor = Colors.s_blue;
  const inActiveColor = 'gray';

  const [profile] = useGlobalState('profile')

  const [dropdownOptions, setDropdownOptions] = useState([])
  const [date, setDate] = useState(_today)
  const [time, setTime] = useState()
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState()
  const { markedDays, markAvailableDay, isUpdating } = UseMarkedDates({ EmailID: coach.EmailID, Bookings: coach.Bookings });

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
    FromTime && ToTime && setTime(`${FromTime}-${ToTime}`)
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
    const data = {
      "coachID": coach.Id,
      "date": date.toISOString()
    }
    getUserData({ data })
      .then((r) => {
        setDropdownOptions(r.data)
        if (r.data.length == 0) {
          setTime(undefined)
        }
      })
  }, [date])

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
              style={{ fontSize: 25, color: 'white', padding: 10 }}
            />
            <TouchableOpacity
              style={{ width: '40%' }}
              disabled={selectedLocation == undefined || time == undefined || rescheduleBookingReq.loading}
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
                  NavigationService.navigate('PaymentConcent', { coach, selectedLocation, selectedTime: time, selectedDate: date })
                }
              }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '5%' }}>
                {isLoading() && <Spinner color="white" style={{ marginRight: '10%' }} />}
                <Text style={{ color: 'white', fontSize: 18, opacity: (selectedLocation && time) || !isLoading() ? 1 : 0.5 }}>
                  Book Now
              </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <Image source={coach.ProfileImage ? { uri: coach.ProfileImage } : Images.PlayerPlaceholder} style={styles.userImg} />
            <Text style={{ color: 'white', fontSize: 18, marginLeft: 15 }}>
              {coach.FullName}
            </Text>
          </View>
        </View>
        <Calendar
          onDayPress={(day) => {
            setDate(moment(day.dateString, 'YYYY-MM-DD'))
            markAvailableDay(day.dateString)
          }}
          markedDates={markedDays}
          disableAllTouchEventsForDisabledDays={true}
          theme={{
            calendarBackground: Colors.s_blue,
            dayTextColor: 'white',
            todayTextColor: 'white',
            selectedDayTextColor: Colors.s_blue,
            arrowColor: 'white',
            monthTextColor: 'white',
          }}
        />

        <View style={[styles.whenView, { marginTop: "5%" }]}>
          <Text style={{ color: Colors.s_blue, fontSize: 14 }}>When?</Text>
          {availableTimePerCoach.loading && <Spinner color={Colors.s_blue} />}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
            {!availableTimePerCoach.loading && availableTimePerCoach.data && availableTimePerCoach.data.map(t => {
              const isSelected = time == t

              return <TouchableOpacity onPress={() => setTime(t)} style={{ width: '30%', padding: '1%', marginBottom: '1%',backgroundColor: isSelected ? `${Colors.nl_yellow}30`:'#00000005' }}>
                <Text style={{ padding: '1%',textAlign: 'center' }}>{t}</Text>
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
