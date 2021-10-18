import React, { useState, useEffect, useCallback } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'native-base'
import getDistance from 'geolib/es/getDistance'
import Images from '../../constants/image'
import styles from '../search/components/information/information-style'
import NavigationService from '../../navigation/NavigationService'
import InformationTab from '../search/components/information/informationTab'
import MediaTab from '../search/components/information/MediaTab'
import ReviewTab from '../search/components/information/ReviewTab'
import Tabs from '../search/components/information/Tabs'
import Colors from '../../constants/color'
import { getGlobalState, useGlobalState } from '../../state/GlobalState'

const convert = require('convert-units')

const MyProfileCoach = props => {
  const [profile] = useGlobalState('profile')
  const [selectedTab, setSelectedTab] = useState(0)
  const [, setMilesAway] = useState()
  const activeColor = Colors.nl_yellow
  const inActiveColor = 'gray'

  const calculateMiles = useCallback(() => {
    if (!profile || !profile.Lat || !profile.Lng) {
      setMilesAway(-1)
    } else {
      const meters = getDistance(
        { latitude: profile.Lat, longitude: profile.Lng },
        {
          latitude: parseFloat(profile.Lat),
          longitude: parseFloat(profile.Lng),
        },
      )

      setMilesAway(convert(meters).from('m').to('mi').toFixed(2))
    }
  }, [profile?.Lat, !profile?.Lng])

  useEffect(() => {
    calculateMiles()
    const focusListener = props.navigation.addListener('didFocus', () => {
      calculateMiles()
    })
    return () => focusListener?.remove()
  }, [])

  // console.log(props.navigation.getParam("editable", false))

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>
      <View style={styles.topContain}>
        <View style={styles.orgView}>
          <Icon
            onPress={() => NavigationService.goBack()}
            name="close"
            type="MaterialIcons"
            style={{ fontSize: 25, color: Colors.s_blue, padding: 10 }}
          />
        </View>
        <View style={[styles.infoContain, { marginTop: '5%' }]}>
          <TouchableOpacity
            // disabled={true}
            onPress={() => {
              const screenName = 'MyProfileCoach'
              if (profile && profile.Role == 'Player') {
                props.navigation.navigate('MyProfilePlayer')
              }

              props.navigation.navigate({
                routeName: 'ProfilePic',
                params: { goBackTo: screenName },
              })
            }
            }>
            <View>
              <Image
                style={styles.user_pic}
                source={
                  profile && profile.ProfileImage
                    ? { uri: profile.ProfileImage }
                    : Images.PlayerPlaceholder
                }
              />
            </View>
            {/* <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                width: Dimension.px30,
                height: Dimension.px30,
                backgroundColor: Colors.s_blue,
                borderRadius: Dimension.px30 / 2,
                right: 0,
                top: 0,
                marginTop: -Dimension.px50,
              }}>
              <Icon
                type="EvilIcons"
                name="pencil"
                style={{color: 'white', fontSize: 25}}
              />
            </View> */}
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'center',
              height: 60,
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.userName}>{profile.FullName}</Text>
            </View>
            {/* {props.navigation.getParam('hideConnect', false) == false && (
              <View style={{position: 'absolute', right: 0}}>
                <ConnectedWidget
                  userToConnectTo={profile.Id}
                />
              </View>
            )} */}
          </View>
          <View style={styles.rate_miles}>
            <View style={styles.rate_miles_view}>
              <Text style={styles.headText}>£ {profile.Rate}</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>per hour</Text>
            </View>
          </View>
        </View>

        <View style={styles.tabContain}>
          <Tabs
            selectedTab={selectedTab}
            activeColor={activeColor}
            inActiveColor={inActiveColor}
            onChangeTab={index => setSelectedTab(index)}
          />
        </View>

        {selectedTab === 0 ? (
          <InformationTab
            // editable={props.navigation.getParam('editable', false)}
            selectedTab={selectedTab}
            coach={getGlobalState('profile')}
          />
        ) : selectedTab === 1 ? (
          <MediaTab
            selectedTab={selectedTab}
            fetchPost={profile.Id}
            posts={profile?.Posts || []}
          />
        ) : (
          <ReviewTab
            reviews={(profile?.Bookings || []).reduce((arr, booking) => {
              arr.push(...booking.BookingReviews)
              return arr
            }, [])}
            coachId={props.navigation.getParam('Id')}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default MyProfileCoach
