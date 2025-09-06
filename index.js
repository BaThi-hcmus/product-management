const express = require("express")
const flash = require('express-flash')
const cookieParser = require("cookie-parser")
const session = require("express-session")
const bodyParser = require('body-parser')
var methodOverride = require('method-override')
const app = express()
const routeClient = require(`${__dirname}/routes/client/index-route.js`)
const routeAdmin = require(`${__dirname}/routes/admin/index-route.js`)
const database = require(`${__dirname}/config/connect-database.js`)
require("dotenv").config()
const port = process.env.PORT

app.use(methodOverride('_method'))

app.set("views", `${__dirname}/views`)
app.set("view engine", "pug")

app.use(express.static(`${__dirname}/public`))
app.use(bodyParser.urlencoded())

app.use(cookieParser("JDESDJUEKJSKDJKXJEU"));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


database.connect()
routeAdmin(app)
routeClient(app)

app.listen(port, () => {
    console.log(`server đã được khởi động ở cổng ${port}`)
})