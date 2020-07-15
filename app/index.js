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
import { useGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from './state/GlobalState';
import { Alert } from 'react-native';



const MainStack = createStackNavigator(

    {

        Level: { screen: Level },
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        LandingPage: { screen: LandingPage },

    },
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



const AppMain = () => {
    const Apps = createAppContainer(RootStack)

    const [error] = useGlobalState('error')
    const [success] = useGlobalState('success')

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