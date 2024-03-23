const express = require("express")
const {
  fetchAllEvents,
  fetchRegisteredEventsOfUser,
  handleUserActionForEvent
} = require("../controllers/sportsEvents")

const router = express.Router()

router.get("/events", fetchAllEvents)
router.get("/events/:userId", fetchRegisteredEventsOfUser)
router.post("/events/:userId/:eventId", handleUserActionForEvent)

module.exports = router
