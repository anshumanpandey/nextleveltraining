import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});