import React, {Component} from 'react';
import {View, StatusBar} from 'react-native';
import Header from '../../components/header/Header';
import ParentComponent from './components/ParentComponent';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();

class Search extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header toggleDrawer={this.props.toggleDrawer} />
        <ParentComponent />
      </View>
    );
  }
}

export default Search;
