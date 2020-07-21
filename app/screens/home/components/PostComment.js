import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-community/async-storage';
import { useGlobalState } from '../../../state/GlobalState';
import useAxios from 'axios-hooks'


const PostComment = ({ item, onClickItem, onPressOfComment }) => {
  const [profilePic, setProfilePic] = useState();
  const [likes, setLikes] = useState([]);
  const [profile] = useGlobalState('profile')


  const [{ loading }, postLike] = useAxios({
    url: '/Users/SaveLikebyPost',
    method: 'POST',
  }, { manual: true })

  useEffect(() => {
    setLikes(item.likes)
    AsyncStorage.getItem('ProfilePic')
      .then((s) => {
        if (!s) return
        setProfilePic(JSON.parse(s))
      })
  }, [])

  return (
    <View style={styles.post_container}>
      <View style={styles.comment_card_container}>
        <Image source={profilePic ? { uri: profilePic.uri } : Images.MessiPlayer} style={styles.comment_image_size} />
        <View style={styles.comment_content_view}>
          <View style={{ width: Dimension.pro100 }}>
            <View style={styles.post_title}>
              <Text style={styles.post_title_name}>{item.name}</Text>
              <Text style={styles.comment_title_time}>{item.time}</Text>
            </View>
            <Text style={styles.comment_description}>{item.description}</Text>
          </View>
          <View style={{ marginTop: 22 }}>
            <Image source={Images.MoreIcon} style={styles.more_icon} />
          </View>
        </View>
      </View>
      <View>
        <Image
          source={{ uri: item.imageUri }}
          style={styles.comment_news_image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.news_comment}>
        <TouchableOpacity
          disabled={loading}
          onPress={() => {
            const data = {
              "postID": item.id,
              "userID": profile.Id
            }
            postLike({ data })
            .then((r) => {
              console.log(r.data)
              setLikes(r.data.Likes)
            })
          }}
        >
          <View style={styles.post_news_like}>
            <Icon
              type="FontAwesome"
              name="thumbs-o-up"
              style={styles.post_tumb_up}
            />
            {likes.length != 0 && <Text style={styles.post_like}>{likes.length}</Text>}
            <Text>{' '}Like</Text>
          </View>
        </TouchableOpacity>
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
export default PostComment;
