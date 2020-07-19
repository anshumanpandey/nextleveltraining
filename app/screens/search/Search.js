import React, {Component} from 'react';
import {View} from 'react-native';
import Header from '../../components/header/Header';
import ParentComponent from './components/ParentComponent';

class Search extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Header navigate={this.props.navigation.navigate}/>
        <ParentComponent />
      </View>
    );
  }
}

export default Search;
