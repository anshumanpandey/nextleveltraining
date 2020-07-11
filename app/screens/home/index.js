import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Home from '../home/Home';
import Comment from '../home/Comments';
import {createAppContainer} from 'react-navigation';
import {SafeAreaView} from 'react-native';
import NavigationService from '../../navigation/NavigationService';

const MainStack = createStackNavigator(
  {
    Home: {screen: Home},
    Comment: {screen: Comment},
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        header: null,
      };
    },
  },
);

const AppMain = () => {
  const Apps = createAppContainer(MainStack);
  return <Apps />;
};
export default AppMain;
