import React, { Component, useRef, useEffect } from 'react'
import Header from '../../components/header/Header';
import { Image, ScrollView, Text, FlatList, TouchableOpacity } from 'react-native'
import { View } from 'native-base';
import useAxios from 'axios-hooks'
import styles from '../message/styles';
import { Icon } from 'native-base';
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState';
import { parseISO, formatDistanceToNow } from 'date-fns';
import Images from "../../constants/image"

const Notifications = (props) => {

    const [notifications] = useGlobalState('notifications')

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
                    <View style={[styles.innerRow, { width: '100%', flexDirection: 'row' }]}>
                        <Image style={{ height: 45, width: 45, borderRadius: 45/2  }} source={item.Image ? item.Image : Images.PlayerPlaceholder } />
                        <View style={{ width: '80%'}}>
                            <Text style={styles.description}>
                                {item.Text}
                            </Text>
                            <Text style={styles.description2}>
                                {formatDistanceToNow(new Date(item.CreatedDate))} ago
                        </Text>
                        </View>
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
    /*useEffect(() => {
        getUserData()
        const focusListener = props.navigation.addListener('didFocus', () => {
            getUserData()
        });

        return () => focusListener.remove()
    }, []);*/

    useEffect(() => {
        if (getUserReq.data) {
            console.log('dispaching notigfication')
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.NOTIFICATIONS, state: getUserReq.data.Notifications })
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.GOTO, state: 'Notifications' })
        }
    }, [getUserReq.loading]);
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

            <Header title={"Notifications"} hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            <View style={[styles.signup_container]}>
                <View style={[styles.fullFlatListContainer]}>
                    {notifications.length > 0 &&
                        <>
                            <FlatList
                                contentContainerStyle={{ flexGrow: 1 }}
                                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: '10%' }}>No notifications</Text>}
                                data={notifications.sort((a, b) => parseISO(b.CreatedDate) - parseISO(a.CreatedDate)) || []}
                                renderItem={({ item, key }) => <Item item={item} key={key} />}
                                temSeparatorComponent={() => <ItemSeparator />}
                                keyExtractor={item => item.id}
                            />
                        </>
                    }
                </View>
                {notifications.length === 0 && <Text style={styles.notFoundText}>No Notifications</Text>}
                {getUserReq.loading && <Text style={styles.notFoundText}>Loading...</Text>}
            </View>
        </ScrollView>
    );
}

export default Notifications;
