import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../constants/image';
import { Icon } from 'native-base';
import styles from './styles';
import Dimension from '../../../constants/dimensions';

const PostCard = ({ item, onClickItem, onPressOfComment }) => {
  const onClickingItem = (item) => {
    onClickItem(item);
  };
  return (
    <View style={styles.post_container}>
      <View style={styles.post_card_container}>
        <View style={{ flexDirection: 'row'}}>
          <Image source={Images.MessiPlayer} style={styles.post_image_size} />
          <View style={styles.post_content_view}>
            <View style={{ width: Dimension.pro100 }}>
              <View style={styles.post_title}>
                <Text style={styles.post_title_name}>{item.name}</Text>
                <Text style={styles.post_title_time}>{item.time}</Text>
              </View>
              <Text style={styles.post_description}>{item.description}</Text>
            </View>
          </View>
        </View>
        <View style={styles.post_news_content}>
          <TouchableOpacity
            onPress={() => onClickingItem(item)}
          >
            <Image
              source={{ uri: item.imageUri }}
              style={styles.post_news_image}
              resizeMode="cover"
            />
          </TouchableOpacity>

        </View>
        <View style={styles.post_news_comment}>
          <View style={styles.post_news_like}>
            <Icon type="FontAwesome" name="thumbs-o-up" style={styles.post_tumb_up} />
            <Text style={styles.post_like}>Like</Text>
          </View>
          <View style={styles.post_news_like}>
            <Icon type="Octicons" name="comment" style={styles.post_comment} />
            <Text>Comment</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.post_news_like}
          onPress={onPressOfComment}>
          <Icon type="Octicons" name="comment" style={styles.post_comment} />
          <Text>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default PostCard;
