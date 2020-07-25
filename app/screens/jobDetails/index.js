import React, { useEffect, useState, useDebugValue } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import HeaderTitleBack from '../../components/header/HeaderTitleBack';
import Images from '../../constants/image';
import { Icon } from 'native-base';
import Dash from 'react-native-dash';
import moment from 'moment';
import { useGlobalState } from '../../state/GlobalState';
import useAxios from 'axios-hooks'


const JobDetails = (props) => {
  const [profile] = useGlobalState("profile")
  const [currentCoach, setCurrentCoach] = useState()
  const data = {
    "playerId": profile.Id,
    "search": ""
  }
  const [getCoachReq, getCoach] = useAxios({
    url: '/Users/GetCoaches',
    method: 'POST',
    data
  }, {manual: true })

  useEffect(() => {
    getCoach({ data })
      .then(r => {
        setCurrentCoach(r.data.find(c => c.Id == props.navigation.getParam("CoachID")))
      })
    const focusListener = props.navigation.addListener('didFocus', () => {
      getCoach({ data })
      .then(r => {
        setCurrentCoach(r.data.find(c => c.Id == props.navigation.getParam("CoachID")))
      })
    });
    return () => {
      focusListener?.remove();
      setCurrentCoach(undefined)
    }
  }, [])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <HeaderTitleBack title={'Job Detail'} navigate={props.navigation.navigate} />

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
            <Text style={styles.userName}>{props.navigation.getParam("FullName")}</Text>
            <Icon
              name="message"
              type="MaterialIcons"
              style={styles.header_menu_icon}
            />
          </View>
          <View style={[styles.orderView, { marginTop: 25 }]}>
            <Text style={styles.headText}>Order Number</Text>
            <Text style={styles.headText1}>#{props.navigation.getParam("BookingNumber")}</Text>
          </View>

          <View style={[styles.orderView, { flexDirection: 'row' }]}>
            <View>
              <Text style={styles.headText}>Season for</Text>
              <Text style={styles.headText1}>{moment(props.navigation.getParam("FromTime")).format("Do MMM, HH:mm")} - {moment(props.navigation.getParam("ToTime")).format("HH:mm")}</Text>
            </View>
            <View>
              <Text style={styles.headText}>Job fees</Text>
              <Text style={styles.headText1}>£ {props.navigation.getParam("Rate")} per hour</Text>
            </View>
          </View>

          <View style={styles.orderView}>
            <Text style={styles.headText}>Address</Text>
            <Text style={styles.headText1}>{props.navigation.getParam("Location").LocationAddress}</Text>
          </View>
        </View>
      </View>

      <View style={styles.btnView}>
        <View style={[styles.btnTab, { opacity: 0.5 }]}>
          <Icon
            name="close"
            type="MaterialIcons"
            style={styles.btn_menu_icon}
          />
          <Text style={styles.btnText}>Cancel</Text>
        </View>
        <View style={[styles.btnTab, { opacity: 0.5 }]}>
          <Icon
            name="restore"
            type="MaterialIcons"
            style={styles.btn_menu_icon}
          />
          <Text style={styles.btnText}>Reschedule</Text>
        </View>
        <TouchableOpacity disabled={currentCoach == undefined} style={{ width: '100%'}} onPress={() => NavigationService.navigate("Information", currentCoach)}>
          <View style={[styles.btnTab, { opacity: currentCoach == undefined ? 0.5 : 1}]}>
            <Icon
              name="user"
              type="Feather"
              style={styles.btn_menu_icon}
            />
            <Text style={styles.btnText}>View Profile</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.jobStatus}>
        <Text style={[styles.btnText, { fontSize: 18 }]}>Job Status</Text>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.dashView}>
            <View style={[styles.dontFilled, { backgroundColor: 'rgba(29,181,56,1)' }]} />
            <Dash dashGap={0} dashColor={'gray'} style={{ marginTop: 5, width: 1, height: 75, flexDirection: 'column' }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -20 }}>
            <View style={[styles.triangle, { borderRightColor: 'rgb(244,247,248)' }]} />
            <View style={[styles.details, { backgroundColor: 'rgb(244,247,248)', borderBottomWidth: 0 }]}>
              <Text style={[styles.btnText, { fontSize: 18, color: 'black', paddingVertical: 8 }]}>Booking Completed</Text>
              <Text style={[styles.btnText, { fontSize: 12, fontWeight: '300', }]}>Booking request sent on 18th Jan, 08:56</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dashView, { marginTop: 5 }]}>
            <View style={styles.dontFilled}>
              <View style={styles.innerDontFilled} />
            </View>
            <Dash dashGap={0} dashColor={'gray'} style={{ marginTop: 5, width: 1, height: 60, flexDirection: 'column' }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -45 }}>
            <View style={styles.triangle} />
            <View style={styles.details}>
              <Text style={[styles.btnText, { fontSize: 18, color: 'black', paddingVertical: 8 }]}>Session In Progress</Text>
              <Text style={[styles.btnText, { fontSize: 12, fontWeight: '300', }]}>Booking request sent on 18th Jan, 08:56</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dashView, { marginTop: 0 }]}>
            <View style={[styles.dontFilled, { borderWidth: 0, backgroundColor: 'lightgray' }]} />
            <Dash dashGap={0} dashColor={'gray'} style={{ marginTop: 5, width: 1, height: 0, flexDirection: 'column' }} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -30 }}>
            <View style={[styles.triangle, { borderRightColor: 'rgb(244,247,248)' }]} />
            <View style={[styles.details, { backgroundColor: 'rgb(244,247,248)', borderBottomWidth: 0 }]}>
              <Text style={[styles.btnText, { fontSize: 18, color: 'lightgray', paddingVertical: 8 }]}>Job Finished</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default JobDetails;
