import React from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'

const AboutMeScreen = (props) => {
    let [profile] = useGlobalState('profile')
    if (props.navigation.state.params.player) profile = props.navigation.state.params.player

    return (
        <>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            {resolveRoleForm(profile, "AboutMe", { player: profile, navigation: props.navigation })}
        </>
    );
}

export default AboutMeScreen