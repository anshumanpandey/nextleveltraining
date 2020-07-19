import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import { Icon } from 'native-base'

import Images from '../../constants/image.js'
import styles from './styles'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState.js';
import hasFullProfile from '../../utils/perType/profileResolver.js';
import AsyncStorage from '@react-native-community/async-storage';


const menulist = [
    {
        id: 8,
        title: 'Logout',
        icon: `${Images.LogoutIcon}`,
        path: 'Login',
        onPress: () => {
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.LOGOUT })
        }
    }
]

const fullProfileMenu = [
    {
        id: 0,
        title: 'Personal Details',
        icon: `${Images.PersonalDetailIcon}`,
        path: 'PaidEvent'
    },
    {
        id: 1,
        title: 'About Me',
        icon: `${Images.AboutMeIcon}`,
        path: 'FavouriteList'
    },
    {
        id: 2,
        title: 'My Bookings',
        icon: `${Images.MyBookingIcon}`,
        path: 'BookEvent'
    },
    {
        id: 3,
        title: 'Payment Methods',
        icon: `${Images.PaymentMethodIcon}`,
        path: 'Profile'
    },
    {
        id: 4,
        title: 'Training Area',
        icon: `${Images.HomeTrainingIcon}`,
        path: 'PaymentMethod'
    },
    {
        id: 5,
        title: 'Privacy',
        icon: `${Images.PrivacyIcon}`,
        path: ''
    },
    {
        id: 6,
        title: 'Terms',
        icon: `${Images.TermsIcon}`,
        path: ''
    },
    {
        id: 7,
        title: 'Help',
        icon: `${Images.HelpIcon}`,
        path: ''
    },
]


const Menu = (props) => {
    const [profilePic, setProfilePic] = useState();
    const [profile] = useGlobalState('profile')

    if (hasFullProfile(profile) && !menulist.find(i => i.title == 'Help')) {
        menulist.push(...fullProfileMenu)
    }

    useEffect(() => {
        AsyncStorage.getItem('ProfilePic')
            .then((s) => {
                if (!s) return
                setProfilePic(JSON.parse(s))
            })
    }, [props])
    return (

        <View style={styles.menu_view}>
            <View style={styles.menu_avatar}>
                <Image style={styles.imageAvatar} source={profilePic ? { uri: profilePic.uri } : Images.KobePlayer} />
                <Text style={styles.avatar_title}>{profile?.FullName}</Text>
            </View>
            <FlatList
                data={menulist}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => item.onPress && item.onPress()}
                    >
                        <View style={styles.menu_item_view}>
                            <View style={styles.menu_inner_view}>
                                <Image source={item.icon} style={styles.menu_icon_size} />
                                <Text style={styles.menutitle}>{item.title}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                )}
            />
        </View>


    )
}

export default Menu;