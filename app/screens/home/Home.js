import React, { Component, useState, useEffect } from 'react'
import Header from '../../components/header/Header'
import { View, StatusBar, FlatList, Modal, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import useAxios from 'axios-hooks'
import PostCard from './components/PostCard'
import { Data } from './components/data'
import styles from './styles.js'
import AsyncStorage from '@react-native-community/async-storage';
import ImageView from 'react-native-image-view';
import moment from 'moment'
import SyncPosts from '../../utils/PostSyncher'
import { useGlobalState } from '../../state/GlobalState'

const images = [
  {
    source: {
      uri: 'https://cdn.pixabay.com/photo/2017/08/17/10/47/paris-2650808_960_720.jpg',
    },
    title: 'Paris',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
];

const Home = (props) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [dataToShow, setDataToShow] = useState([]);
  const [token] = useGlobalState('token')

  const [{ data, loading, error }, login] = useAxios({
    url: '/Users/GetPostsByUser',
  })

  useEffect(() => {
    if (!data) return
    
    data.map(p => {
      SyncPosts(p, token)
      return AsyncStorage.getItem(`post-${p.Id}-file`)
        .then(fileString => {
          const j = {
            id: p.Id,
            name: p.Header,
            time: moment(p.CreatedDate).format('DD MMM YYYY HH:mm'),
            description: p.Body,
          }

          if (fileString) {
            j.imageUri = JSON.parse(fileString).file.uri
          }

          dataToShow.push(j)
          setDataToShow(dataToShow)
        })
    })
  }, [data.length])

  let body = (
    <Text style={{ fontSize: 28, textAlign: 'center', marginTop: '10%' }}>Loading...</Text>
  );

  if (!loading && data.length == 0) {
    body = (
      <Text>No post created</Text>
    );
  }

  if (!loading && data.length != 0) {
    body = (
      <FlatList
        horizontal={false}
        style={{ width: '100%', height: '100%' }}
        data={dataToShow}
        keyExtractor={item => item.Id}
        renderItem={({ item }) => (
          <PostCard item={item} onClickItem={(item) => {
            setVisibleModal(item)
          }} />
        )
        }
      />
    );
  }

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
      <Header toggleDrawer={props.toggleDrawer} navigate={props.navigation.navigate} />
      {body}
      <Modal
        visible={visibleModal != false}
        transparent={true}
      >
        <View style={{ flex: 1 }}>
          {/* <View style={{position:'absolute',top:20,right:20,zIndex:100}}>
          <TouchableOpacity
           onPress={()=>this.setState({visibleModal:false})}
          >
             <Icon type="MaterialIcons" name="close" style={{color:'white'}}/>
          </TouchableOpacity>
        
        </View> */}
          <ImageView
            images={[
              {
                source: {
                  uri: visibleModal.imageUri,
                },
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
        </View>
      </Modal>
    </View>
  )

}

export default Home
