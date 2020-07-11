import React, { Component } from 'react'
import {View,Image} from 'react-native'
// import BottomNavigation, {
//     FullTab
//   } from 'react-native-material-bottom-navigation'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base'
import Home from '../home/Home'
import Search from '../search/Search'
import Booking from '../booking/Booking'
import Message from '../message/Message'
import Profile from '../profile/Profile'
import {bottomTabs} from './bottomTabs.js'
import Images from '../../constants/image'
import styles from './styles'

const Tab = createBottomTabNavigator();

class LandingPage extends Component {
 
    constructor(props){
        super(props)
        this.state={
       
        }
    }
   componentDidMount(){
    
   }

  render() {
    return (
    
   <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: 'black',
        }}
        >
        <Tab.Screen
          name="Home"
          component={props=><Home {...props} toggleDrawer={this.props.navigation.toggleDrawer}/>}
          options={{
            tabBarLabel:'HOME',
            tabBarIcon: () => (
              <Icon type="SimpleLineIcons" name="home" style={{color:'#0F2F80',fontSize:20}}/>
            ),
          }} 
          />
        <Tab.Screen
          name="Search"
          component={props=><Search {...props} toggleDrawer={this.props.navigation.toggleDrawer}/>}
          options={{
            tabBarLabel: 'SEARCH',
            tabBarIcon: () => (
              <Icon type="Feather" name="search" style={{color:'#0F2F80',fontSize:20}}/>
            ),
          }} />
        <Tab.Screen
          name="Booking"
          component={props=><Booking {...props} toggleDrawer={this.props.navigation.toggleDrawer}/>}
          options={{
            tabBarLabel: 'BOOKING',
            tabBarIcon: () => (
              <Icon type="Feather" name="shopping-cart" style={{color:'#0F2F80',fontSize:20}}/>
            ),
          }} />
        <Tab.Screen
          name="Message"
          component={props=><Message {...props} toggleDrawer={this.props.navigation.toggleDrawer}/>}
          options={{
            tabBarLabel: 'MESSAGE',
            tabBarIcon: () => (
               <Icon type="Feather" name="message-square" style={{color:'#0F2F80',fontSize:20}}/>
            ),
          }} />
        <Tab.Screen
          name="Profile"
          component={props=><Profile {...props} toggleDrawer={this.props.navigation.toggleDrawer}/>}
          options={{
            tabBarLabel: 'PROFILE',
            tabBarIcon: () => (
               <Icon type="MaterialIcons" name="person-outline" style={{color:'#0F2F80',fontSize:25}}/>
            ),
          }} />
      </Tab.Navigator>
    </NavigationContainer>
   
    )
  }
}

export default LandingPage
