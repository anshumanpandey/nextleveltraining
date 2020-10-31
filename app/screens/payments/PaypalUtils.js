import GlobalContants from "../../constants/GlobalContants";

export const getTotalBookingPrice = (coach,sessions) => {
    return sessions.reduce((total) => {
        return total = total + coach.Rate + GlobalContants.BOOKING_COMISSION
    }, 0).toString()
}
export const GET_PAYPAL_JSON = (coach, sessions) => {
    return {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": getTotalBookingPrice(coach, sessions),
                "currency": "GBP",
            },
            "description": "This is the payment transaction description.",
            "custom": "EBAY_EMS_90048630024435",
            "invoice_number": "48787589673",
            "payment_options": {
                "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
            },
            "soft_descriptor": "ECHI5786786",
            "item_list": {
                "items": [
                    ...sessions.map(session => {
                        return {
                            "name": `Coaching from ${coach.FullName}`,
                            "description": `Training seesion from ${coach.FullName} starting from ${session.FromTime} to ${session.ToTime}`,
                            "quantity": "1",
                            "price": coach.Rate,
                            "tax": "0",
                            "sku": "1",
                            "currency": "GBP"
                        }
                    }),
                    {
                        "name": `Next Level Comission`,
                        "description": `Next Level Comission of 2£ per session`,
                        "quantity": "1",
                        "price": sessions.reduce((total) => {
                            return total = total + GlobalContants.BOOKING_COMISSION
                        }, 0),
                        "tax": "0",
                        "sku": "1",
                        "currency": "GBP"
                    }
                ],
            }
        }],
        "note_to_payer": "Contact us for any questions on your order.",
        "redirect_urls": {
            "return_url": "https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_success.html",
            "cancel_url": "https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_failure.html",
        }
    }
};