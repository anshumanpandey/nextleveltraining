/*const GlobalContants = {
    FEATURED_PRICE: '20',
    BOOKING_COMISSION: 2,
    PAYPAL_CLIENT_ID: 'AWpaMztfwuCn_dP0IYhyvsnGRxgHtgP5GjDOfFi1U21ANbvyr7PRly1iwcplriBjtPuUGnZufVn894cE',
    PAYPAL_CLIENT_SECRET: 'EIzgb7EaeYuczf-7pe633I6nfDroJQ97bix7H56lsDhqGeDIBck7LD1546VuahVCEOosOOvMDC6-ZThb',
    PAYPAL_TOKEN_URL: 'https://api.paypal.com/v1/oauth2/token',
    PAYPAL_PAYMENT_URL: 'https://api.paypal.com/v1/payments/payment',
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
}*/


//TEST CREDENTIALS
const GlobalContants ={
    FEATURED_PRICE:'20',
    BOOKING_COMISSION: 2,
    PAYPAL_CLIENT_ID:'ASzioBXLboxNr1ZU-Il-AYsuFYnElDWfuhBsMUDCpNb3iROIxhI4DEfef99nXwsP7f1dDkTiHwoZshr_',
    PAYPAL_CLIENT_SECRET:'EBKq-fql7wyVuyfuILX--YiFIb0CziLcfU5UiTlC88eqABsKC5YQd47U8BL428Np4s4_zynBgCj0S1NH',
    PAYPAL_TOKEN_URL: 'https://api.sandbox.paypal.com/v1/oauth2/token',
    PAYPAL_PAYMENT_URL:'https://api.sandbox.paypal.com/v1/payments/payment',
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