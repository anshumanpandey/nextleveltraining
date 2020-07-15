import React, { Component, useState } from 'react'
import Header from '../../components/header/Header'
import { View, StatusBar, FlatList, Modal, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import useAxios from 'axios-hooks'
import PostCard from './components/PostCard'
import { Data } from './components/data'
import styles from './styles.js'
import Images from '../../constants/image'
import ImageView from 'react-native-image-view';

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

  const [{ data, loading, error }, login] = useAxios({
    url: '/Users/GetPostsByUser',
  })

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
      <Header toggleDrawer={props.toggleDrawer} />
      <FlatList
        horizontal={false}
        style={{ width: '100%', height: '100%' }}
        data={Data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PostCard item={item} onClickItem={() => {
            setVisibleModal(true)
          }} />
        )
        }
      />
      <Modal
        visible={visibleModal}
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
            images={images}
            imageIndex={0}
            isVisible={visibleModal}
            onClose={() => setVisibleModal(false)}
          />
        </View>
      </Modal>
    </View>
  )

}

export default Home
