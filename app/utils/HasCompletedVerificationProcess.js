const HasCompletedVerificationProcess = (profile) => {
    return profile != null && profile.ProfileImage != null && profile.ProfileImage != ""
    //return (profile?.AboutUs != null)
}

export default HasCompletedVerificationProcess;
