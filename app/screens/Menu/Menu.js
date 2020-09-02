import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, TextInput, ScrollView, Image, SafeAreaView, FlatList } from 'react-native';
import { Icon } from 'native-base'

import Images from '../../constants/image.js'
import styles from './styles'
import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, useGlobalState } from '../../state/GlobalState.js';
import AsyncStorage from '@react-native-community/async-storage';
import NavigationService from '../../navigation/NavigationService.js';
import Screens from '../../utils/screen.js';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess.js';


const Menu = (props) => {
    const [profile] = useGlobalState('profile')

    const menulist = [
        {
            id: 8,
            title: 'Logout',
            icon: `${Images.LogoutIcon}`,
            path: 'Login',
            onPress: () => {
                NavigationService.navigate('Logout')
            }
        }
    ]

    const coachMenulist = [
        {
            id: 12,
            title: 'Availability',
            icon: `${Images.LogoutIcon}`,
            path: 'Availability',
            onPress: (props, profile) => {
                NavigationService.navigate('Availavility')
            }
        },
    ]

    const fullProfileMenu = [
        {
            id: 0,
            title: 'Personal Details',
            icon: `${Images.PersonalDetailIcon}`,
            path: 'PaidEvent',
            onPress: (props, profile) => {
                NavigationService.navigate(Screens.EditProfile, {
                    navigation: props.navigation,
                    emailIDIsDisabled: true,
                    btnText: 'Save',
                    ...profile
                })
            }
        },
        {
            id: 1,
            title: 'About Me',
            icon: `${Images.AboutMeIcon}`,
            path: 'FavouriteList',
            onPress: (props, profile) => {
                NavigationService.navigate('AboutMe')
            }
        },
        {
            id: 44,
            title: 'Calendar',
            icon: `${Images.CalendarIcon}`,
            path: 'Calendar',
            onPress: (props, profile) => {
                NavigationService.navigate('Calendar')
            }
        },
        {
            id: 4,
            title: profile?.Role == "Player" ? 'Home Pitch Location':'Training Pitch Location',
            icon: `${Images.HomeTrainingIcon}`,
            path: 'PaymentMethod',
            onPress: (props, profile) => {
                NavigationService.navigate('TrainingLocation')
            }
        },
        {
            id: 5,
            title: 'Privacy',
            icon: `${Images.PrivacyIcon}`,
            path: '',
            onPress: (props, profile) => {
                NavigationService.navigate("PrivacyPolicy", {
                    navigation: props.navigation,
                })
            }
        },
        {
            id: 6,
            title: 'Terms',
            icon: `${Images.TermsIcon}`,
            path: '',
            onPress: (props, profile) => {
                NavigationService.navigate("Terms", {
                    navigation: props.navigation,
                })
            }
        },
        {
            id: 7,
            title: 'Help',
            icon: `${Images.HelpIcon}`,
            path: '',
            onPress: (props, profile) => {
                NavigationService.navigate("Help", {
                    navigation: props.navigation,
                })
            }
        },
    ]

    const [profilePic, setProfilePic] = useState();
    const [triggerChange, setTriggerChange] = useState(true);
    let finalMenu = []

    if (HasCompletedVerificationProcess(profile)) {
        if (!menulist.find(i => i.title == 'Help')) {
            menulist.unshift(...fullProfileMenu)
        }
        if (profile.Role == "Coach") {
            if (!menulist.find(i => i.path == 'BankAccount')) {
                finalMenu = [
                    // part of the array before the specified index
                    ...menulist.slice(0, 2),
                    // inserted items
                    ...coachMenulist,
                    // part of the array after the specified index
                    ...menulist.slice(2)
                ]
                menulist.unshift(...coachMenulist)
            }
        } else {
            finalMenu = [
                ...menulist.slice(0, 3),
                {
                    id: 54,
                    title: 'Coaches',
                    icon: `${Images.AboutMeIcon}`,
                    path: '',
                    onPress: (props, profile) => {
                        NavigationService.navigate("AddCoaches")
                    }
                },
                ...menulist.slice(3),
            ]
        }
    }

    useEffect(() => {
        if (!profile?.ProfileImage) {
            AsyncStorage.getItem('ProfilePic')
                .then((s) => {
                    if (!s) return
                    setProfilePic(JSON.parse(s).uri)
                })
        } else {
            setProfilePic(profile?.ProfileImage)
        }
    }, [props, profile])

    useEffect(() => {
        setTriggerChange(o => !o)
    }, [profilePic])

    return (

        <View style={styles.menu_view}>
            <TouchableOpacity
                disabled={profile?.Role == "Player"}
                onPress={() => NavigationService.navigate("CoachSummary")}
            >
                <View style={styles.menu_avatar}>
                    {triggerChange == true && <Image style={styles.imageAvatar} source={profilePic ? { uri: profilePic } : Images.PlayerPlaceholder} />}
                    {triggerChange == false && <Image style={styles.imageAvatar} source={profilePic ? { uri: profilePic } : Images.PlayerPlaceholder} />}
                    <Text style={styles.avatar_title}>{profile?.FullName}</Text>
                </View>
            </TouchableOpacity>
            <FlatList
                data={finalMenu}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => item.onPress && item.onPress(props, profile)}
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