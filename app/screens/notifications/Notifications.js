import React, { Component, useRef, useEffect } from 'react'
import Header from '../../components/header/Header';
import { StyleSheet, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native'
import { View } from 'native-base';
import useAxios from 'axios-hooks'
import styles from '../message/styles';
import { Icon } from 'native-base';
import Colors from '../../constants/color';

const Notifications = (props) => {

    const [getUserReq, getUserData] = useAxios({
        url: '/Users/GetNotifications',
    }, { manual: true })
    const [readNotificationReq, readNotification] = useAxios({
        url: '/Users/ReadNotification/',
    }, { manual: true })
    const readMessage = (id) => {
        readNotification({ url: `/Users/ReadNotification/${id}` })
        .then(() => getUserData())
    }
    function Item({ item, key }) {
        return (
            <View style={styles.flatListNotification} key={key}>
                <TouchableOpacity disable={readNotificationReq.loading} style={[styles.container_text, { opacity: readNotificationReq.loading ? 0.5 : 1 }]} onPress={() => readMessage(item.Id)}>
                    <View style={styles.innerRow}>
                        <Text style={styles.description}>
                            {item.Text}
                        </Text>
                        <Text style={styles.description2}>
                            {new Date(item.CreatedDate).toLocaleDateString()}
                        </Text>
                    </View>
                </TouchableOpacity>
                {!item.IsRead ?
                    <Icon type="FontAwesome" name="circle" style={{ color: "blue", fontSize: 12 }} />
                    :
                    <View />
                }
            </View>
        );
    }
    function ItemSeparator() {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: 'black' }}
            />
        );
    }
    useEffect(() => {
        getUserData()
        const focusListener = props.navigation.addListener('didFocus', () => {
            getUserData()
        });

        return () => focusListener.remove()
    }, []);
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1 }}>

            <Header title={"Notifications"} hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <View style={[styles.signup_container]}>
                <View style={[styles.fullFlatListContainer ]}>
                    {!getUserReq.loading && getUserReq?.data && getUserReq?.data.Notifications.length > 0 &&
                    <>
                        <FlatList
                            contentContainerStyle={{ flexGrow: 1 }}
                            ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: '10%'}}>No notifications</Text>}
                            data={getUserReq.data?.Notifications || []}
                            renderItem={({ item, key }) => <Item item={item} key={key} />}
                            temSeparatorComponent={() => <ItemSeparator />}
                            keyExtractor={item => item.id}
                        />
                        <View style={{ marginTop: 'auto', flexDirection: 'row', alignItems: 'flex-end', justifyContent:'center'}}>
                            <View>
                                <View style={{ backgroundColor: Colors.s_blue, zIndex: -2, position: 'absolute', top: '-90%', left: '20%',height: 20, width: 20, borderRadius: 20/2 }}>
                                    <Text style={{ color: 'white', textAlign: 'center' }}>{getUserReq.data?.Notifications.filter(i => i.IsRead == false).length}</Text>
                                </View>
                                <Icon type="Feather" name="bell" style={{ fontSize: 18  }} />
                            </View>
                            <Text style={{ textAlign: 'center'}}>Unread notifications</Text>
                        </View>
                    </>
                    }
                </View>
                {!getUserReq.loading && getUserReq?.data?.Notifications && getUserReq?.data?.Notifications.length === 0 && <Text style={styles.notFoundText}>No Notifications</Text>}
                {getUserReq.loading && <Text style={styles.notFoundText}>Loading...</Text>}
            </View>
        </ScrollView>
    );
}

export default Notifications;
