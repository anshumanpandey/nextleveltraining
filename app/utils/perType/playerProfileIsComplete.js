
const playerProfileIsComplete = (profile) => {
    return profile && 
    profile.AboutUs != null && 
    profile.Achievements != null

}

export default playerProfileIsComplete;