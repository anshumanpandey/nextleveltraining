import React, {Component} from 'react';
import InformationTab from './informationTab';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

class InfoTabs extends Component {
  render() {
    return (
      <Tab.Navigator
        initialRouteName="InformationTab"
        tabBarOptions={{
          activeTintColor: '#0F2F80',
          labelStyle: {fontSize: 12},
          style: {backgroundColor: 'white'},
        }}>
        <Tab.Screen
          name="InformationTab"
          component={InformationTab}
          options={{tabBarLabel: 'SEARCH'}}
        />
        <Tab.Screen
          name="InformationTab1"
          component={InformationTab}
          options={{tabBarLabel: 'PREVIOUS COACHES'}}
        />
        <Tab.Screen
          name="InformationTab"
          component={InformationTab}
          options={{tabBarLabel: 'SAVED'}}
        />
      </Tab.Navigator>
    );
  }
}

export default InfoTabs;
