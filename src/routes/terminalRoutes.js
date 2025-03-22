import express from "express"
import terminalController from "../controllers/terminalController.js"

const router = express.Router()

router.get("/connection_token", terminalController.getConnectionToken)
router.post("/create_payment_intent", terminalController.createPaymentIntent)
router.post(
  "/capture_payment_intent/:paymentIntentId",
  terminalController.capturePaymentIntent
)

export default router
