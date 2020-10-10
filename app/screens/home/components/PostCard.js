import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import Images from '../../../constants/image';
import { Icon, Spinner } from 'native-base';
import styles from './styles';
import Dimension from '../../../constants/dimensions';
import useAxios from 'axios-hooks'
import { useGlobalState } from '../../../state/GlobalState';
import Video from 'react-native-video';
import Colors from '../../../constants/color';
import ParsedText from 'react-native-parsed-text';
import NavigationService from '../../../navigation/NavigationService';

const maxHeight = (Dimensions.get("screen").height / 100) * 45

const PostCard = ({ item, onClickItem, refreshCb, onPressOfComment }) => {
  const [maxNumOfLines, setMaxNumOfLines] = useState(3);
  const [numOfLines, setNumOfLines] = useState(0);
  const [fullSize, setFullSize] = useState(false);
  const [triggerChange, setTriggerChange] = useState(true);
  const [likes, setLikes] = useState([]);
  const [videoIsReady, setVideoIsReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [profile] = useGlobalState('profile')

  const [{ loading }, postLike] = useAxios({
    url: '/Users/SaveLikebyPost',
    method: 'POST',
  }, { manual: true })

  const [hidePostReq, hidePost] = useAxios({
    url: '/Users/HidePost',
    method: 'POST',
  }, { manual: true })

  const onClickingItem = (item) => {
    onClickItem(item);
  };
  useEffect(() => {
    setLikes(item.likes)
  }, [])

  useEffect(() => {
    setTriggerChange(o => !o)
  }, [item.profileImage])

  return (
    <View style={styles.post_container}>
      <View style={styles.post_card_container}>
        <View style={{ flexDirection: 'row', paddingHorizontal: '5%' }}>
          <TouchableOpacity onPress={() => {
            if (item.poster.Role == "Player") {
              NavigationService.navigate("PlayerInfo", { player: item.poster })
            } else {
              NavigationService.navigate("Information", { ...item.poster })
            }
          }}>
            {triggerChange == true && <Image source={item.profileImage ? { uri: item.profileImage } : Images.PlayerPlaceholder} style={styles.post_image_size} />}
            {triggerChange == false && <Image source={item.profileImage ? { uri: item.profileImage } : Images.PlayerPlaceholder} style={styles.post_image_size} />}
          </TouchableOpacity>
          <View style={styles.post_content_view}>
            <View style={{ width: Dimension.pro100, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TouchableOpacity onPress={() => {
                if (item.poster.Role == "Player") {
                  NavigationService.navigate("PlayerInfo", { player: item.poster })
                } else {
                  NavigationService.navigate("Information", { ...item.poster })
                }
              }}>
                <View style={styles.post_title}>
                  <Text style={styles.post_title_name}>{item.createdBy}</Text>
                  <Text style={styles.post_title_time}>{item.time}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity disabled={hidePostReq.loading} onPress={() => {
                Alert.alert("", "Are you sure you want to hide this post?", [
                  {
                    text: 'Yes', onPress: () => {
                      const data = {
                        "userID": profile.Id,
                        "postId": item.id
                      }
                      hidePost({ data })
                        .then(() => {
                          refreshCb()
                        })
                    }
                  },
                  { text: 'No', style: 'cancel' },
                ],
                  { cancelable: true })
              }}>
                <Icon type="Feather" name="more-horizontal" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ParsedText
          numberOfLines={maxNumOfLines}
          onTextLayout={(e) => {
            setNumOfLines(e.nativeEvent.lines.length)
          }}
          style={[styles.post_description, { paddingHorizontal: '5%' }]}
          parse={[
            {
              pattern: /@[A-Za-z0-9._-]*/,
              style: { color: Colors.s_blue, fontWeight: 'bold' }
            },
            {
              pattern: /#(\w+)/,
              style: { color: Colors.s_blue, fontWeight: 'bold' }
            }
          ]}
        >
          {item.description}
        </ParsedText>
        {fullSize == false && numOfLines > maxNumOfLines && (
          <TouchableOpacity onPress={() => setMaxNumOfLines(numOfLines)} style={{ backgroundColor: 'white' }}>
            <Text style={{ textAlign: 'center', fontSize: 16, color: Colors.nl_yellow }}>Show More</Text>
          </TouchableOpacity>
        )}
        <View
          style={styles.post_news_content}>
          {item.fileType && !item.fileType.includes('video') && (
            <View style={{ alignItems: 'center', maxHeight: maxHeight }}>
              <Image
                resizeMode="contain"
                source={{ uri: item.imageUri }}
                style={{ width: item.width, height: item.height, maxHeight: maxHeight }}
                onLoadEnd={() => {
                  console.log("Image loaded 1")
                  setImageLoaded(true)
                }}
              />
            </View>
          )}
          {item.fileType && item.fileType.includes('video') && (
            <TouchableOpacity
              onPress={() => onClickingItem(item)}
            >
              <Video
                source={{ uri: item.imageUri }}
                paused={true}
                onLoadStart={(d) => {
                  console.log('onLoadStart', item.imageUri)
                }}
                onLoad={(d) => {
                  console.log('onLoad')
                  setVideoIsReady(true)
                }}
                currentPosition={1}
                controls={true}
                resizeMode="contain"
                onError={(err) => {
                  console.log(err)
                  setVideoError(true)
                }}               // Callback when video cannot be loaded
                style={{
                  height: Dimension.px440,
                  display: videoIsReady && !videoError ? 'flex' : "none"
                }} />
              {!videoIsReady && videoError == false && (
                <>
                  <Spinner color={Colors.s_blue} size={100} />
                  <Text style={{ textAlign: 'center', opacity: 0.8 }}>Loading video...</Text>
                </>
              )}
              {videoError == true && (
                <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', height: 50, justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', opacity: 0.8, color: 'white' }}>Error Loading Video :(</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

        </View>
        <View style={[styles.post_news_comment, { justifyContent: 'center' }]}>
          <TouchableOpacity
            style={styles.post_news_like}
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
              <View>
                {likes.length != 0 && <Text style={styles.post_like}>{likes.length}</Text>}
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ backgroundColor: 'gray', width: '1%', marginHorizontal: '1%' }} />
          <TouchableOpacity
            style={styles.post_news_like}
            onPress={onPressOfComment}>
            <Icon type="Octicons" name="comment" style={styles.post_comment} />
            <View style={{ marginLeft: '7%', flexDirection: 'row' }}>
              {item.comments.length != 0 && <Text style={styles.post_like}>{item.comments.length}</Text>}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default PostCard;
