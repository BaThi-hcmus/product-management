const home_route = require("./home-route.js")
const product_route = require("./product-route.js")

module.exports = (app) => {
    app.use("/", home_route)

    app.use("/products", product_route)
}