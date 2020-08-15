import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import StarRating from 'react-native-star-rating';
import Images from '../../../../constants/image'
import { Icon, Spinner } from 'native-base'
import styles from './styles/post-search-style'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../../../state/GlobalState';
import ImageProgress from 'react-native-image-progress';
import Colors from '../../../../constants/color';
import getDistance from 'geolib/es/getDistance';
import ConnectedWidget from '../../../../components/ConnectedWidget';
var convert = require('convert-units')

const PostSearchCard = ({ onPress, refreshCb, hideHeartIcon = false, ...props }) => {
  const [profile] = useGlobalState('profile')

  const [saveCoachReq, saveCoach] = useAxios({
    url: `/Users/SaveCoach`,
    method: 'POST'
  }, { manual: true })

  let milesAway = -1

  if (!profile || !profile.Lat || !profile.Lng || !props.Lat || !props.Lng) {
    milesAway = -1
  } else {
    const meters = getDistance(
      { latitude: profile.Lat, longitude: profile.Lng, },
      { latitude: parseFloat(props.Lat), longitude: parseFloat(props.Lng) }
    )

    milesAway = convert(meters).from('m').to("mi").toFixed(2)
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.ps_container}>
      <View style={{ marginTop: 15, marginLeft: 10 }}>
        <ImageProgress
          source={props.ProfileImage ? { uri: props.ProfileImage } : Images.PlayerPlaceholder}
          style={styles.ps_image}
          imageStyle={styles.ps_image}
        />
        <View style={styles.ps_star_view}>
          <Text style={styles.ps_star_point}>{props.AverageBookingRating}</Text>
          {Number.isInteger(Number.parseInt(props.AverageBookingRating)) && (
            <StarRating
              disabled={false}
              maxStars={1}
              rating={props.AverageBookingRating}
              fullStarColor={'#38A663'}
              starSize={16}
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          )}
        </View>

      </View>
      <View style={{ marginTop: 15, marginLeft: 10, width: '80%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column', width: '70%' }}>
            <Text style={{ marginTop: 10, color: Colors.s_blue, fontSize: 18, fontWeight: '500' }}>{props.FullName}</Text>
            <View style={{ width: '80%' }}>
              <Text>{props.AboutUs}</Text>
            </View>
            {props.Role == "Player" && (
              <View style={{ flexDirection: 'row', width: '80%' }}>
                <Icon style={{ fontSize: 22 }} type="EvilIcons" name="location" />
                <Text>{props.Address}</Text>
              </View>
            )}
          </View>
          <View style={{ alignItems: 'flex-end', width: '28%', marginRight: '10%' }}>
            {props.Role == "Coach" && hideHeartIcon == false && <TouchableOpacity style={{ width: '60%' }} onPress={() => {
              saveCoach({
                data: {
                  "playerId": profile?.Id,
                  "coachId": props.Id,
                }
              })
                .then(r => refreshCb())
            }}>
              <View style={styles.ps_heart_view}>
                {saveCoachReq.loading && <Spinner size={26} />}
                {!saveCoachReq.loading && props.Status != 'Saved' && <Icon type="Feather" name="heart" style={{ fontSize: 19, color: "#0F2F80" }} />}
                {!saveCoachReq.loading && props.Status == 'Saved' && <Icon type="Entypo" name="heart" style={{ fontSize: 19, color: "#0F2F80" }} />}
              </View>
            </TouchableOpacity>}
            <View style={{ marginRight: '8%' }}>
              <ConnectedWidget userToConnectTo={props.Id} />
            </View>
            {milesAway != -1 && (
              <View>
                <Text style={{ color: "#38A663", textAlign: 'right', marginRight: '15%' }}>{milesAway}</Text>
                <Text style={{ color: "#38A663", textAlign: 'right', marginRight: '15%' }}>Miles</Text>
              </View>
            )}
          </View>
        </View>
        {props.Role == "Coach" && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', marginTop: 10 }}>
            <View style={styles.ps_hourly_symbol}>
              <Text style={styles.ps_pound_symbol}>{'\u00A3'}</Text>
              <Text style={{ marginLeft: 5 }}>{props.Rate}/hr</Text>
            </View>
          </View>
        )}
        {props.Role == "Coach" && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ps_dbs_check}>Valid ID</Text>
              {props?.VerificationDocument?.Verified && (<Icon type="Feather" name="check" style={{ fontSize: 20, color: '#38A663' }} />)}
              {!props?.VerificationDocument?.Verified && (<Icon type="MaterialIcons" name="close" style={{ fontSize: 20, color: 'red' }} />)}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ps_dbs_check}>DBS Checked</Text>
              {props?.DBSCeritificate?.Verified && (<Icon type="Feather" name="check" style={{ fontSize: 20, color: '#38A663' }} />)}
              {!props?.DBSCeritificate?.Verified && (<Icon type="MaterialIcons" name="close" style={{ fontSize: 20, color: 'red' }} />)}
            </View>
          </View>
        )}
        {props.Qualifications && props.Qualifications.length != 0 && (
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 10, justifyContent: 'space-between', marginBottom: 10 }}>
            {props.Qualifications.map(q => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <Icon type="Feather" name="check-square" style={{ fontSize: 16, color: '#38A663' }} />
                  <Text>{q.Qualification}</Text>
                </View>
              );
            })}
          </View>
        )}
        {props.Teams && props.Teams.length != 0 && (
          <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 10, justifyContent: 'space-between', marginBottom: 10 }}>
            {props.Teams.map(q => {
              return (
                <View style={{ flexDirection: 'row' }}>
                  <Icon type="Feather" name="check-square" style={{ fontSize: 16, color: '#38A663' }} />
                  <Text>{q.TeamName}</Text>
                </View>
              );
            })}
          </View>
        )}

      </View>

    </TouchableOpacity>
  );
}

export default PostSearchCard
