import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import HeaderTitleBack from '../../components/header/HeaderTitleBack';
import Images from '../../constants/image';
import {Icon} from 'native-base';
import Dash from 'react-native-dash';

const JobDetails = () => {
  const onClickItem = () => {
    alert('onClickItem');
  };
  return (
    <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
      <HeaderTitleBack title={'Job Detail'} />

      <View style={styles.detailsView}>
        <View style={styles.userView}>
          <Image
            // resizeMode={'contain'}
            source={Images.MessiPlayer}
            style={styles.userImg}
          />
        </View>
        <View style={styles.userInfoView}>
          <View style={styles.headView}>
            <Text style={styles.userName}>{'John James.'}</Text>
            <Icon
              name="message"
              type="MaterialIcons"
              style={styles.header_menu_icon}
            />
          </View>
          <View style={[styles.orderView,{marginTop: 25}]}>
            <Text style={styles.headText}>Order Number</Text>
            <Text style={styles.headText1}>#84</Text>
          </View>

          <View style={[styles.orderView, {flexDirection: 'row'}]}>
            <View>
              <Text style={styles.headText}>Season for</Text>
              <Text style={styles.headText1}>20th Jan, 09:00 - 11:00</Text>
            </View>
            <View>
              <Text style={styles.headText}>Job fees</Text>
              <Text style={styles.headText1}>&euro; 200 per hour</Text>
            </View>
          </View>

          <View style={styles.orderView}>
            <Text style={styles.headText}>Address</Text>
            <Text style={styles.headText1}>106 Richmond Road England United Kingdom</Text>
          </View>
        </View>
      </View>

      <View style={styles.btnView}>
        <View style={styles.btnTab}>
          <Icon
            name="close"
            type="MaterialIcons"
            style={styles.btn_menu_icon}
          />
          <Text style={styles.btnText}>Cancel</Text>
        </View>
        <View style={styles.btnTab}>
          <Icon
            name="restore"
            type="MaterialIcons"
            style={styles.btn_menu_icon}
          />
          <Text style={styles.btnText}>Reschedule</Text>
        </View>
        <View style={styles.btnTab}>
          <Icon
            name="user"
            type="Feather"
            style={styles.btn_menu_icon}
          />
          <Text style={styles.btnText}>View Profile</Text>
        </View>
      </View>

      <View style={styles.jobStatus}>
        <Text style={[styles.btnText, {fontSize: 18}]}>Job Status</Text>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.dashView}>
            <View style={styles.dontFilled} />
            <Dash dashGap={0} dashColor={'gray'} style={{marginTop: 5, width:1, height:75, flexDirection:'column'}}/>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -20}}>
            <View style={[styles.triangle, {borderBottomColor: 'rgb(244,247,248)'}]} />
            <View style={[styles.details, {backgroundColor: 'rgb(244,247,248)', borderBottomWidth: 0}]}>
              <Text style={[styles.btnText, {fontSize: 18, color: 'black', paddingVertical: 8}]}>Booking Completed</Text>
              <Text style={[styles.btnText, {fontSize: 12, fontWeight: '300',}]}>Booking request sent on 18th Jan, 08:56</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={[styles.dashView, {marginTop: 5}]}>
            <View style={styles.dontFilled} />
            <Dash dashGap={0} dashColor={'gray'} style={{marginTop: 5, width:1, height:60, flexDirection:'column'}}/>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -45}}>
            <View style={styles.triangle} />
            <View style={styles.details}>
              <Text style={[styles.btnText, {fontSize: 18, color: 'black', paddingVertical: 8}]}>Session In Progress</Text>
              <Text style={[styles.btnText, {fontSize: 12, fontWeight: '300',}]}>Booking request sent on 18th Jan, 08:56</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={[styles.dashView, {marginTop: 0}]}>
            <View style={[styles.dontFilled, {backgroundColor: 'lightgray'}]} />
            <Dash dashGap={0} dashColor={'gray'} style={{marginTop: 5, width:1, height:0, flexDirection:'column'}}/>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: -30}}>
            <View style={[styles.triangle, {borderBottomColor: 'rgb(244,247,248)'}]} />
            <View style={[styles.details, {backgroundColor: 'rgb(244,247,248)', borderBottomWidth: 0}]}>
              <Text style={[styles.btnText, {fontSize: 18, color: 'lightgray', paddingVertical: 8}]}>Job Finished</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default JobDetails;
