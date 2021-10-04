import React from 'react';
import { View } from "react-native"
import { Spinner } from 'native-base';
import { useGlobalState } from '../../state/GlobalState';
import PlayerProfile from './Profile';
import CoachProfile from './coachProfile/CoachProfile';
import Colors from '../../constants/color';

const ProfileFactory = (props) => {
  const [profile] = useGlobalState('profile')

  if (profile && profile.Role == "Player") {
    return (
      <PlayerProfile
        {...props}
        goBackTo="Profile"
      />
    )
  }
  if (profile && profile.Role == "Coach") {
    return <CoachProfile {...props} goBackTo="Profile" />
  }

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flexGrow: 1 }}>
      <Spinner size={140} color={Colors.s_blue} />
    </View>
  );

}

export default ProfileFactory;
