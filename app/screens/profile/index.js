import React, {useState} from 'react';
import { useGlobalState } from '../../state/GlobalState';
import { View } from "react-native"
import PlayerProfile from './Profile';
import CoachProfile from './CoachProfile';
import Colors from '../../constants/color';
import { Spinner } from 'native-base';

const ProfileFactory = (props) => {
  const [profile] = useGlobalState('profile')

  if (profile && profile.Role == "Player") {
      return <PlayerProfile {...props} />
  }
  if (profile && profile.Role == "Coach") {
    return <CoachProfile {...props} />
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
      <Spinner size={140} color={Colors.s_yellow} />
    </View>
  );

}

export default ProfileFactory;
