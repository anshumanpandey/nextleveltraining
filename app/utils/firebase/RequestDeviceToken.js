import { Platform } from "react-native"
import { getDeviceToken, getUniqueId } from "react-native-device-info"
import messaging from '@react-native-firebase/messaging';
import { axiosInstance } from "../../api/AxiosBootstrap";
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

export const sendAndroidToken = (token) => {
    if (Platform.OS == "android") {
        axiosInstance({ url: "/Users/UpdateDeviceToken", body: { deviceToken: token } })
    }
}

export const sendIosToken = (token) => {
    if (Platform.OS == "ios") {
        axiosInstance({ url: "/Users/UpdateDeviceToken", body: { deviceToken: token } })
    }
}


export const generateMultipleDeviceToken = async () => {
    const deviceInfo = await getDeviceToken()
    const firebase = await messaging().getToken()
    const uniqueId = getUniqueId()
    const apn = await messaging().getAPNSToken()

    return `
        deviceInfoToken: [${deviceInfo}]
        deviceInfoUniqueId: [${uniqueId}]
        firebase messaging token: [${firebase}]
        firebase APN token: [${apn}]
    `;
}