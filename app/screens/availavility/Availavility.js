import React from 'react'
import resolveRoleForm from '../profile/resolveRoleForm'
import { useGlobalState } from '../../state/GlobalState'
import Header from '../../components/header/Header'

const AvailavilityScreen = (props) => {
    const [profile] = useGlobalState('profile')
    return (
        <>
            <Header hideCreatePost={true} toggleDrawer={props.navigation.toggleDrawer} navigate={props.navigation.navigate} />
            {resolveRoleForm(profile, 'Availavility')}
        </>
    );
}

export default AvailavilityScreen