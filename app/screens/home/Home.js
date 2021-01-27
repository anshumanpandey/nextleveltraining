import React, {useState, useEffect, version} from 'react';
import Header from '../../components/header/Header';
import {
  View,
  StatusBar,
  FlatList,
  Modal,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {Icon, Spinner} from 'native-base';
import PostCard from './components/PostCard';
import useAxios from 'axios-hooks';
import styles from './styles.js';
import Images from '../../constants/image';
import ImageView from 'react-native-image-view';
import moment from 'moment';
import SyncPosts from '../../utils/PostSyncher';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useGlobalState,
  dispatchGlobalState,
  GLOBAL_STATE_ACTIONS,
} from '../../state/GlobalState';
import screen from '../../utils/screen';
import Video from 'react-native-video';
import Colors from '../../constants/color';
import PushNotification from 'react-native-push-notification';

const ITEM_HEIGHT = (Dimensions.get('screen').height / 100) * 10;

const Home = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataToShow, setDataToShow] = useState([]);
  const [token] = useGlobalState('token');
  const [profile] = useGlobalState('profile');

  const [{data, loading, error}, refetch] = useAxios(
    {
      url: '/Users/GetAllPosts',
    },
    {manual: true},
  );

  const [getUserReq, getUserData] = useAxios(
    {
      url: '/Users/GetUser',
    },
    {manual: true},
  );

  useEffect(() => {
    refetch();
    const focusListener = props.navigation.addListener('didFocus', () => {
      refetch();
      PushNotification.popInitialNotification((notification) => {
        console.log('Initial Notification', notification);
      });
    });
    return () => focusListener?.remove();
  }, []);

  useEffect(() => {
    if (!data) return;
    if (!data.length) return;

    const dateFormat = 'DD MMM HH:mm';
    const posts = data.map((p) => {
      return AsyncStorage.getItem(`post-${p.Id}-file`).then((fileString) => {
        const j = {
          id: p.Id,
          name: p.Header,
          time: moment(p.CreatedDate).format(dateFormat),
          description: p.Body,
          createdBy: p.CreatedBy,
          profileImage: p.ProfileImage,
          comments: p.Comments || [],
          likes: p.Likes || [],
          poster: p.Poster,
          width: p.Width,
          height: p.Height,
        };

        if (p.MediaURL) {
          j.fileType = 'image';
          if (p.MediaURL.includes('MOV') || p.MediaURL.includes('mp4')) {
            j.fileType = 'video';
          }
          j.imageUri = p.MediaURL;
        } else if (fileString && JSON.parse(fileString).file) {
          console.log('no media url', fileString);
          const jsonFile = JSON.parse(fileString);
          j.imageUri = jsonFile.file.path;
          j.fileType = jsonFile.file.type;
          j.width = jsonFile.file.width;
          j.height = jsonFile.file.height;
          SyncPosts(jsonFile.file, p.Id)
            .then(() => AsyncStorage.removeItem(`post-${p.Id}-file`))
            .then(() => getUserData())
            .then((r) => {
              dispatchGlobalState({
                type: GLOBAL_STATE_ACTIONS.PROFILE,
                state: r.data,
              });
              dispatchGlobalState({
                type: GLOBAL_STATE_ACTIONS.TOGGLE,
                state: null,
              });
            })
            .catch((err) => console.log(err));
        }
        return j;
      });
    });
    Promise.all(posts).then((p) => {
      setDataToShow(
        p.sort((left, right) =>
          moment
            .utc(right.time, dateFormat)
            .diff(moment.utc(left.time, dateFormat)),
        ),
      );
    });
  }, [loading]);

  let body = (
    <Text style={{fontSize: 28, textAlign: 'center', marginTop: '10%'}}>
      Loading...
    </Text>
  );

  if (!loading && data && data.length == 0) {
    body = (
      <Text style={{fontSize: 28, textAlign: 'center', marginTop: '10%'}}>
        No Posts Yet
      </Text>
    );
  }

  const renderItem = ({item}) => {
    return (
      <PostCard
        refreshCb={refetch}
        onPressOfComment={() =>
          props.navigation.navigate(screen.CreateComment, {post: item})
        }
        item={item}
        onClickItem={(item) => {
          setVisibleModal(item);
        }}
      />
    );
  };

  if (!loading && data && dataToShow.length != 0) {
    body = (
      <FlatList
        maxToRenderPerBatch={4}
        initialNumToRender={4}
        horizontal={false}
        data={dataToShow}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        removeClippedSubviews={true}
      />
    );
  }

  const NotificationCountComponent = ({currentNotifications}) => {
    console.log(currentNotifications.length);
    return (
      <Text style={{color: 'white', textAlign: 'center', fontSize: 12}}>
        {currentNotifications.filter((i) => i.IsRead == false).length}
      </Text>
    );
  };

  const BadgeNotification = () => {
    const [notifications] = useGlobalState('notifications');

    return (
      <View style={styles.tabContain}>
        <View
          style={{
            marginTop: 'auto',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}>
          <View>
            <View
              style={{
                backgroundColor: Colors.s_blue,
                zIndex: 2,
                position: 'absolute',
                top: '-50%',
                left: '50%',
                height: 18,
                width: 18,
                borderRadius: 18 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NotificationCountComponent
                key={notifications.filter((n) => n.IsRead).length}
                currentNotifications={notifications}
              />
            </View>
            <Icon
              type="Feather"
              name="bell"
              style={[styles.icons, {color: 'black'}]}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.home_container]}>
      {/* <View style={{
          width: "100%",
          height: STATUS_BAR_HEIGHT,
          backgroundColor: "#0F2F80"
      }}>
          <StatusBar
              barStyle="light-content"
          />
      </View> */}
      <Header
        navigate={props.navigation.navigate}
        customButton={() => {
          return (
            <>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('Notification');
                }}
                style={{marginHorizontal: 10}}>
                <BadgeNotification />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('LastMessage');
                }}
                style={{marginHorizontal: 10}}>
                <Icon
                  type="Feather"
                  name="message-square"
                  style={[styles.icons, {color: 'black'}]}
                />
              </TouchableOpacity>
            </>
          );
        }}
      />
      {body}
    </View>
  );
};

const MediaPreview = ({visibleModal, setVisibleModal}) => {
  const [videoIsReady, setVideoIsReady] = useState(false);

  useEffect(() => {
    if (visibleModal == false) setVideoIsReady(false);
  }, [visibleModal]);

  return (
    <Modal visible={visibleModal != false} transparent={true}>
      <>
        <View style={[{position: 'absolute', top: 20, right: 20, zIndex: 100}]}>
          <TouchableOpacity onPress={() => setVisibleModal(false)}>
            <Icon type="MaterialIcons" name="close" style={{color: 'white'}} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            {flexGrow: 1} &&
              videoIsReady == false && {backgroundColor: 'black', opacity: 0.8},
          ]}>
          {visibleModal &&
            (!visibleModal.fileType ||
              !visibleModal.fileType.includes('video')) && (
              <ImageView
                images={[
                  {
                    source: {uri: visibleModal.imageUri},
                    title: 'Paris',
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                  },
                ]}
                isPinchZoomEnabled
                imageIndex={0}
                isVisible={visibleModal != false}
                onClose={() => setVisibleModal(false)}
              />
            )}

          {visibleModal &&
            (!visibleModal.fileType ||
              visibleModal.fileType.includes('video')) && (
              <>
                <Video
                  controls={true}
                  source={{uri: visibleModal.imageUri}} // Can be a URL or a local file.
                  onError={() => {
                    Alert.alert('Error', 'We could not load the video');
                  }} // Callback when video cannot be loaded
                  onLoadStart={(d) => {
                    console.log('onLoadStart');
                  }}
                  onLoad={(d) => {
                    console.log('onLoad');
                    setVideoIsReady(true);
                  }}
                  style={{
                    width: Dimensions.get('screen').width,
                    height: Dimensions.get('screen').height,
                    opacity: videoIsReady ? 1 : 0,
                  }}
                />
                {!videoIsReady && (
                  <View
                    style={{
                      backgroundColor: 'black',
                      opacity: 0.8,
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: Dimensions.get('screen').width,
                      height: Dimensions.get('screen').height,
                    }}>
                    <Spinner color={Colors.s_yellow} size={100} />
                    <Text style={{textAlign: 'center', opacity: 0.8}}>
                      Loading video...
                    </Text>
                  </View>
                )}
              </>
            )}
        </View>
      </>
    </Modal>
  );
};

export default Home;
