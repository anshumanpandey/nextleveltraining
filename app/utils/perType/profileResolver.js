import coachProfileIsComplete from './coachProfileIsComplete'
import playerProfileIsComplete from './playerProfileIsComplete'

const hasFullProfile = (profile) => {
    if (!profile) return false
    if ("Role" in profile == false) return false
    if (profile.Role == "Coach"){
        return coachProfileIsComplete(profile)
    }
    if (profile.Role == "Player"){
        return playerProfileIsComplete(profile)
    }

    return false
}

export default hasFullProfile;