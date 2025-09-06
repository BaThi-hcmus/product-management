const product_controller = require("../../controllers/admin/product-controller.js")
const multer  = require('multer');
const express = require("express")
const storage = require("../../helper/multer.js")
const upload = multer({ storage: storage() })
const routes = express.Router()
const product_validate = require("../../validate/admin/product.js")


routes.get("/", product_controller.index)

routes.patch("/change-status/:status/:id", product_controller.changeStatus)

routes.patch("/change-multi", product_controller.changeMulti)

routes.delete("/delete-product/:id", product_controller.deleteProduct)

routes.get("/create", product_controller.create)


routes.post(
    "/create",
    upload.single('thumbnail'),
    product_validate.createPost,
    product_controller.createPost)

routes.get("/edit/:id", product_controller.edit)

routes.patch(
    "/edit/:id", 
    upload.single('thumbnail'),
    product_validate.createPost,
    product_controller.editPatch)

routes.get("/detail/:id", product_controller.detail)

module.exports = routes;