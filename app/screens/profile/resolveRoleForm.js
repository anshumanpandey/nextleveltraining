import React from 'react'
import { AboutMeCoachForm, BankAccountForm, TrainingLocationForm, TravelForm } from './CoachProfile'
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

    if (formName == "TrainingLocation") {
        return <TrainingLocationForm />
    }

    if (formName == "Travel") {
        return <TravelForm />
    }

    return false
}

export default resolveRoleForm;