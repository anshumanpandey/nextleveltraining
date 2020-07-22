import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native'
import StarRating from 'react-native-star-rating';
import Images from '../../../../constants/image'
import { Icon, Spinner } from 'native-base'
import styles from './styles/post-search-style'
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../../../state/GlobalState';

const PostSearchCard = ({ onPress, refreshCb, ...props }) => {
  const [profile] = useGlobalState('profile')

  const [saveCoachReq, saveCoach] = useAxios({
    url: `/Users/SaveCoach`,
    method: 'POST'
  }, { manual: true })

  return (
    <TouchableOpacity onPress={onPress} style={styles.ps_container}>
      <View style={{ marginTop: 15, marginLeft: 10 }}>
        <Image source={Images.MessiPlayer} style={styles.ps_image} />
        <View style={styles.ps_star_view}>
          <Text style={styles.ps_star_point}>{props.AverageRating}</Text>
          {Number.isInteger(props.AverageRating) && (
            <StarRating
              disabled={false}
              maxStars={1}
              rating={props.AverageRating}
              fullStarColor={'#38A663'}
              starSize={16}
            // selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
          )}
        </View>

      </View>
      <View style={{ marginTop: 15, marginLeft: 10, width: '80%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ marginTop: 10, color: '#0F2F80', fontSize: 16, fontWeight: '500' }}>{props.FullName}</Text>
          <TouchableOpacity onPress={() => {
            saveCoach({
              data: {
                "playerId": profile.Id,
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
          </TouchableOpacity>
        </View>

        <View style={{ width: '80%' }}>
          <Text>{props.AboutUs}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', marginTop: 10 }}>
          <View style={styles.ps_hourly_symbol}>
            <Text style={styles.ps_pound_symbol}>{'\u00A3'}</Text>
            <Text style={{ marginLeft: 5 }}>{props.Rate}/hr</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '85%', marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.ps_dbs_check}>Valid ID</Text>
            {props.VerificationDocument.Verified && (<Icon type="Feather" name="check" style={{ fontSize: 20, color: '#38A663' }} />)}
            {!props.VerificationDocument.Verified && (<Icon type="MaterialIcons" name="close" style={{ fontSize: 20, color: 'red' }} />)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.ps_dbs_check}>DBS Checked</Text>
            {props.DBSCeritificate.Verified && (<Icon type="Feather" name="check" style={{ fontSize: 20, color: '#38A663' }} />)}
            {!props.DBSCeritificate.Verified && (<Icon type="MaterialIcons" name="close" style={{ fontSize: 20, color: 'red' }} />)}
          </View>
        </View>
        {props.Qualifications.length != 0 && (
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

      </View>

    </TouchableOpacity>
  );
}

export default PostSearchCard
