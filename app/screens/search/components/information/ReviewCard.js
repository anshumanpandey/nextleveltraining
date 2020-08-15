import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../../../home/components/styles';
import Images from '../../../../constants/image';
import Dimension from '../../../../constants/dimensions';
import StarRating from 'react-native-star-rating';
import { parseISO, format } from 'date-fns'

const ReviewCard = ({ item }) => {
  console.log(item)
  return (
    <View style={styles.post_container}>
      <View style={[styles.post_card_container, { flexDirection: 'row' }]}>
        <Image source={{ uri: item.PlayerProfileImage }} style={styles.post_image_size} />
        <View style={styles.post_content_view}>
          <View style={{ width: Dimension.pro100 }}>
            <View style={styles.post_title}>
              <View style={[styles.ps_star_view, { marginLeft: 0, marginTop: 5 }]}>
                <Text style={styles.ps_star_point}>{item.Rating}</Text>
                <StarRating
                  disabled={false}
                  maxStars={1}
                  rating={item.Rating}
                  fullStarColor={'#38A663'}
                  starSize={10}
                />
              </View>
              <Text
                style={[styles.post_title_name, { color: 'black', fontSize: 14, fontWeight: '500', marginLeft: '3%' }]}>
                {item.PlayerName}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.post_news_contents, { flexDirection: 'row'}]}>
        <Text style={[styles.post_description, { marginTop: 0, fontSize: 12, width: 'auto' }]}>
          {item.Feedback}
        </Text>
        <Text style={[styles.post_title_time, { fontSize: 12 }]}>
          {item.CreatedDate.split('T')[0]}{" "}
          {item.CreatedDate.split('T')[1].substring(0, 5)}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;
