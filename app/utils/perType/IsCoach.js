const IsCoach = (profile) => {
    return profile && profile.Role == "Coach"
}

export default IsCoach;