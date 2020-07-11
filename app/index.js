import React, {Component, useState} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import ReduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import Dimensions from './constants/dimensions';
import reducers from './redux/reducer';
import Menu from './screens/Menu/Menu.js';
import NavigationService from './navigation/NavigationService.js';
import Login from './screens/login/Login.js';
import SignUp from './screens/signup/Signup.js';
import Level from './screens/level/Level.js';
import LandingPage from './screens/landing/LandingPage.js';

const MainStack = createStackNavigator(
  {
    Level: {screen: Level},
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    LandingPage: {screen: LandingPage},
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
);

const RootStack = createDrawerNavigator(
  {
    MainStack: {
      screen: MainStack,
      defaultNavigationOptions: {
        drawerLockMode: 'locked-open',
      },
    },
  },
  {
    drawerWidth: Dimensions.deviceWidth * 0.6,
    contentComponent: Menu,
  },
);

const AppMain = () => {
  //   const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
  const Apps = createAppContainer(RootStack);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Apps
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </SafeAreaView>
  );
};

export default AppMain;
