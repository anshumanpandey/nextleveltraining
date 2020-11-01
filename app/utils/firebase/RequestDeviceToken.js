import { Platform } from "react-native"
import { getDeviceToken } from "react-native-device-info"
import messaging from '@react-native-firebase/messaging';
const { FIREBASE_SENDER_ID } = require("../Firebase")

export const RequestDeviceToken = () => {
    if (Platform.OS == "ios") {
        return getDeviceToken()
    }
    return messaging().hasPermission()
    .then((has) => {
        console.log('has permission', has)
        return messaging().requestPermission()
    })
    .then((r) => {
        console.log("registerForRemoteNotifications",r)
        return messaging().getToken()
    })
}
