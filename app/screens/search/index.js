import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import Search from '../search/Search';
import Information from './components/information/Information';
import BookNow from './components/BookNow';
import Payments from './../payments';
import JobDetails from './../jobDetails';
import {createAppContainer} from 'react-navigation';
import NavigationService from '../../navigation/NavigationService';

const MainStack = createStackNavigator(
  {
    Search: {screen: Search},
    Information: {screen: Information},
    BookNow: {screen: BookNow},
    Payments: {screen: Payments},
    JobDetails: {screen: JobDetails},
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
  return (
    <Apps
      ref={(navigatorRef) => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    />
  );
};
export default AppMain;
