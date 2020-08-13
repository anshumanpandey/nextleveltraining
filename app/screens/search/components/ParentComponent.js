import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import SearchComponent from './SearchComponent';
import SavedComponent from './SavedComponent';
import PreviousComponent from './PreviousComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import { useGlobalState } from '../../../state/GlobalState';
import Header from '../../../components/header/Header';
const Tab = createMaterialTopTabNavigator();

const SearchTabs = () => {
  const [profile] = useGlobalState('profile')
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#0F2F80',
        labelStyle: {fontSize: 12},
        style: {backgroundColor: 'white'},
      }}>
      <Tab.Screen
        name="Search"
        component={SearchComponent}
        options={{tabBarLabel: 'SEARCH'}}
      />
      <Tab.Screen
        name="PreviousCoach"
        component={PreviousComponent}
        options={{tabBarLabel: 'PREVIOUS COACHES'}}
      />
      <Tab.Screen
        name="Saved"
        component={SavedComponent}
        options={{tabBarLabel: 'SAVED'}}
      />
    </Tab.Navigator>
  );
}

const ParentComponent = (props) => {
  return (
    <>
    <Header title="Coaches" hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
    <SearchTabs />
    </>
  );
}

export default ParentComponent;
