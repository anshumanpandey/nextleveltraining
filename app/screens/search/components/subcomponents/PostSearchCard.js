import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native'
import StarRating from 'react-native-star-rating';
import { Icon, Spinner } from 'native-base'
import useAxios from 'axios-hooks'
import ImageProgress from 'react-native-image-progress';
import getDistance from 'geolib/es/getDistance';
import Images from '../../../../constants/image'
import styles from './styles/post-search-style'
import { useGlobalState } from '../../../../state/GlobalState';
import Colors from '../../../../constants/color';
import ConnectedWidget from '../../../../components/ConnectedWidget';
import NLFormatedShowMore from '../../../../components/NLFormatedShowMore';

const convert = require('convert-units')

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
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginTop: 15 }}>
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
                fullStarColor="#38A663"
                starSize={16}
              // selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            )}
          </View>

        </View>
        <View style={{ marginLeft: 10, width: '85%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column', width: '70%' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: Colors.s_blue, fontSize: 18, fontWeight: '500' }}>
                  {props.Role} {(props.FullName || "").split(" ")[0]}
                </Text>
                <View style={{ marginLeft: '2%', justifyContent: 'center' }}>
                  {props.Role == "Coach" && (
                    <View style={{ backgroundColor: Colors.s_blue, position: 'absolute', minHeight: 14, minWidth: 14, borderRadius: 14 / 2, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: 'white', fontSize: 12 }}>{props?.Level}</Text>
                    </View>
                  )}
                </View>
              </View>
              {milesAway != -1 && (
                <View style={{ flexDirection: 'row' }}>
                  <Icon style={{ fontSize: 16 }} type="Entypo" name="location-pin" />
                  <Text style={{ fontSize: 12 }}>{parseInt(milesAway)} Miles from you</Text>
                </View>
              )}

              <View style={{ width: '115%' }}>
                <NLFormatedShowMore text={props.AboutUs} />
              </View>
              {props.Role == "Player" && props.hideAddress != true && (
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
            </View>
          </View>
          {props.Teams && props.Teams.length != 0 && (
            <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 10, justifyContent: 'space-between', marginBottom: 10 }}>
              {props.Teams.map(q => (
                <View style={{ flexDirection: 'row' }}>
                  <Icon type="Feather" name="check-square" style={{ fontSize: 16, color: '#38A663' }} />
                  <Text>{q.TeamName}</Text>
                </View>
              ))}
            </View>
          )}

        </View>
      </View>
      <View style={{ flexDirection: 'row' }}>
        {props.Role == "Coach" && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <View style={styles.ps_hourly_symbol}>
              <Text style={styles.ps_pound_symbol}>{'\u00A3'}</Text>
              <Text style={{ marginLeft: 5 }}>{props.Rate}/hr</Text>
            </View>
          </View>
        )}
        {/* {props.Role == "Coach" && (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginLeft: '5%', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ps_dbs_check}>Valid ID</Text>
              {props?.VerificationDocument?.Verified == true && (<Icon type="Feather" name="check" style={{ fontSize: 20, color: '#38A663' }} />)}
              {!props?.VerificationDocument?.Verified && (<Icon type="MaterialIcons" name="close" style={{ fontSize: 20, color: 'red' }} />)}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={styles.ps_dbs_check}>DBS Checked</Text>
              {props?.DBSCeritificate?.Verified == true && (<Icon type="Feather" name="check" style={{ fontSize: 20, color: '#38A663' }} />)}
              {!props?.DBSCeritificate?.Verified && (<Icon type="MaterialIcons" name="close" style={{ fontSize: 20, color: 'red' }} />)}
            </View>
          </View>
        )} */}
      </View>
      {props.Qualifications && props.Qualifications.length != 0 && (
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', width: '80%', marginTop: 10, justifyContent: 'space-between', marginBottom: 10 }}>
          {props.Qualifications.map(q => (
            <View style={{ flexDirection: 'row' }}>
              <Icon type="Feather" name="check-square" style={{ fontSize: 16, color: '#38A663' }} />
              <Text>{q.Qualification}</Text>
            </View>
          ))}
        </View>
      )}

    </TouchableOpacity>
  );
}

export default PostSearchCard
