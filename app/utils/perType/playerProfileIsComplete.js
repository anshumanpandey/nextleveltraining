const playerProfileIsComplete = (profile) => {
    return profile && 
    profile.AboutUs != null && 
    profile.Achievements != null &&
    profile.IsTempPassword != true &&
    profile.UpcomingMatches && profile.UpcomingMatches.length != 0 &&
    profile.Teams && profile.Teams.length != 0
}

export default playerProfileIsComplete;