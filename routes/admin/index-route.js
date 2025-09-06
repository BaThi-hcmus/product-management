const dashboard_route = require("./dashboard-route.js")
const product_route = require("./product-route.js")

module.exports = (app) => {
    app.use("/admin/dashboard", dashboard_route)

    app.use("/admin/products", product_route)
}