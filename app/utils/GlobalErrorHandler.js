import { Alert } from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from 'react-native-exception-handler';
import { axiosInstance } from '../api/AxiosBootstrap';

setJSExceptionHandler((error, isFatal) => {
    // This is your custom global error handler
    // You do stuff like show an error dialog
    // or hit google analytics to track crashes
    // or hit a custom api to inform the dev team.
    const data = {
        "exception": error.message.toString(),
        "stackTrace": error.stack.toString()
    }
    axiosInstance({ url: "/Error/CreateErrorLog", method: 'POST', data })
    Alert.alert('An error was found inside the app. Our developer team has been notified about this and will be fixed')
});

setNativeExceptionHandler(exceptionString => {
    // This is your custom global error handler
    // You do stuff likehit google analytics to track crashes.
    // or hit a custom api to inform the dev team.
    //NOTE: alert or showing any UI change via JS
    //WILL NOT WORK in case of NATIVE ERRORS.
    const data = {
        "exception": exceptionString?.toString(),
        "stackTrace": exceptionString?.toString()
    }
    axiosInstance({ url: "/Error/CreateErrorLog", method: 'POST', data })

});