import React, {Component} from 'react';
import {View, TouchableOpacity, SafeAreaView, StatusBar} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';

const HeaderClosePlus = () => {
  return (
    <View style={styles.header_layout}>
      <View style={styles.header_item_container}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <Icon
            name="close"
            type="MaterialIcons"
            style={styles.header_menu_icon}
          />
        </TouchableOpacity>
        <View style={{flexDirection: 'row'}}>
          <Icon
            name="add"
            type="MaterialIcons"
            style={styles.header_menu_icon}
          />
        </View>
      </View>
    </View>
  );
};

export default HeaderClosePlus;
