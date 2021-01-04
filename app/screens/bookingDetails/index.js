import React, { useEffect, useState, useDebugValue } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, Alert, Dimensions } from 'react-native';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import HeaderTitleBack from '../../components/header/HeaderTitleBack';
import Images from '../../constants/image';
import { Icon, Spinner } from 'native-base';
import moment from 'moment';
import { useGlobalState } from '../../state/GlobalState';
import useAxios from 'axios-hooks'
import Colors from '../../constants/color';
import { parseISO, format, differenceInHours, isAfter } from 'date-fns';


const JobDetails = (props) => {
  const [profile] = useGlobalState("profile")
  const [currentCoach, setCurrentCoach] = useState()
  const data = {
    "playerId": profile?.Id,
    "search": ""
  }
  const [getCoachReq, getCoach] = useAxios({
    url: '/Users/GetCoaches',
    method: 'POST',
    data
  }, { manual: true })

  const [cancelBookingReq, cancelBooking] = useAxios({
    url: `/Users/CancelBooking/${props.navigation.getParam("Id")}`,
  }, { manual: true })

  const initFn = () => {
    if (profile?.Role == "Player") {
      getCoach({ data })
        .then(r => {
          setCurrentCoach(r.data.find(c => c.Id == props.navigation.getParam("CoachID")))
        })
    }
  }

  useEffect(() => {
    initFn()
    const focusListener = props.navigation.addListener('didFocus', () => {
      initFn()
    });
    return () => {
      focusListener?.remove();
      setCurrentCoach(undefined)
    }
  }, [])

  const canCancel = () => {
    let serverDatetime = parseISO(props.navigation.getParam("CurrentTime"))
    let userTimezoneOffset = serverDatetime.getTimezoneOffset() * 60000;
    serverDatetime = new Date(serverDatetime.getTime() - userTimezoneOffset)

    let sessionDatetime = parseISO(props.navigation.getParam("BookingDate"))
    userTimezoneOffset = sessionDatetime.getTimezoneOffset() * 60000;
    sessionDatetime = new Date(sessionDatetime.getTime() - userTimezoneOffset)    

    return differenceInHours(sessionDatetime, serverDatetime) >= 72 && !cancelBookingReq.loading && props.navigation.getParam("BookingStatus") != "Cancelled"
  }

  const canReschedule = () => {
    let serverDatetime = parseISO(props.navigation.getParam("CurrentTime"))
    let userTimezoneOffset = serverDatetime.getTimezoneOffset() * 60000;
    serverDatetime = new Date(serverDatetime.getTime() - userTimezoneOffset)

    let sessionDatetime = parseISO(props.navigation.getParam("BookingDate"))
    userTimezoneOffset = sessionDatetime.getTimezoneOffset() * 60000;
    sessionDatetime = new Date(sessionDatetime.getTime() - userTimezoneOffset)   
    
    console.log('canReschedule BookingDate',props.navigation.getParam("BookingDate"))
    console.log('canReschedule sessionDatetime', sessionDatetime)
    console.log('canReschedule serverDatetime',serverDatetime)
    console.log('canReschedule differenceInHours',differenceInHours(sessionDatetime, serverDatetime))

    return differenceInHours(sessionDatetime,serverDatetime) >= 48 && props.navigation.getParam("BookingStatus") != "Cancelled"
  }

  const renderCompletedButton = () => {
    let serverDatetime = parseISO(props.navigation.getParam("CurrentTime"))
    let userTimezoneOffset = serverDatetime.getTimezoneOffset() * 60000;
    serverDatetime = new Date(serverDatetime.getTime() - userTimezoneOffset)

    let sessionDatetime = parseISO(props.navigation.getParam("BookingDate"))
    userTimezoneOffset = sessionDatetime.getTimezoneOffset() * 60000;
    sessionDatetime = new Date(sessionDatetime.getTime() - userTimezoneOffset)   

    return isAfter(serverDatetime, sessionDatetime)
  }
  const canComplete = () => props.navigation.getParam("BookingReviews").find(r => r.PlayerId == profile?.Id) == null

  const viewProfileIsDisabled = () => currentCoach == undefined && profile?.Role == "Player"

  return (
    <ScrollView style={{ backgroundColor: 'white' }} contentContainerStyle={{ flexGrow: 1 }}>
      <HeaderTitleBack title={'Job Detail'} onBackPress={() => props.navigation.navigate('Booking')} navigate={props.navigation.navigate} />

      <View style={styles.detailsView}>
        <View style={styles.userView}>
          <Image
            source={props.navigation.getParam("ProfileImage") ? { uri: props.navigation.getParam("ProfileImage") } : Images.MessiPlayer}
            style={styles.userImg}
          />
        </View>
        <View style={styles.userInfoView}>
          <View style={styles.headView}>
            <Text style={styles.userName}>{props.navigation.getParam("FullName")}</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate('Chat', { RecieverId: props.navigation.getParam("CoachID"), SenderId: profile?.Id })}>
              <Icon
                name="message"
                type="MaterialIcons"
                style={styles.header_menu_icon}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.orderView, { marginTop: 25 }]}>
            <Text style={styles.headText}>Order Number</Text>
            <Text style={styles.headText1}>#{props.navigation.getParam("BookingNumber")}</Text>
          </View>

          <View style={[styles.orderView, { flexDirection: 'row' }]}>
            <View>
              <Text style={styles.headText}>Cost</Text>
              <Text style={styles.headText1}>£ {props.navigation.getParam("CoachRate")}</Text>
            </View>
          </View>

          <View style={styles.orderView}>
            <Text style={styles.headText}>Training Location Address</Text>
            <Text style={styles.headText1}>{props.navigation.getParam("Location").LocationAddress}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.btnView, { height: '8%', width: Dimensions.get("screen").width }]}>
        {!renderCompletedButton() && (
          <TouchableOpacity disabled={!canCancel()} onPress={() => {
            Alert.alert("", "Are you sure you want to Cancel the booking?", [
              {
                text: 'Yes', onPress: () => {
                  cancelBooking()
                    .then(() => {
                      props.navigation.navigate("Booking")
                    })
                }
              },
              { text: 'No', style: 'cancel' },
            ],
              { cancelable: true })
          }} style={{ flex: 1, justifyContent: 'center' }}>
            <View style={[styles.btnTab, { opacity: canCancel() ? 1 : 0.5 }]}>
              {cancelBookingReq.loading && <Spinner color={Colors.g_text} />}
              {!cancelBookingReq.loading && (
                <>
                  <Icon
                    name="close"
                    type="MaterialIcons"
                    style={styles.btn_menu_icon}
                  />
                  <Text style={styles.btnText}>Cancel</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
        {renderCompletedButton() && profile?.Role == "Player" && (
          <TouchableOpacity disabled={!canComplete()} onPress={() => {
            NavigationService.navigate("ReviewScreen", { bookingId: props.navigation.getParam("Id") })
          }} style={{ width: '33%', justifyContent: 'center', opacity: canComplete() ? 1:0.5 }}>
            <View style={[styles.btnTab]}>
              {cancelBookingReq.loading && <Spinner color={Colors.g_text} />}
              {!cancelBookingReq.loading && (
                <>
                  <Icon
                    name="done"
                    type="MaterialIcons"
                    style={styles.btn_menu_icon}
                  />
                  <Text style={styles.btnText}>Complete</Text>
                </>
              )}
            </View>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            const params = {
              coach: profile,
              BookingId: props.navigation.getParam("Id"),
              FromTime: moment(props.navigation.getParam("FromTime")).utc().format('hh:mm A'),
              ToTime: moment(props.navigation.getParam("ToTime")).utc().format('hh:mm A'),
              Location: props.navigation.getParam("Location"),
              SentDate: props.navigation.getParam("SentDate"),
              isEditing: true,
            }
            NavigationService.navigate("BookNow", params)
          }}
          disabled={!canReschedule()}>
          <View style={[styles.btnTab, { opacity: canReschedule() ? 1 : 0.5 }]}>
            <Icon
              name="restore"
              type="MaterialIcons"
              style={styles.btn_menu_icon}
            />
            <Text style={styles.btnText}>Reschedule</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={viewProfileIsDisabled()}
          style={{ flex: 1 }}
          onPress={() => {
            if (profile?.Role == 'Coach') {
              NavigationService.navigate("PlayerInfo", { player: { ...props.navigation.getParam("Player"), Role: 'Player' } })
            } else {
              NavigationService.navigate("Information", currentCoach)
            }
          }}>
          <View style={[styles.btnTab, { opacity: viewProfileIsDisabled() ? 0.5 : 1 }]}>
            <Icon
              name="user"
              type="Feather"
              style={styles.btn_menu_icon}
            />
            <Text style={styles.btnText}>View Profile</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StepsComponent steps={props.navigation.getParam("Statuses").map((s, idx, arr) => {
        return {
          title: s.Status,
          details: s.Date ? `On ${s.Date.split('T')[0]}` : undefined,
          status: idx == arr.length - 1 ? 'Active': undefined
        }
      })} {...props} />
    </ScrollView>
  );
};

const StepsComponent = ({ steps, ...props }) => {
  return (
    <View style={styles.jobStatus}>
      <Text style={[styles.btnText, { fontSize: 18, marginBottom: '5%' }]}>Job Status</Text>
      {steps.map((({ title, details, status = 'Idle' }, idx, arr) => {
        let cardStatusStyles = {}
        let triangleStatusStyles = {}
        let textStatusStyles = {}
        let dashStatusStyles = {}
        let dashWrapperStatusStyles = { backgroundColor: 'rgba(29,181,56,1)' }
        if (status == "Idle") {
          cardStatusStyles = { backgroundColor: 'rgb(244,247,248)' }
          triangleStatusStyles = { borderRightColor: 'rgb(244,247,248)' }
        }
        if (status == "Disabled") {
          cardStatusStyles = { backgroundColor: 'rgb(244,247,248)' }
          triangleStatusStyles = { borderRightColor: 'rgb(244,247,248)' }
          textStatusStyles = { color: 'lightgray' }
          dashStatusStyles = { height: 0 }
          dashWrapperStatusStyles = { borderWidth: 0, backgroundColor: 'lightgray', marginTop: '5%' }
        }
        return (
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={[{ width: '10%', alignItems: 'center' }]}>
                {status == 'Disabled' && <View style={{ width: '10%', flex: 0.7, backgroundColor: 'gray' }} />}
                <View style={[styles.dontFilled, { ...dashWrapperStatusStyles }]} />
                <View style={{ width: '10%', flex: 1, height: '100%', backgroundColor: status == 'Disabled' || idx == arr.length - 1 ? 'transparent' : 'gray' }} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={[styles.triangle, triangleStatusStyles]} />
                <View style={[styles.details, cardStatusStyles]}>
                  <Text style={[styles.btnText, { fontSize: 18, color: 'black' }]}>{title}</Text>
                  {details && (
                    <Text style={[styles.btnText, { fontSize: 12, fontWeight: '300', ...textStatusStyles }]}>
                      {details}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        );
      }))}

    </View>
  );

}

export default JobDetails;
