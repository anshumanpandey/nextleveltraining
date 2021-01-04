import GlobalContants from "../../constants/GlobalContants";
import { nanoid } from 'nanoid'

export const getTotalBookingPrice = (coach, sessions) => {
    return sessions.reduce((total) => {
        return total = total + coach.Rate + GlobalContants.BOOKING_COMISSION
    }, 0).toString()
}
export const GET_PAYPAL_JSON = (coach, sessions) => {
    return {
        "intent": "CAPTURE",
        "purchase_units": [
            ...sessions.map(session => {
                return {
                    "reference_id": nanoid(),
                    "name": `Coaching from ${coach.FullName}`,
                    "description": `Training seesion from ${coach.FullName} starting from ${session.FromTime} to ${session.ToTime}`,
                    "amount": {
                        "currency_code": "GBP",
                        "value": coach.Rate,
                    }
                }
            }),
            {
                "reference_id": nanoid(),
                "name": `Next Level Comission`,
                "description": `Next Level Comission of 2£ per session`,
                "amount": {
                    "currency_code": "GBP",
                    "value": sessions.reduce((total) => {
                        return total = total + GlobalContants.BOOKING_COMISSION
                    }, 0),
                }
            }
        ],
        "application_context": {
            "return_url": "https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_success.html",
            "cancel_url": "https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_failure.html",
        }
    }
};

