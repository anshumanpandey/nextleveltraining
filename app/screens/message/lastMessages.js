import React, { Component,useEffect } from 'react'
import {View,Text,Image,FlatList,TouchableHighlight,TouchableOpacity,ScrollView,TextInput} from 'react-native'
import styles from './styles.js';
import Header from '../../components/header/Header'
import useAxios from 'axios-hooks'
import placeholder from '../../assets/images/player-placeholder.jpeg'


const LastMessage = (props) => {

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetLastMessages',
    }, { manual: true })
   
    function Item({ item,key }) {
        return (
            <View style={styles.flatList} key={key}>
                <Image source={!item.ReceiverProfilePic && !item.SenderProfilePic ? placeholder : { uri: item.ReceiverProfilePic ? item.ReceiverProfilePic : item.SenderProfilePic}} style={styles.userImage} />
                <TouchableOpacity  style={styles.container_text} onPress={() => props.navigation.navigate('Chat',{ReceiverId:item.RecieverID , SenderId : item.SenderID})}>
                    <View style={styles.innerRow}>
                    <Text style={styles.screenTitle}>
                        {item.ReceiverName ? item.ReceiverName : item.SenderName}
                    </Text>
                    <Text style={styles.description}>
                   {new Date(item.SentDate).toLocaleDateString()}
                    </Text>
                    </View>
                    <Text style={styles.description}>
                     {item.Message}
                    </Text>
                </TouchableOpacity>
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
     
      useEffect(() => {
         getUserData()
         console.log(getUserReq,'hhhh')
         }, [])
return (
      <View style={styles.signup_container}>
        <Header toggleDrawer={props.toggleDrawer}/>
        <View style={styles.fullFlatListContainer}>
        { getUserReq.data && getUserReq.data.length > 0 ?
                <FlatList
                    data={getUserReq.data}
                    renderItem={({ item,key }) => <Item item={item} key={key} />}
                    temSeparatorComponent={() => <ItemSeparator/>}
                    keyExtractor={item => item.id}
                />
                :
                <Text style={styles.notFoundText}>No messages found</Text>
        }
            </View>

      </View>
    )
}

export default LastMessage;