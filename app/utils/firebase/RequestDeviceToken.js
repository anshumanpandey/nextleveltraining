import { Platform } from "react-native"
import { getDeviceToken, getUniqueId } from "react-native-device-info"
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


export const generateMultipleDeviceToken = async () => {
    const deviceInfo = await getDeviceToken()
    const firebase = await messaging().getToken()
    const uniqueId = getUniqueId()

    return `
        deviceInfoToken: ${deviceInfo}
        deviceInfoUniqueId: ${uniqueId}
        firebase messaging token: ${firebase}
        firebase APN token: ${messaging().getAPNSToken()}
    `;
}