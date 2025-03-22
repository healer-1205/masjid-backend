import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import terminalRoutes from "./src/routes/terminalRoutes.js"

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/terminal", terminalRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Something went wrong!" })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
