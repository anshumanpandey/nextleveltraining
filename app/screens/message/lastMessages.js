import React, { Component, useEffect, useState } from 'react'
import { View, Text, Image, FlatList, TouchableHighlight, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import styles from './styles.js';
import Header from '../../components/header/Header'
import useAxios from 'axios-hooks'
import placeholder from '../../assets/images/player-placeholder.jpeg'

import { useGlobalState } from "../../state/GlobalState"

const LastMessage = (props) => {

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetLastMessages',
    }, { manual: true })
    const [profile] = useGlobalState('profile')
    const [profileId, setProfileId] = useState('')

    console.log(getUserReq.data)

    function Item({ item, key, id }) {
       // alert(id)
        return (
            <View style={styles.flatList} key={key}>
                <Image source={!item.ReceiverProfilePic && !item.SenderProfilePic || item.SenderID === profileId && item.ReceiverProfilePic===''  || item.RecieverId === profileId && item.SenderProfilePic==='' ?  placeholder : { uri: item.SenderID === profileId ? item.ReceiverProfilePic : item.SenderProfilePic }} style={styles.userImage} />
                <TouchableOpacity style={styles.container_text} onPress={() => props.navigation.navigate('Chat', {
                    RecieverId: item.RecieverID === profileId ? item.SenderID : item.RecieverID,
                    SenderId: profileId,
                    friendName: item.SenderID === profileId ? item.ReceiverName : item.SenderName
                })}>
                    <View style={styles.innerRow}>
                        <Text style={styles.screenTitle}>
                            {item.SenderID === profileId ? item.ReceiverName : item.SenderName}
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
        setProfileId(profile?.Id)
        const focusListener = props.navigation.addListener('didFocus', () => {
            getUserData()
        });

        return () => focusListener.remove()
       
        /*const intervalId = setInterval(() => {
        getUserData()
        setProfileId(profile.Id)
       // alert(profileId)
        console.log(getUserReq,'sss')
           }, 5000);

           return () => clearInterval(intervalId);*/
    }, [])
    return (
        <View style={styles.signup_container}>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} />
            <View style={styles.fullFlatListContainer}>
                {!getUserReq.loading && getUserReq.data && getUserReq.data.length > 0 &&
                    <FlatList
                        data={getUserReq.data}
                        renderItem={({ item, key }) => <Item item={item} key={key} id={profile?.Id} />}
                        temSeparatorComponent={() => <ItemSeparator />}
                        keyExtractor={item => item.id}
                    />
                }
                {!getUserReq.loading && getUserReq.data && getUserReq.data.length == 0 && <Text style={styles.notFoundText}>No messages found</Text>}
                {getUserReq.loading && <Text style={styles.notFoundText}>Loading...</Text>}
            </View>

        </View>
    )
}

export default LastMessage;