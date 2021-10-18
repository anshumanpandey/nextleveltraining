/* const GlobalContants = {
    ENV: 'LIVE',
    STRIPE_KEY: 'pk_live_hsdDdRGSyYxs38fMNIaAY1CD00rAm7kvcW',
    FEATURED_PRICE: '15',
    BOOKING_COMISSION: 2,
    PAYPAL_CLIENT_ID: 'AWpaMztfwuCn_dP0IYhyvsnGRxgHtgP5GjDOfFi1U21ANbvyr7PRly1iwcplriBjtPuUGnZufVn894cE',
    PAYPAL_CLIENT_SECRET: 'EIzgb7EaeYuczf-7pe633I6nfDroJQ97bix7H56lsDhqGeDIBck7LD1546VuahVCEOosOOvMDC6-ZThb',
    PAYPAL_TOKEN_URL: 'https://api-m.paypal.com/v1/oauth2/token',
    PAYPAL_PAYMENT_URL: 'https://api-m.paypal.com/v2/checkout/orders',
    GOOGLE_SIGNIN_DATA: {
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '669575831507-c3nqa7p8camij0pbo1q5i1m2tp2m5kt0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '669575831507-r84633mtfqc26al0917hep98i2mse110.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    }
} */


// TEST CREDENTIALS
const GlobalContants = {
    ENV: 'TEST',
    FEATURED_PRICE: '20',
    BOOKING_COMISSION: 2,
    STRIPE_KEY: "pk_test_x7ILp8ZkceqUqaIxDWAiBsLi00Fz2vPqrZ",
    PAYPAL_CLIENT_ID: 'AS7OSbMNJhiMOE9IlFst44IhkGiRXmttKDa20ovXwQvS3WiU7enHhjeglB-vwgHYkeQ8MvIUORS4LPOM',
    PAYPAL_CLIENT_SECRET: 'EC8lbXoww3XPmnabMFsup2tt6_N9duhvKRn7619rCLHrejFN513BoXMuauPIrcLYfN20TwpPLvFeHJD9',
    PAYPAL_TOKEN_URL: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    PAYPAL_PAYMENT_URL: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
    PAYPAL_CAPTURE_URL: 'https://api-m.sandbox.paypal.com/v2/checkout/orders',
    GOOGLE_SIGNIN_DATA: {
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        webClientId: '669575831507-c3nqa7p8camij0pbo1q5i1m2tp2m5kt0.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
        offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        hostedDomain: '', // specifies a hosted domain restriction
        loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
        forceConsentPrompt: false, // [Android] if you want to show the authorization prompt at each login.
        accountName: '', // [Android] specifies an account name on the device that should be used
        iosClientId: '669575831507-r84633mtfqc26al0917hep98i2mse110.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    }
}


export default GlobalContants;