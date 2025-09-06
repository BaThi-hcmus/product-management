const Product = require("../../models/product-model.js")
//[GET] /products
module.exports.index = async (req, res) => {
    const list_product = await Product
    .find({
        deleted: false
    })
    .sort({posotion : "ascending"})
    // console.log(list_product)


    res.render("client/pages/products/index.pug",{
        pageTitle: "Trang sản phẩm",
        products : list_product
    } )
}
//[GET] /products/detail/:id
module.exports.detail = async (req, res) => {
    let slug = req.params.slug;
    let queryCondition = {
        deleted : false,
        status : "active",
        slug : slug
    }
    let product = await Product.findOne(queryCondition);
    //console.log(product);
    res.render("client/pages/products/detail.pug", {
        pageTitle : product.title,
        product : product 
    })
}