import stripe from "../config/stripe.js"

class StripeService {
  async createConnectionToken() {
    try {
      const connectionToken = await stripe.terminal.connectionTokens.create()
      return connectionToken
    } catch (error) {
      throw new Error(`Error creating connection token: ${error.message}`)
    }
  }

  async createPaymentIntent(amount, currency = "usd") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ["card_present"],
        capture_method: "manual",
      })
      return paymentIntent
    } catch (error) {
      throw new Error(`Error creating payment intent: ${error.message}`)
    }
  }

  async capturePaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.capture(paymentIntentId)
      return paymentIntent
    } catch (error) {
      throw new Error(`Error capturing payment intent: ${error.message}`)
    }
  }
}

export default new StripeService()
