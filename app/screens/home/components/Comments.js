import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../constants/image';
import {Icon} from 'native-base';
import styles from './styles';
import Dimension from '../../../constants/dimensions';
import moment from 'moment'

const Comments = ({item, onClickItem, onPressOfComment}) => {
  const onClickingItem = (item) => {
    onClickItem(item);
  };
  return (
    <View style={[styles.post_container]}>
      <View style={styles.comment_card_container}>
        <Image source={{ uri: item.ProfileImage }} style={styles.post_image_size} />
        <View style={styles.post_content_view}>
          <View style={{width: Dimension.pro100}}>
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
};
export default Comments;
