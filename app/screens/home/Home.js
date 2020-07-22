import React, { useState, useEffect } from 'react';
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
import { Icon } from 'native-base';
import PostCard from './components/PostCard';
import useAxios from 'axios-hooks'
import styles from './styles.js';
import Images from '../../constants/image';
import ImageView from 'react-native-image-view';
import moment from 'moment'
import SyncPosts from '../../utils/PostSyncher'
import AsyncStorage from '@react-native-community/async-storage';
import { useGlobalState } from '../../state/GlobalState'
import screen from '../../utils/screen'
import Video from 'react-native-video';


const Home = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataToShow, setDataToShow] = useState([]);
  const [token] = useGlobalState('token')

  const [{ data, loading, error }, refetch] = useAxios({
    url: '/Users/GetPostsByUser',
  })

  useEffect(() => {
    const focusListener = props.navigation.addListener('didFocus', refetch);
    return () => focusListener?.remove();
  }, [])

  useEffect(() => {
    if (!data) return
    if (!data.length) return

    const dateFormat = 'DD MMM YYYY HH:mm'
    const posts = data.map(p => {
      console.log(p)
      return AsyncStorage.getItem(`post-${p.Id}-file`)
        .then(fileString => {
          const j = {
            id: p.Id,
            name: p.Header,
            time: moment(p.CreatedDate).format(dateFormat),
            description: p.Body,
            comments: p.Comments || [],
            likes: p.Likes || [],
          }

          if (p.MediaURL) {
            j.imageUri = p.MediaURL
          } else if (fileString) {
            const jsonFile = JSON.parse(fileString)
            j.imageUri = jsonFile.file.uri
            j.fileType = jsonFile.file.type
            SyncPosts(jsonFile.file, p.Id)
          }
          return j
        })
    })
    Promise.all(posts)
      .then(p => {
        setDataToShow(p.sort((left, right) => moment.utc(right.time, dateFormat).diff(moment.utc(left.time, dateFormat))))
      })
  }, [loading])



  let body = (
    <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>Loading...</Text>
  );

  if (!loading && data && data.length == 0) {
    body = (
      <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>No post created</Text>
    );
  }

  if (!loading && data && data.length != 0) {
    body = (
      <FlatList
        horizontal={false}
        style={{ width: '100%', height: '100%' }}
        data={dataToShow}
        keyExtractor={item => item.Id}
        renderItem={({ item }) => (
          <PostCard
            onPressOfComment={() => props.navigation.navigate(screen.CreateComment, { post: item })}
            item={item}
            onClickItem={(item) => {
              setVisibleModal(item)
            }} />
        )
        }
      />
    );
  }

  console.log(visibleModal)

  return (
    <View style={styles.home_container}>
      {/* <View style={{
          width: "100%",
          height: STATUS_BAR_HEIGHT,
          backgroundColor: "#0F2F80"
      }}>
          <StatusBar
              barStyle="light-content"
          />
      </View> */}
      <Header toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
      {body}
      <Modal
        visible={visibleModal != false}
        transparent={true}
      >
        <View style={{ flex: 1 }}>
          <View style={{ position: 'absolute', top: 20, right: 20, zIndex: 100 }}>
            <TouchableOpacity
              onPress={() => setVisibleModal(false)}
            >
              <Icon type="MaterialIcons" name="close" style={{ color: 'white' }} />
            </TouchableOpacity>

          </View>
          {visibleModal && (!visibleModal.fileType || !visibleModal.fileType.includes('video')) && (
            <ImageView
              images={[
                {
                  source: { uri: visibleModal.imageUri },
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

          {visibleModal && (!visibleModal.fileType || visibleModal.fileType.includes('video')) && (
            <Video
              controls={true}
              source={{ uri: visibleModal.imageUri }}   // Can be a URL or a local file.
              onError={() => {
                Alert.alert('Error', 'We could not load the video')
              }}               // Callback when video cannot be loaded
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }} />
          )}

        </View>
      </Modal>
    </View>
  )

}

export default Home;
