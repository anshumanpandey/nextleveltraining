import React, {Component} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './information-style';
import {Icon} from 'native-base';
import NavigationService from '../../../../navigation/NavigationService';
import Images from '../../../../constants/image';
import StarRating from 'react-native-star-rating';
import Colors from '../../../../constants/color';
import InfoTabs from './Information';

const Information = (props) => {
  // console.log(props)
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topContain}>
        <View style={styles.orgView}>
          <Icon
            onPress={() => NavigationService.goBack()}
            name="close"
            type="MaterialIcons"
            style={{fontSize: 25, color: 'white', padding: 10}}
          />
        </View>
        <View style={styles.infoContain}>
          <Image source={Images.MessiPlayer} style={styles.user_pic} />
          <View style={{position: 'absolute', right: 5}}>
            <View style={styles.ps_star_view}>
              <Text style={styles.ps_star_point}>{3.5}</Text>
              <StarRating
                disabled={false}
                maxStars={1}
                rating={2}
                fullStarColor={'#38A663'}
                starSize={12}
              />
              <Text style={styles.ps_star_total}> (98)</Text>
            </View>
          </View>
          <Text style={styles.userName}>John James.</Text>

          <View style={styles.rate_miles}>
            <View style={styles.rate_miles_view}>
              <Text style={styles.headText}>&euro;250</Text>
              <Text style={{fontSize: 12, color: 'gray'}}>per hour</Text>
            </View>
            <View style={styles.rate_miles_view}>
              <Text style={[styles.headText, {textAlign: 'right'}]}>
                {'2.3 miles'}
              </Text>
              <Text style={{fontSize: 12, textAlign: 'right', color: 'gray'}}>
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
        <View style={styles.tabContainer}>
          <View style={styles.tabs}>
            <Text style={[styles.tab_text, {color: Colors.s_blue}]}>
              INFORMATION
            </Text>
          </View>
          <View style={[styles.tabs, {borderBottomWidth: 0}]}>
            <Text style={styles.tab_text}>MEDIA</Text>
          </View>
          <View style={[styles.tabs, {borderBottomWidth: 0}]}>
            <Text style={styles.tab_text}>REVIEW</Text>
          </View>
        </View>
      </View>

      <InfoTabs />
    </ScrollView>
  );
}

export default Information;
