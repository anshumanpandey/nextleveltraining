import React, {Component, useRef} from 'react';
import {View, Image, Text, ScrollView, TouchableOpacity} from 'react-native';
import Images from '../../../constants/image';
import styles from './information/information-style';
import {Icon} from 'native-base';
import NavigationService from '../../../navigation/NavigationService';
import Dimension from '../../../constants/dimensions';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Menu from 'react-native-material-menu';
import TeachingCard from '../components/subcomponents/TeachingCard';
import Colors from '../../../constants/color';

const BookNow = () => {
  let _menu = useRef(null);
  const showMenu = () => {
    _menu.show();
  };
  const hideMenu = () => {
    _menu.hide();
  };

  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.topContain}>
        <View style={[styles.orgView, {height: Dimension.px200 - 25}]}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Icon
              onPress={() => NavigationService.goBack()}
              name="close"
              type="MaterialIcons"
              style={{fontSize: 25, color: 'white', padding: 10}}
            />
            <TouchableOpacity
              onPress={() => NavigationService.navigate('Payments')}>
              <Text style={{color: 'white', fontSize: 18, padding: 10}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.userView}>
            <Image source={Images.MessiPlayer} style={styles.userImg} />
            <Text style={{color: 'white', fontSize: 18, marginLeft: 15}}>
              John jems.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Jun 2020</Text>
            <Icon
              // onPress={() => NavigationService.goBack()}
              name="keyboard-arrow-right"
              type="MaterialIcons"
              style={{fontSize: 30, color: 'white'}}
            />
          </TouchableOpacity>
          {/*<Calendar
              markingType={'multi-dot'}
              markedDates={{
                '2020-07-14': {
                  periods: [
                    {startingDay: false, endingDay: true, color: '#5f9ea0'},
                    {startingDay: false, endingDay: true, color: '#ffa500'},
                    {startingDay: true, endingDay: false, color: '#f0e68c'}
                  ]
                },
                '2020-07-15': {
                  periods: [
                    {startingDay: true, endingDay: false, color: '#ffa500'},
                    {color: 'transparent'},
                    {startingDay: false, endingDay: false, color: '#f0e68c'}
                  ]
                }
              }}
            />*/}
        </View>

        <View style={styles.whenView}>
          <Text style={{color: Colors.s_blue, fontSize: 14}}>When?</Text>
          <Menu
            ref={(ref) => (_menu = ref)}
            style={{}}
            button={
              <TouchableOpacity
                style={styles.menuContainer}
                onPress={() => {
                  showMenu();
                }}>
                <Text style={{fontSize: 15}}>09:00 am to 11:00 am</Text>
                <Icon
                  // onPress={() => NavigationService.goBack()}
                  name="arrow-drop-down"
                  type="MaterialIcons"
                  style={{fontSize: 30, color: 'lightgray'}}
                />
              </TouchableOpacity>
            }>
            <TouchableOpacity
              onPress={() => {
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
              <Text style={{marginLeft: 8}}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                hideMenu();
              }}
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                paddingHorizontal: 10,
                height: 45,
              }}>
              <Text style={{marginLeft: 8}}>Delete</Text>
            </TouchableOpacity>
          </Menu>
        </View>
        <View style={styles.whenView}>
          <Text style={{color: Colors.s_blue, fontSize: 14}}>Where?</Text>
        </View>

        <View style={styles.tabContain}>
          <View style={styles.tabContainer}>
            <View
              style={[
                styles.tabs,
                {width: Dimension.pro40, borderBottomColor: Colors.s_blue},
              ]}>
              <Text style={[styles.tab_text, {color: Colors.s_blue}]}>
                TEACHING AREA
              </Text>
            </View>
            <View
              style={[
                styles.tabs,
                {width: Dimension.pro40, borderBottomWidth: 0},
              ]}>
              <Text style={styles.tab_text}>HOME AREA</Text>
            </View>
          </View>
        </View>
        <TeachingCard
          data={[
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
            {
              id: 1,
              title: '106 Richmond Road',
              subTitle: '106 Richmond Road England United Kingdom',
            },
          ]}
        />
      </View>
    </ScrollView>
  );
};

export default BookNow;
