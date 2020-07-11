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

const Comments = ({item, onClickItem, onPressOfComment}) => {
  const onClickingItem = (item) => {
    onClickItem(item);
  };
  return (
    <View style={[styles.post_container]}>
      <View style={styles.comment_card_container}>
        <Image source={Images.MessiPlayer} style={styles.post_image_size} />
        <View style={styles.post_content_view}>
          <View style={{width: Dimension.pro100}}>
            <View style={styles.post_title}>
              <Text style={styles.post_title_name}>{item.name}</Text>
              <Text style={styles.comment_title_time}>{item.time}</Text>
            </View>
            <View style={styles.comment_name}>
              <Text
                style={[
                  styles.post_title_name,
                  {fontSize: 14, marginBottom: -4},
                ]}>
                {item.name}
              </Text>
              <Text style={styles.comment_description}>{item.description}</Text>
            </View>
            <View style={styles.like_reply}>
              <Text style={styles.post_like_reply}>Like</Text>
              <Text style={styles.post_like_reply}>reply</Text>
              <Text />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default Comments;
