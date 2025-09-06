const home_controller = require("../../controllers/client/home-controller.js")

const express = require("express")
const route = express.Router()

route.get("/", home_controller)

module.exports = route