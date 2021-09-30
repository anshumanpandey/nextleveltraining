import GlobalContants from "../../constants/GlobalContants";

export const GET_PAYPAL_JSON = () => ({
    "intent": "CAPTURE",
    "purchase_units": [{
        "amount": {
            "currency_code": "GBP",
            "value": GlobalContants.FEATURED_PRICE.toString(),
            "description": "Be featured on our app",
        }
    }],
    "application_context": {
        "return_url": "https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_success.html",
        "cancel_url": "https://mobileapi.nextlevelfootballtraining.co.uk/NextLevelTrainingApi/pages/payment_failure.html",
    }
});

