import React, { Component,useEffect } from 'react'
import {View,Text,Image,FlatList,TouchableHighlight,TouchableOpacity,ScrollView,TextInput} from 'react-native'
import styles from './styles.js';
import Header from '../../components/header/Header'
import useAxios from 'axios-hooks'
import { axiosInstance } from '../../api/AxiosBootstrap';
const DATA = [
    {
        key: 1, title: 'Albert Einstein',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 2,
        title: 'Isaac newton',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 3, title: 'Albert Einstein',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 4,
        title: 'Isaac newton',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 5, title: 'Albert Einstein',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 6,
        title: 'Isaac newton',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 7, title: 'Albert Einstein',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 8,
        title: 'Isaac newton',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 9, title: 'Albert Einstein',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    },
    {
        key: 10,
        title: 'Isaac newton',
        description: 'Lorem Ipsum is a simple dummy text',
        image_url: 'http://3.bp.blogspot.com/-jd5x3rFRLJc/VngrSWSHcjI/AAAAAAAAGJ4/ORPqZNDpQoY/s1600/Profile%2Bcircle.png'
    }
];
function Item({ item,key }) {
    return (
        <View style={styles.flatList} key={item.key}>
            <Image source={{ uri: item.image_url }} style={styles.userImage} />
            <View style={styles.container_text}>
                <View style={styles.innerRow}>
                <Text style={styles.screenTitle}>
                    {item.title}
                </Text>
                <Text style={styles.description}>
                7/11/13
                </Text>
                </View>
                <Text style={styles.description1}>
                    {item.description}
                </Text>
                <Text style={styles.description}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                </Text>
            </View>
        </View>
    );
}
function ItemSeparator() {
    return (
        <View
            style={{ height: 1, width: '100%', backgroundColor: 'black' }}
        />
    );
}

const LastMessage = (props) => {

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetLastMessage',
    }, { manual: true })
  
      
     
      useEffect(() => {
         getUserData()
         console.log(getUserReq)
         }, [])


  return (
      <View style={styles.signup_container}>
        <Header toggleDrawer={props.toggleDrawer}/>
        <View style={styles.fullFlatListContainer}>
                <FlatList
                    data={DATA}
                    renderItem={({ item,key }) => <Item item={item} key={key} />}
                    temSeparatorComponent={() => <ItemSeparator/>}
                    keyExtractor={item => item.id}
                />
            </View>

      </View>
    )
}

export default LastMessage;