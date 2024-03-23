const express = require("express")
const fs = require("fs")

const eventsFilePath = "./db/sportEvents.json"

const router = express.Router()

// Endpoint to get list of sports events
router.get("/events", (req, res) => {
  const events = JSON.parse(fs.readFileSync(eventsFilePath))
  res.status(200).json(events)
})

// Endpoint to get list of registered events by a user
router.get("/users/:userId/events", (req, res) => {
  const userId = req.params.userId
})

// Endpoint to register/unregister for an event
router.post("/users/:userId/events/:eventId", (req, res) => {
  const userId = req.params.userId
  const eventId = req.params.eventId
  const action = req.body.action // 'register' or 'unregister'
})

module.exports = router
