import React, { Component, useState } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native';
import Images from '../../../../constants/image';
import styles from './information-style';
import { Icon } from 'native-base';
import NavigationService from '../../../../navigation/NavigationService';
import StarRating from 'react-native-star-rating';
import InformationTab from './informationTab';
import MediaTab from './MediaTab';
import ReviewTab from './ReviewTab';
import Tabs from './Tabs';
import Colors from '../../../../constants/color';

const Information = (props) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const activeColor = Colors.s_blue;
  const inActiveColor = 'gray';

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
          <Image source={Images.MessiPlayer} style={styles.user_pic} />
          <View style={{ position: 'absolute', right: 5 }}>
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
          <Text style={styles.userName}>{props.navigation.getParam("FullName")}</Text>

          <View style={styles.rate_miles}>
            <View style={styles.rate_miles_view}>
              <Text style={styles.headText}>£ {props.navigation.getParam("Rate")}</Text>
              <Text style={{ fontSize: 12, color: 'gray' }}>per hour</Text>
            </View>
            <View style={styles.rate_miles_view}>
              <Text style={[styles.headText, { textAlign: 'right' }]}>
                {'2.3 miles'}
              </Text>
              <Text style={{ fontSize: 12, textAlign: 'right', color: 'gray' }}>
                {'away from your'}
              </Text>
            </View>
          </View>

          <View style={styles.buttonContain}>
            <TouchableOpacity
              onPress={() => NavigationService.navigate('BookNow')}
              style={styles.button_view}>
              <Icon
                type="MaterialIcons"
                name="check-circle"
                style={styles.post_comment}
              />
              <Text style={styles.btn_text}>Book now</Text>
            </TouchableOpacity>
            <View style={styles.button_view}>
              <Icon
                type="MaterialIcons"
                name="comment"
                style={styles.post_comment}
              />
              <Text style={styles.btn_text}>{'Message'}</Text>
            </View>
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
        <InformationTab {...props.navigation.state.params} />
      ) : selectedTab === 1 ? (
        <MediaTab />
      ) : (
            <ReviewTab />
          )}
    </ScrollView>
  );
}

export default Information;
