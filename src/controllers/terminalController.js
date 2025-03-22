import stripeService from "../services/stripeService.js"

class TerminalController {
  async getConnectionToken(req, res) {
    try {
      const connectionToken = await stripeService.createConnectionToken()
      res.json(connectionToken)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async createPaymentIntent(req, res) {
    try {
      const { amount } = req.body

      if (!amount || amount < 1) {
        return res.status(400).json({ error: "Valid amount is required" })
      }

      const paymentIntent = await stripeService.createPaymentIntent(amount)
      res.json(paymentIntent)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  async capturePaymentIntent(req, res) {
    try {
      const { paymentIntentId } = req.params

      if (!paymentIntentId) {
        return res.status(400).json({ error: "Payment intent ID is required" })
      }

      const capturedPayment = await stripeService.capturePaymentIntent(
        paymentIntentId
      )
      res.json(capturedPayment)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export default new TerminalController()
