
const coachProfileIsComplete = (profile) => {
    /*console.log(profile.AboutUs != null )
    console.log(profile.Accomplishment != null)
    console.log(profile.Experiences != null && profile.Experiences.length != 0)
    console.log(profile.DBSCeritificate != null)
    console.log(profile.VerificationDocument != null)
    console.log(profile.Rate != 0)
    console.log(profile.BankAccount != null)
    console.log(profile.Availabilities != null && profile.Availabilities.length != 0 )
    console.log(profile.TrainingLocations != null && profile.TrainingLocations.length != 0)*/

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