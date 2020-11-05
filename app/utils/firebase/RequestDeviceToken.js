import { Platform } from "react-native"
import { getDeviceToken, getUniqueId } from "react-native-device-info"
import messaging from '@react-native-firebase/messaging';
import { axiosInstance } from "../../api/AxiosBootstrap";

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

export const RequestAndroidDeviceToken = () => {
    return messaging().getToken()
}

export const sendAndroidToken = (token) => {
    if (Platform.OS == "android") {
        axiosInstance({ method: "post",url: "/Users/UpdateDeviceToken", data: { deviceToken: token } })
    }
}

export const sendIosToken = (token) => {
    if (Platform.OS == "ios") {
        axiosInstance({ method: "post",url: "/Users/UpdateDeviceToken", data: { deviceToken: token } })
    }
}
