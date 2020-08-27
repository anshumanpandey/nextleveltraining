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
import DateTimePickerModal from 'react-native-modal-datetime-picker';
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


const BookNow = ({ navigation: { addListener, state: { params: { coach, BookingId, FromTime, ToTime, Location, SentDate, isEditing = false } } } }) => {
  const activeColor = Colors.s_blue;
  const inActiveColor = 'gray';

  const [profile] = useGlobalState('profile')

  const [dropdownOptions, setDropdownOptions] = useState([])
  const [date, setDate] = useState(_today)
  const [isDatePickerVisible, setIsDatePickerVisible] = useState()
  const [time, setTime] = useState()
  const [selectedTab, setSelectedTab] = useState(0)
  const [selectedLocation, setSelectedLocation] = useState()

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
    const startPoint = { latitude: coach.Lat, longitude: coach.Lng }
    const endPoint = { latitude: location.Lat, longitude: location.Lng }
    const milesAwayFromLocation = getDistance(startPoint, endPoint)
    return milesAwayFromLocation <= coach.TravelMile.TravelDistance
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.topContain}>
        <View style={[styles.orgView, { height: '36%'} ]}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Icon
              onPress={() => NavigationService.goBack()}
              name="close"
              type="MaterialIcons"
              style={{ fontSize: 25, color: 'white', padding: 10 }}
            />
            <TouchableOpacity
              style={{ width: '40%'}}
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
              <View style={{ flex: 1,flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', paddingRight: '5%'}}>
                {isLoading() && <Spinner color="white" style={{ marginRight: '10%' }} />}
                <Text style={{ color: 'white', fontSize: 18, opacity: (selectedLocation && time) || !isLoading() ? 1 : 0.5 }}>
                  Save
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
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            date={date}
            mode="date"
            onConfirm={(d) => {
              setIsDatePickerVisible(false)
              const userTimezoneOffset = d.getTimezoneOffset() * 60000;
              setDate(new Date(d.getTime() - userTimezoneOffset))
            }}
            onCancel={() => setIsDatePickerVisible(false)}
          />
          <TouchableOpacity
            onPress={() => setIsDatePickerVisible(true)}
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 18 }}>{moment(date).format(_format)}</Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={{ fontSize: 30, color: 'white' }}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.whenView, { marginTop: "5%" }]}>
          <Text style={{ color: Colors.s_blue, fontSize: 14 }}>When?</Text>
          {availableTimePerCoach.loading && <Spinner color={'white'} />}
          {!availableTimePerCoach.loading && (
            <Menu
              ref={(ref) => (_menu = ref)}
              style={{ maxHeight: 225, marginRight: 'auto', marginLeftL:'auto' }}
              button={
                <TouchableOpacity
                  style={styles.menuContainer}
                  disabled={dropdownOptions.length == 0}
                  onPress={() => {
                    showMenu();
                  }}>
                  <Text style={{ fontSize: 15, color: !time && dropdownOptions.length == 0 && 'No available hours' ? 'gray' : 'black' }}>
                    {time && time}
                    {!time && dropdownOptions.length != 0 && 'Select Time'}
                    {!time && dropdownOptions.length == 0 && 'No available hours'}
                  </Text>
                  <Icon
                    name="arrow-drop-down"
                    type="MaterialIcons"
                    style={{ fontSize: 30, color: 'lightgray' }}
                  />
                </TouchableOpacity>
              }>
              <ScrollView showsVerticalScrollIndicator={false}>
                {!availableTimePerCoach.loading && dropdownOptions.length != 0 && dropdownOptions.map((objs, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setTime(objs)
                        hideMenu();
                      }}
                      style={{
                        width: Dimension.deviceWidth - 75,
                        alignItems: 'center',
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        borderBottomWidth: 0.5,
                        borderColor: 'lightgray',
                        height: 45,
                      }}>
                      <Text
                        style={{
                          marginLeft: 8,
                          fontWeight: objs === time ? '600' : '400',
                        }}>
                        {objs}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </Menu>

          )}
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
