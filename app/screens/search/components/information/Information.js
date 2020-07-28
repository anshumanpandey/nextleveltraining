import React, { Component, useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../../../../constants/image';
import styles from './information-style';
import { Icon, Spinner } from 'native-base';
import NavigationService from '../../../../navigation/NavigationService';
import StarRating from 'react-native-star-rating';
import InformationTab from './informationTab';
import MediaTab from './MediaTab';
import ReviewTab from './ReviewTab';
import Tabs from './Tabs';
import Colors from '../../../../constants/color';
import getDistance from 'geolib/es/getDistance';
import { useGlobalState } from '../../../../state/GlobalState';
import dimensions from '../../../../constants/dimensions';
var convert = require('convert-units')

const Information = (props) => {
  const [profile] = useGlobalState('profile')
  const [selectedTab, setSelectedTab] = useState(0);
  const [milesAway, setMilesAway] = useState();
  const activeColor = Colors.s_blue;
  const inActiveColor = 'gray';

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', () => {

      console.log(profile.Lat)
      console.log(profile.Lng)
      console.log(props.navigation.getParam("Lat"))
      console.log(props.navigation.getParam("Lng"))

      if (!profile.Lat || !profile.Lng || !props.navigation.getParam("Lat", null) || !props.navigation.getParam("Lng", null)) {
        setMilesAway(-1)
      } else {
        const meters = getDistance(
          { latitude: profile.Lat, longitude: profile.Lng, },
          { latitude: parseFloat(props.navigation.getParam("Lat")), longitude: parseFloat(props.navigation.getParam("Lng")) }
        )

        setMilesAway(convert(meters).from('m').to("mi").toFixed(2))
      }

    });
    return () => focusListener?.remove();
  }, [])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.topContain}>
        <View style={styles.orgView}>
          <Icon
            onPress={() => NavigationService.goBack()}
            name="close"
            type="MaterialIcons"
            style={{ fontSize: 25, color: 'white', padding: 10 }}
          />
        </View>
        <View style={styles.infoContain}>
          <Image source={{ uri: props.navigation.getParam("ProfileImage") }} style={styles.user_pic} />
          <Text style={styles.userName}>{props.navigation.getParam("FullName")}</Text>

          <View style={styles.rate_miles}>
            <View style={styles.rate_miles_view}>
              <Text style={styles.headText}>£ {props.navigation.getParam("Rate")}</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>per hour</Text>
            </View>
            <View style={styles.rate_miles_view}>
              <View style={styles.ps_star_view}>
                <Text style={styles.ps_star_point}>{props.navigation.getParam("AverageRating")}</Text>
                {Number.isInteger(props.AverageRating) && (
                  <StarRating
                    disabled={false}
                    maxStars={1}
                    rating={2}
                    fullStarColor={'#38A663'}
                    starSize={12}
                  />
                )}
                {Number.isInteger(props.AverageRating) && (
                  <Text style={styles.ps_star_total}> ({props.navigation.getParam("Rate")})</Text>
                )}
              </View>
            </View>
            {milesAway && milesAway != -1 && (
              <View style={[styles.rate_miles_view, { width: dimensions.pro40}]}>
                <Text style={[styles.headText, { textAlign: 'right' }]}>
                  {`${milesAway} miles`}
                </Text>
                <Text style={{ fontSize: 12, textAlign: 'right', color: 'gray' }}>
                  {'away from your'}
                </Text>
              </View>
            )}
            {milesAway == undefined && (<Spinner color={Colors.s_yellow} />)}
            {milesAway == -1 && (<Text></Text>)}
          </View>

          <View style={styles.buttonContain}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('BookNow', { coach: props.navigation.state.params })}
              style={[styles.button_view, { width: '99%' }]}>
              <Icon
                type="MaterialIcons"
                name="check-circle"
                style={styles.post_comment}
              />
              <Text style={styles.btn_text}>Book now</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity
              onPress={() => NavigationService.navigate('Chat',{ReceiverId:props.navigation.getParam("Id")})}
              style={styles.button_view}>
              <Icon
                type="MaterialIcons"
                name="comment"
                style={styles.post_comment}
              />
              <Text style={styles.btn_text}>{'Message'}</Text>
            </TouchableOpacity>*/}
          </View>
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
        <InformationTab selectedTab={selectedTab} {...props.navigation.state.params} />
      ) : selectedTab === 1 ? (
        <MediaTab selectedTab={selectedTab} posts={props.navigation.state.params.Posts} />
      ) : (
            <ReviewTab />
          )}
    </ScrollView>
  );
}

export default Information;
