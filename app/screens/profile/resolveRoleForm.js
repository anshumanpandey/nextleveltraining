import React from 'react'
import { AboutMeCoachForm } from './CoachProfile'
import PlayerProfile from './Profile'

const resolveRoleForm = (profile) => {
    if (!profile) return <></>
    if ("Role" in profile == false) return <></>

    if (profile.Role == "Coach"){
        return <AboutMeCoachForm />
    }
    if (profile.Role == "Player"){
        return <PlayerProfile />
    }

    return false
}

export default resolveRoleForm;