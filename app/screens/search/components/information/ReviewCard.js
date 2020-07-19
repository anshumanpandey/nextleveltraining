import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from '../../../home/components/styles';
import Images from '../../../../constants/image';
import Dimension from '../../../../constants/dimensions';
import StarRating from 'react-native-star-rating';

const ReviewCard = ({item}) => {
  return (
    <View style={styles.post_container}>
      <View style={[styles.post_card_container, {flexDirection: 'row'}]}>
        <Image source={Images.MessiPlayer} style={styles.post_image_size} />
        <View style={styles.post_content_view}>
          <View style={{width: Dimension.pro100}}>
            <View style={styles.post_title}>
              <Text
                style={[
                  styles.post_title_name,
                  {color: 'black', fontSize: 14, fontWeight: '500'},
                ]}>
                {item.name}
              </Text>
              <Text style={[styles.post_title_time, {fontSize: 12}]}>
                {item.time}
              </Text>
            </View>
            <View style={[styles.ps_star_view, {marginLeft: 0, marginTop: 5}]}>
              <Text style={styles.ps_star_point}>4.0</Text>
              <StarRating
                disabled={false}
                maxStars={1}
                rating={4.0}
                fullStarColor={'#38A663'}
                starSize={10}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.post_news_contents}>
        <Text style={[styles.post_description, {marginTop: 0, fontSize: 12}]}>
          {item.description + item.description}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
