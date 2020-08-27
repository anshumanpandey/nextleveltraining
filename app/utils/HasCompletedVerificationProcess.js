import IsPlayer from "./perType/IsPlayer";
import playerProfileIsComplete from "./perType/playerProfileIsComplete";
import CoachHasCompletedStepFour from "./perType/CoachHasCompletedStepFour";
import IsCoach from "./perType/IsCoach";

const HasCompletedVerificationProcess = (profile) => {
    return (IsPlayer(profile) && playerProfileIsComplete(profile)) || (IsCoach(profile) && profile.AboutUs)
}

export default HasCompletedVerificationProcess;
