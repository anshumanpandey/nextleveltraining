import IsPlayer from "./perType/IsPlayer";
import playerProfileIsComplete from "./perType/playerProfileIsComplete";
import CoachHasCompletedStepFour from "./perType/CoachHasCompletedStepFour";

const HasCompletedVerificationProcess = () => {
    return (IsPlayer(profile) && playerProfileIsComplete(profile)) || CoachHasCompletedStepFour(profile)
}

export default HasCompletedVerificationProcess;
