import FileSyncher from "./PostSyncher"
import { getGlobalState, dispatchGlobalState, GLOBAL_STATE_ACTIONS } from "../state/GlobalState"
import AsyncStorage from "@react-native-community/async-storage"
import { axiosInstance } from "../api/AxiosBootstrap"

export default () => {
    const profile = getGlobalState('profile')
    if (!profile) return

    if (profile && !profile.ProfileImage) {
        AsyncStorage.getItem(`ProfilePic`)
            .then((fileString) => {
                if (!fileString) return
                syncProfilePic(JSON.parse(fileString), profile)
            })
    }

    if (profile && profile.VerificationDocument && !profile.VerificationDocument.Path) {
        AsyncStorage.getItem(`Verification-file`)
            .then((fileString) => {
                if (!fileString) return
                FileSyncher(JSON.parse(fileString), profile.Id, "verification")
                console.log('uploading profile verification document')
            })
    }

    if (profile && profile.DBSCeritificate && !profile.DBSCeritificate.Path) {
        AsyncStorage.getItem(`DbsCert-file`)
            .then((fileString) => {
                if (!fileString) return
                //FileSyncher()
            })
    }
}

export const syncProfilePic = (file) => {
    const profile = getGlobalState('profile')
    FileSyncher(file, profile.Id, "profile")
    .then(() => axiosInstance({ url: '/Users/GetUser'}))
    .then(() => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data }))
    console.log('uploading profile pic')
}

export const syncDbs = (file) => {
    const profile = getGlobalState('profile')
    console.log('uploading DBS pic')

    return FileSyncher(file, profile.Id, "dbs")
    .then(() => axiosInstance({ url: '/Users/GetUser'}))
    .then((r) => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data }))
}

export const syncVerifyDocument = (file) => {
    const profile = getGlobalState('profile')
    console.log('uploading verification pic')

    return FileSyncher(file, profile.Id, "verification")
    .then(() => axiosInstance({ url: '/Users/GetUser'}))
    .then((r) => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data }))
}

export const syncTrainingLocationImage = (file, locationId) => {
    console.log('uploading location pic')

    return FileSyncher(file, locationId, "location")
    .then(() => axiosInstance({ url: '/Users/GetUser'}))
    .then((r) => dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.PROFILE, state: r.data }))
}