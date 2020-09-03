import React, { useState, useEffect } from 'react';
import { useGlobalState, GLOBAL_STATE_ACTIONS } from '../../state/GlobalState';
import { View } from "react-native"
import PlayerProfile from './Profile';
import CoachProfile from './CoachProfile';
import Colors from '../../constants/color';
import { Spinner } from 'native-base';
import NavigationService from '../../navigation/NavigationService';
import { StackActions, NavigationActions } from 'react-navigation';

const ProfileFactory = (props) => {
  const [profile] = useGlobalState('profile')

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
      <Spinner size={140} color={Colors.s_blue} />
    </View>
  );

}

export default ProfileFactory;
