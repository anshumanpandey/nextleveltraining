import React, { Component } from 'react'
import {View,StatusBar} from 'react-native'
import Header from '../../components/header/Header'
import ParentComponent from './components/ParentComponent'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

class Search extends Component {
  render() {
    return (
      <View style={{flex:1}}>
          {/* <View style={{
            width: "100%",
            height: STATUS_BAR_HEIGHT,
            backgroundColor: "#0F2F80"
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View> */}
        <Header toggleDrawer={this.props.toggleDrawer}/>
        <ParentComponent/>
      </View>
    )
  }
}

export default Search
