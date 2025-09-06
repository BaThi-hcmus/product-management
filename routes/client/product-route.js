const product_controller = require("../../controllers/client/product-controller.js")

const express = require("express")
const route = express.Router()

route.get("/", product_controller.index)

route.get("/:slug", product_controller.detail)

module.exports = route