const HasCompletedVerificationProcess = (profile) => {
    const { VerificationDocument = null, ProfileImage = null, AboutUs = null, TrainingLocations = [] } = (profile || {})
    let isValid = false

    if (profile !== null) {
        const role = profile.Role.toLowerCase()
        if (role === "coach") {
            if (ProfileImage !== null &&
                ProfileImage !== "" &&
                VerificationDocument !== null /* && TrainingLocations.length !== 0 */) {
                isValid = true
            }
        } else if (role === "player") {
            if (AboutUs !== null) {
                isValid = true
            }
        }
    }

    return isValid
}

export default HasCompletedVerificationProcess;
