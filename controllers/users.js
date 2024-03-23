const fs = require("fs")

const users = require("../db/users.json")

const handleSignUp = (req, res) => {
  const { user_id, first_name, last_name } = req.body
  const trimmedUserId = user_id.trim()

  if (!trimmedUserId.length)
    return res.status(400).json({ error: "User ID can not be empty." })

  if (users[trimmedUserId.toLowerCase()]) {
    return res.status(400).json({ error: "User ID already exists" })
  }

  const lowerCasedUserId = trimmedUserId.toLowerCase()
  users[lowerCasedUserId] = {
    first_name: first_name ? first_name.trim() : "",
    last_name: last_name ? last_name.trim() : ""
  }

  try {
    fs.writeFileSync("./db/users.json", JSON.stringify(users))
    return res.status(201).json({ message: "User Created and Logged In" })
  } catch (err) {
    return res.status(500).json({ error: err })
  }
}

const handleLogin = (req, res) => {
  const { user_id } = req.body
  const user = users[user_id]
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" })
  }

  res.status(200).json({ message: "Login successful" })
}

module.exports = {
  handleSignUp,
  handleLogin
}
