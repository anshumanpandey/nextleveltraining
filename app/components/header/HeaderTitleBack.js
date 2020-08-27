import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Icon } from 'native-base';
import styles from './styles';
import { useGlobalState } from '../../state/GlobalState';
import HasCompletedVerificationProcess from '../../utils/HasCompletedVerificationProcess';

const HeaderTitleBack = ({ title, navigate, onBackPress, ...props }) => {
  const [profile] = useGlobalState('profile')
  return (
    <View style={styles.header_layout}>
      <View
        style={[styles.header_item_container, { justifyContent: 'flex-start' }]}>
        {HasCompletedVerificationProcess(profile) ? (
          <TouchableOpacity onPress={() => onBackPress()}>
            <Icon
              name="keyboard-arrow-left"
              type="MaterialIcons"
              color="black"
              style={styles.header_menu_icon}
            />
          </TouchableOpacity>
        ) : undefined}
        <Text style={styles.headerTitle}>{title}</Text>
        {props.customButton && props.customButton()}
      </View>
    </View>
  );
};

export default HeaderTitleBack;
