import { useEffect, useState } from "react"
import { makeUseAxios } from 'axios-hooks'
import GlobalContants from "../constants/GlobalContants";
import base64 from 'react-native-base64'
const simpleAxiosHook = makeUseAxios()

export const getCaptureUrl = (token) => {
    if (GlobalContants.ENV == "LIVE") {
        return `https://api.paypal.com/v2/checkout/orders/${token}/capture`
    }
    return `https://api.sandbox.paypal.com/v2/checkout/orders/${token}/capture`

}

const params = new URLSearchParams();
params.append('grant_type', 'client_credentials');

export const UsePaypalHook = () => {
    const [bearerToken, setBearerToken] = useState();

    const [getAccessTokenReq] = simpleAxiosHook({
        url: GlobalContants.PAYPAL_TOKEN_URL,
        method: 'POST',
        params,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64.encode(`${GlobalContants.PAYPAL_CLIENT_ID}:${GlobalContants.PAYPAL_CLIENT_SECRET}`)}`,
        },
    })

    const [paymentReq, doPayment] = simpleAxiosHook({
        url: GlobalContants.PAYPAL_PAYMENT_URL,
        method: 'POST'
    }, { manual: true })

    useEffect(() => {
        if (getAccessTokenReq.data) {
            setBearerToken(getAccessTokenReq.data.access_token)
        }
    }, [getAccessTokenReq.loading])

    const [doCapturePaymentReq, doCapturePayment] = simpleAxiosHook({
        method: 'POST',
    }, { manual: true })


    const generatePaymentOrderFor = (paypalJson) => {
        return doPayment({
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            },
            data: paypalJson
        })
    }

    const capturePaymentForToken = (token, paypalJson) => {
        return doCapturePayment({
            url: getCaptureUrl(token),
            data: { ...paypalJson, "final_capture": true },
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        })
    }




    return {
        bearerToken,
        getAccessTokenReq,
        generatePaymentOrderReq: paymentReq,
        generatePaymentOrderFor,
        capturePaymentForToken
    }
}