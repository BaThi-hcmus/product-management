const product_controller = require("../../controllers/admin/product-controller.js")
const multer  = require('multer');
const express = require("express")
//const storage = require("../../helper/multer.js")
//const upload = multer({ storage: storage() })
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({ 
  cloud_name: 'dpll1onh7', 
  api_key: '447859212893887', 
  api_secret: '447859212893887'
});

const upload = multer()

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
//     function (req, res, next) {
//     let streamUpload = (req) => {
//         return new Promise((resolve, reject) => {
//             let stream = cloudinary.uploader.upload_stream(
//               (error, result) => {
//                 if (result) {
//                   resolve(result);
//                 } else {
//                   reject(error);
//                 }
//               }
//             );

//           streamifier.createReadStream(req.file.buffer).pipe(stream);
//         });
//     };

//     async function upload(req) {
//         let result = await streamUpload(req);
//         console.log(result);
//     }

//     upload(req);
// },
    function (req, res, next) {
    let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
            let stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (result) {
                  resolve(result);
                } else {
                  reject(error);
                }
              }
            );

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
    };

    async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
    }

    upload(req);
},
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