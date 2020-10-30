import GlobalContants from "../../constants/GlobalContants";

export const GET_PAYPAL_JSON = () => {
    return {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "transactions": [{
            "amount": {
                "total": GlobalContants.FEATURED_PRICE.toString(),
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
                    {
                        "name": `Next Level Featured`,
                        "description": `Be featured on our app`,
                        "quantity": "1",
                        "price": GlobalContants.FEATURED_PRICE.toString(),
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