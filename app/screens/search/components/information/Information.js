import React, { Component, useState, useEffect, useCallback } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../../../../constants/image';
import styles from './information-style';
import { Icon, Spinner } from 'native-base';
import NavigationService from '../../../../navigation/NavigationService';
import StarRating from 'react-native-star-rating';
import InformationTab from './informationTab';
import MediaTab from './MediaTab';
import ReviewTab from './ReviewTab';
import useAxios from 'axios-hooks'
import Tabs from './Tabs';
import Colors from '../../../../constants/color';
import getDistance from 'geolib/es/getDistance';
import { getGlobalState, useGlobalState } from '../../../../state/GlobalState';
import dimensions from '../../../../constants/dimensions';
import { StackActions, NavigationActions } from 'react-navigation';
import ConnectedWidget from '../../../../components/ConnectedWidget';
var convert = require('convert-units')

const Information = (props) => {
  const [profile] = useGlobalState('profile')
  const [token] = useGlobalState('token')
  const [selectedTab, setSelectedTab] = useState(0);
  const [milesAway, setMilesAway] = useState();
  const activeColor = Colors.nl_yellow;
  const inActiveColor = 'gray';

  const calculateMiles = useCallback(() => {
    console.log(profile?.Lat)
    console.log(profile?.Lng)
    console.log(props.navigation.getParam("Coach.Lat"))
    console.log(props.navigation.getParam("Lng"))
    console.log(props.navigation.getParam("hideConnect"))

    if (!profile || !profile.Lat || !profile.Lng || !props.navigation.getParam("Lat", null) || !props.navigation.getParam("Lng", null)) {
      setMilesAway(-1)
    } else {
      const meters = getDistance(
        { latitude: profile.Lat, longitude: profile.Lng, },
        { latitude: parseFloat(props.navigation.getParam("Lat")), longitude: parseFloat(props.navigation.getParam("Lng")) }
      )

      setMilesAway(convert(meters).from('m').to("mi").toFixed(2))
    }

  }, [profile?.Lat, !profile?.Lng, props.navigation.getParam("Lat"), props.navigation.getParam("Lng")])

  useEffect(() => {
    calculateMiles()
    const focusListener = props.navigation.addListener('didFocus', () => {
      calculateMiles();
    });
    return () => focusListener?.remove();
  }, [])

  console.log(props.navigation.getParam("editable", false))

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
          <TouchableOpacity disabled={!(props.navigation.getParam("editable", false) == true)} onPress={() => props.navigation.navigate({ routeName: 'ProfilePic', params: { goBackTo: 'Profile' } })}>
            <View>
              <Image
                style={styles.user_pic}
                source={props.navigation.getParam("ProfileImage") ? { uri: props.navigation.getParam("ProfileImage") } : Images.PlayerPlaceholder}
              />
            </View>
            {props.navigation.getParam("editable", false) == true && (
              <View style={{
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
                marginTop: -Dimension.px50
              }}>
                <Icon
                  type="EvilIcons"
                  name="pencil"
                  style={{ color: 'white', fontSize: 25 }}
                />
              </View>
            )}
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', height: 60 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.userName}>{props.navigation.getParam("FullName")}</Text>
            </View>
            {props.navigation.getParam("hideConnect", false) == false && (
              <View style={{ position: 'absolute', right: 0 }}>
                <ConnectedWidget userToConnectTo={props.navigation.getParam("Id")} />
              </View>
            )}
          </View>
          <View style={styles.rate_miles}>
            <View style={styles.rate_miles_view}>
              <Text style={styles.headText}>£ {props.navigation.getParam("Rate")}</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>per hour</Text>
            </View>
            <View style={styles.rate_miles_view}>
              <View style={styles.ps_star_view}>
                <Text style={styles.ps_star_point}>{props.navigation.getParam("AverageBookingRating")}</Text>
                {Number.isInteger(Number.parseInt(props.navigation.getParam("AverageBookingRating"))) && (
                  <StarRating
                    disabled={false}
                    maxStars={1}
                    rating={props.navigation.getParam("AverageBookingRating")}
                    fullStarColor={'#38A663'}
                    starSize={12}
                  />
                )}
              </View>
            </View>
            {props.navigation.getParam("hideCoachButtons", false) == false && (
              <>
                {milesAway && milesAway != -1 && (
                  <View style={[styles.rate_miles_view, { width: dimensions.pro40 }]}>
                    <Text style={[styles.headText, { textAlign: 'right' }]}>
                      {`${milesAway} miles`}
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: 'right', color: 'gray' }}>
                      {'away'}
                    </Text>
                  </View>
                )}
                {milesAway == undefined && (<Spinner color={Colors.s_blue} />)}
                {milesAway == -1 && (<Text></Text>)}
              </>
            )}
          </View>

          {props.navigation.getParam("hideCoachButtons", false) == false && (
            <View style={styles.buttonContain}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate('BookNow', { coach: props.navigation.state.params })}
                style={[styles.button_view]}>
                <Icon
                  type="MaterialIcons"
                  name="check-circle"
                  style={styles.post_comment}
                />
                <Text style={styles.btn_text}>Book now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (true) {
                    props.navigation.navigate('Cart');
                    return
                  }
                  const resetAction = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                      NavigationActions.navigate({
                        routeName: 'MainStack',
                        action: NavigationActions.navigate({ routeName: 'Chat', params: { RecieverId: props.navigation.getParam("Id"), SenderId: profile?.Id, friendName: props.navigation.getParam("FullName") } })
                      })
                    ]
                  })
                  props.navigation.dispatch(resetAction);
                }}
                style={styles.button_view}>
                <Icon
                  type="MaterialIcons"
                  name="comment"
                  style={styles.post_comment}
                />
                <Text style={styles.btn_text}>{'Message'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <View style={styles.tabContain}>
        <Tabs
          selectedTab={selectedTab}
          activeColor={activeColor}
          inActiveColor={inActiveColor}
          onChangeTab={(index) => setSelectedTab(index)}
        />
      </View>

      {selectedTab === 0 ? (
        <InformationTab editable={props.navigation.getParam("editable", false)} selectedTab={selectedTab} coach={props.navigation.getParam("coach", undefined) == undefined ? props.navigation.state.params : getGlobalState("profile")} />
      ) : selectedTab === 1 ? (
        <MediaTab selectedTab={selectedTab} fetchPost={props?.navigation?.getParam("Id", undefined)} posts={props?.navigation?.getParam("Posts", []) || []} />
      ) : (
            <ReviewTab reviews={(props?.navigation?.getParam("Bookings", []) || []).reduce((arr, booking) => {
              arr.push(...booking.BookingReviews)
              return arr
            }, [])} coachId={props.navigation.getParam("Id")} />
          )}
    </ScrollView>
  );
}

export default Information;
