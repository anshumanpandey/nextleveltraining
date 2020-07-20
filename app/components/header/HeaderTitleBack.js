import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';

const HeaderTitleBack = ({title}) => {
  return (
    <View style={styles.header_layout}>
      <View
        style={[styles.header_item_container, {justifyContent: 'flex-start'}]}>
        <TouchableOpacity onPress={() => NavigationService.goBack()}>
          <Icon
            name="keyboard-arrow-left"
            type="MaterialIcons"
            color="black"
            style={styles.header_menu_icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderTitleBack;
