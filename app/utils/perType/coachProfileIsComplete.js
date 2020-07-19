
const coachProfileIsComplete = (profile) => {
    return profile && 
    profile.AboutUs != null && 
    profile.Accomplishment != null && 
    profile.Experiences != null && profile.Experiences.length != 0 && 
    profile.DBSCeritificate != null &&
    profile.VerificationDocument != null &&
    profile.Rate != 0 &&
    profile.BankAccount != null &&
    profile.Availabilities != null && profile.Availabilities.length != 0 && 
    profile.TrainingLocations != null && profile.TrainingLocations.length != 0

}

export default coachProfileIsComplete;