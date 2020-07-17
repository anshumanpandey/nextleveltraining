import React, {useState} from 'react';
import { useGlobalState } from '../../state/GlobalState';
import PlayerProfile from './Profile';
import CoachProfile from './CoachProfile';

const Profile = (props) => {
  const [profile] = useGlobalState('profile')

  console.log()
  if (profile.Role == "Player") {
      return <PlayerProfile {...props} />
  } else {
    return <CoachProfile {...props} />
  }

}

export default Profile;
