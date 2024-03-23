const express = require("express")
const {
  fetchAllEvents,
  fetchRegisteredEventsOfUser,
  handleUserActionForEvent
} = require("../controllers/sportsEvents")

const router = express.Router()

router.get("/events", fetchAllEvents)
router.get("/user/:userId/events", fetchRegisteredEventsOfUser)
router.post("/user/:userId/events/:eventId", handleUserActionForEvent)

module.exports = router
