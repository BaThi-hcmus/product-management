const Product = require("../../models/product-model.js")
const filter = require("../../helper/filterStatus.js")
const search = require("../../helper/search.js")
const pagination = require("../../helper/pagination.js")
// const product_validate = require("../../validate/admin/product.js")

//[GET] /admin/products
module.exports.index = async (req, res) => {
    let filterStatus = filter(req.query);

    let queryCondition = {
        deleted: false
    }
    //search
    let objectSearch = search(req.query);//value, regex
    if (objectSearch.regex) {
        queryCondition.title = objectSearch.regex;
    }
    //filter
    if (req.query.status){
        queryCondition.status = req.query.status
    }
    //pagination:phần tử mỗi trang, bỏ qua bao nhiêu phần tử, trang hiện tại và tổng số sản phẩm
    const countProducts = await Product.countDocuments(queryCondition);
    let objectPagination = pagination(
        {
            limitItems : 4,
            currentPage : 1,
        },
        req.query,
        countProducts
    );
    //hàm limit: số bản ghi cần lấy
    //hàm skip : số bản ghi muốn bỏ qua tính từ bản ghi thứ nhất
    let list_product = await Product
        .find(queryCondition)
        .sort({position : "ascending"})
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip)

    res.render("admin/pages/products/index.pug", {
        pageTitle : "Trang danh sách sản phẩm",
        products : list_product,
        filterStatus : filterStatus,
        keyword : objectSearch.value,
        pagination : objectPagination,
    })
}

//[PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    req.flash('succeed', 'Cập nhật trạng thái thành công');

    const status = req.params.status;
    const id = req.params.id;

    await Product.updateOne({_id : id}, { status : status});

    res.redirect(req.get("referer"));
}

//[PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
    let statusProduct = req.body.status ;
    let list_id = req.body.ids.split(",");
    let positions = req.body.positions.split(",");
    if (list_id.length > 0) {
        // console.log(positions);
        // console.log(list_id);
        // console.log(statusProduct);

        switch(statusProduct){
            case "active" :
                req.flash('succeed', `Cập nhật trạng thái của ${list_id.length} sản phẩm thành công`);
                await Product.updateMany(
                    {_id : {$in : list_id}},
                    {$set : {status : "active"}}
                )
                break;
            case "inactive" :
                req.flash('succeed', `Cập nhật trạng thái của ${list_id.length} sản phẩm thành công`);
                await Product.updateMany(
                    {_id : {$in : list_id}},
                    {$set : {status : "inactive"}}
                )
                break;
            case "deleted" :
                req.flash('succeed', `Xóa ${list_id.length} sản phẩm thành công`);
                await Product.updateMany(
                    {_id : {$in : list_id}},
                    {
                        deleted : true,
                        deletedAt : new Date()
                    }
                )
                break;
            case "position" : 
                req.flash('succeed', `Cập nhật vị trí của ${list_id.length} sản phẩm thành công`);
                for (let i = 0; i < list_id.length; i++) {
                    await Product.updateOne(
                        {_id : list_id[i]},
                        {position : parseInt(positions[i])}
                    )
                }
                break;
            default :
                break;
        }
    }
    res.redirect(req.get("referer"));
}
//[PATCH] /admin/products/delete/id
module.exports.deleteProduct = async (req, res) => {
    let id = req.params.id;
    console.log(id);    
    //xóa cứng
    // await Product.deleteOne({_id: id});
    req.flash('succeed', `Xóa sản phẩm thành công`);
    //xóa mềm
    await Product.updateOne(
        {_id : id},
        {deleted : true},
        {deletedAt : new Date()}
    )
    res.redirect(req.get("referer"));
}
//[GET] /admin/products/create
module.exports.create = (req, res) => {
    res.render("admin/pages/products/create.pug",{
        titlePage : "Trang tạo mới sản phẩm"
    })
}
//[POST] /admin/products/create
module.exports.createPost = async (req, res) => {
    // product_validate.createPost(req, res);
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position === ""){
        const count = await Product.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    
    // if (req.file) {
    //     req.body.thumbnail = `/admin/uploads/${req.file.filename}`
    // }

    let newProduct = new Product(req.body);
    await newProduct.save();

    res.redirect("/admin/products");
}

//[GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {
    let id = req.params.id;
    let product = await Product.findById(id);
    res.render("admin/pages/products/edit.pug", {
        titlePage : "Trang chỉnh sửa sản phẩm",
        product : product
    })
}

//[PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);
    
    if (req.file) {
        req.body.thumbnail = `/admin/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne(
            {_id : req.params.id},
            req.body
        )
        req.flash("succeed", "cập nhật thành công")
    } catch (error) {
        req.flash("error", "cập nhật thất bại")
    }
    res.redirect(req.get("referer"));
}

//[GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    let id = req.params.id;
    let product = await Product.findById(id);
    res.render("admin/pages/products/detail.pug", {
        pageTitle : product.title,
        product : product 
    })
}

