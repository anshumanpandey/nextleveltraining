import { dispatchGlobalState, GLOBAL_STATE_ACTIONS, storeIosDeviceToken } from '../state/GlobalState'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");
import DeviceInfo from "react-native-device-info"
import { Platform } from 'react-native';

const isEmulator = DeviceInfo.isEmulatorSync()
if(isEmulator && Platform.OS == "ios") {
    
} else {
   PushNotification.createChannel(
    {
      channelId: "default_notification_channel_id", // (required)
      channelName: "My channel", // (required)
      channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
      soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    onRegister: function (tokenData) {
      const { token } = tokenData;
      console.log("TOKEN:", token);
      storeIosDeviceToken(token)
    },  

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log("FIREBASE NOTIFICATION", notification)
      const NLnotification = JSON.parse(notification.data.notification)

      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ADD_NOTIFICATION, state: NLnotification })

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    popInitialNotification: true,
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
  });
}