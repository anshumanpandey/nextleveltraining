import { Platform } from "react-native"
import messaging from '@react-native-firebase/messaging';
const { FIREBASE_SENDER_ID } = require("../Firebase")

export const RequestDeviceToken = () => {
    // if (Platform.OS == "ios") return Promise.resolve()
    return messaging().hasPermission()
    .then((has) => {
        console.log('has permission', has)
        return messaging().requestPermission()
    })
    .then((r) => {
        console.log("registerForRemoteNotifications",r)
        return messaging().getToken(FIREBASE_SENDER_ID)
    })
}
