const dashboard_controller = require("../../controllers/admin/dashboard-controller.js")

const express = require("express")
const routes = express.Router()

routes.get("/", dashboard_controller)

module.exports = routes