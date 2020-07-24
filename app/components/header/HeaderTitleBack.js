import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import NavigationService from '../../navigation/NavigationService';
import hasFullProfile from '../../utils/perType/profileResolver';
import { useGlobalState } from '../../state/GlobalState';

const HeaderTitleBack = ({ title }) => {
  const [profile] = useGlobalState('profile')
  return (
    <View style={styles.header_layout}>
      <View
        style={[styles.header_item_container, { justifyContent: 'flex-start' }]}>
        {hasFullProfile(profile) ? (
          <TouchableOpacity onPress={() => NavigationService.goBack()}>
            <Icon
              name="keyboard-arrow-left"
              type="MaterialIcons"
              color="black"
              style={styles.header_menu_icon}
            />
          </TouchableOpacity>
        ) : undefined}
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default HeaderTitleBack;
