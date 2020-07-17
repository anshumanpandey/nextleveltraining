import React, { useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import './api/AxiosBootstrap'
import Dimensions from './constants/dimensions'
import Menu from './screens/Menu/Menu.js'
import NavigationService from './navigation/NavigationService.js'
import Login from './screens/login/Login.js'
import SignUp from './screens/signup/Signup.js'
import Level from './screens/level/Level.js'
import LandingPage from './screens/landing/LandingPage.js'
import CreatePost from './screens/createPost/CreatePost'
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from './state/GlobalState';
import { Alert } from 'react-native';




const AppMain = () => {
    const [error] = useGlobalState('error')
    const [success] = useGlobalState('success')
    const [token] = useGlobalState('token')

    const screens = {}

    if (!token) {
        screens.Level= { screen: Level }
        screens.Login= { screen: Login }
        screens.SignUp= { screen: SignUp }
    }


    if (token) {
        screens.LandingPage= { screen: LandingPage }
    }

    const MainStack = createStackNavigator(screens,
        {
            defaultNavigationOptions: ({ navigation }) => {
                return {
                    header: null
                }
            }
        }
    )

    const RootStack = createDrawerNavigator(
        {
            MainStack: {
                screen: MainStack,
                defaultNavigationOptions: {
                    drawerLockMode: 'locked-open',
                }

            }
        },
        {
            drawerWidth: Dimensions.deviceWidth * 0.6,
            contentComponent: Menu
        }

    )

    const Apps = createAppContainer(RootStack)

    useEffect(() => {
        console.log('error', error)
        if (error) {
            Alert.alert('Error', error.toString())
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ERROR, state: null })
        }
    }, [error])

    useEffect(() => {
        console.log('success', error)
        if (success) {
            Toast.show(success, Toast.LONG)
            dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.SUCCESS, state: null })
        }
    }, [success])

    return (

        <Apps
            ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef)
            }}
        />
    )

}

export default AppMain;