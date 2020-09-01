import { dispatchGlobalState, GLOBAL_STATE_ACTIONS } from '../state/GlobalState'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");
import DeviceInfo from "react-native-device-info"
import { Platform } from 'react-native';

const isEmulator = DeviceInfo.isEmulatorSync()
if(isEmulator && Platform.OS == "ios") {
    
} else {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      const NLnotification = JSON.parse(notification.data.notification)

      dispatchGlobalState({ type: GLOBAL_STATE_ACTIONS.ADD_NOTIFICATION, state: NLnotification })

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onRegistrationError: function (err) {
      console.error(err.message, err);
    },
  });
}