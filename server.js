const express = require("express")
const cors = require("cors")

const sportEventsRoute = require("./routes/sportEvents")
const userRoute = require("./routes/users")

const port = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(express.json())

app.get("/ping", (req, res) => {
  res.send("<h1>pong</h1>")
})
app.use("", sportEventsRoute)
app.use("", userRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
