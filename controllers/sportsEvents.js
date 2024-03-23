const fs = require("fs")

const fetchAllEvents = (req, res) => {
  try {
    const events = require("../db/sportEvents.json")
    res.status(200).json(events)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const fetchRegisteredEventsOfUser = (req, res) => {
  try {
    const user_id = req.params.userId
    const users = require("../db/users.json")
    const sportEvents = require("../db/sportEvents.json")
    const user = users[user_id]

    if (!user) return res.status(404).json({ error: "User not found" })

    const user_registered_events_ids = user.registered_events ?? []
    const user_registered_events = sportEvents.filter((sportEvent) =>
      user_registered_events_ids.includes(sportEvent.id)
    )

    return res.status(200).json(user_registered_events)
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const handleUserActionForEvent = (req, res) => {
  try {
    const user_id = req.params.userId
    const event_id = isNaN(req.params.eventId)
      ? req.params.eventId
      : JSON.parse(req.params.eventId)

    const action = req.body.action // 'register' or 'unregister'

    const users = require("../db/users.json")
    const user = users[user_id]
    if (!user) return res.status(404).json({ error: "User not found" })
    if (!user.registered_events) user.registered_events = []

    const sportEvents = require("../db/sportEvents.json")
    const event = sportEvents.find((event) => event.id === event_id)
    if (!event) return res.status(404).json({ error: "Event not found" })

    if (action === "register") {
      if (user.registered_events.includes(event_id)) {
        return res
          .status(400)
          .json({ error: "User already registered for event." })
      }

      user.registered_events.push(event_id)
      fs.writeFileSync("./db/users.json", JSON.stringify(users))

      return res
        .status(200)
        .json({ message: "User successfully registered for the event" })
    } else if (action === "unregister") {
      if (!user.registered_events.includes(event_id))
        return res
          .status(400)
          .json({ error: "User is not registered for this event." })

      user.registered_events = user.registered_events.filter(
        (event) => event !== event_id
      )
      fs.writeFileSync("./db/users.json", JSON.stringify(users))

      return res
        .status(200)
        .json({ message: "User successfully unregistered from the event" })
    } else {
      return res.status(404).json({ error: "Unidentified Action" })
    }
  } catch (error) {
    return res.status(500).json({ error })
  }
}

module.exports = {
  fetchAllEvents,
  fetchRegisteredEventsOfUser,
  handleUserActionForEvent
}
