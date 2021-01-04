const CoachHasCompletedStepFour = (profile) => {
    return profile && profile.Role == "Coach" && profile.TrainingLocations != null && profile.TrainingLocations.length != 0
}

export default CoachHasCompletedStepFour;