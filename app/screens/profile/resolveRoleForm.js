import React from 'react'
import { AboutMeCoachForm, BankAccountForm } from './CoachProfile'
import PlayerProfile from './Profile'

const resolveRoleForm = (profile, formName = "AboutMe") => {
    if (!profile) return <></>
    if ("Role" in profile == false) return <></>

    if (formName == "AboutMe") {
        if (profile.Role == "Coach") {
            return <AboutMeCoachForm />
        }
        if (profile.Role == "Player") {
            return <PlayerProfile />
        }
    }

    if (formName == "BankAccount") {
        return <BankAccountForm />
    }

    return false
}

export default resolveRoleForm;