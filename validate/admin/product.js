module.exports.createPost = (req, res, next) => {
    if (!req.body.title) {
        req.flash("error", "Bạn chưa nhập tiêu đề cho sản phẩm")
        res.redirect(req.get("referer"));
        return;
    }

    if (req.body.title.length < 4) {
        req.flash("error", "Vui lòng nhập tên sản phẩm có số kí tự lớn hơn 4");
        res.redirect(req.get("referer"));
        return;
    }

    next();
}