import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import moment from 'moment'
import Images from '../../../constants/image';
import styles from './styles';
import Dimension from '../../../constants/dimensions';

const Comments = ({ item, onClickItem, onPressOfComment }) => (
  <View style={[styles.post_container]}>
    <View style={styles.comment_card_container}>
      <Image source={item.ProfileImage ? { uri: item.ProfileImage } : Images.PlayerPlaceholder} style={styles.post_image_size} />
      <View style={styles.post_content_view}>
        <View style={{ width: Dimension.pro100 }}>
          <View style={styles.post_title}>
            <Text style={styles.post_title_name}>{item.FullName}</Text>
            <Text style={styles.comment_title_time}>{moment(item.Commented).format('ll')}</Text>
          </View>
          <View style={styles.comment_name}>
            <Text style={styles.comment_description}>{item.Text}</Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);
export default Comments;
