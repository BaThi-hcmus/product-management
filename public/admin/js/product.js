//console.log("Huỳnh Bá Thi");
let buttonChangeStatus = document.querySelectorAll(".btn-status")
//console.log(buttonChangeStatus);
if (buttonChangeStatus.length > 0) {
    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", (e) => {
            //e.preventDefault();

            let formChangeStatus = document.querySelector("#form-change-status");
            let path = formChangeStatus.getAttribute("path");

            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            
            const statusChange = currentStatus == "active" ? "inactive" : "active";
            
            let action = path + `/${statusChange}/${id}?_method=PATCH`;
            formChangeStatus.setAttribute("action", action);

            formChangeStatus.submit();
        })
    })
}
//check box
let buttonCheckItems = document.querySelectorAll(".check-item")
//console.log(buttonCheckItems);
let buttonCheckAll = document.querySelector("#check-all");

if (buttonCheckItems.length > 0) {
    buttonCheckAll.addEventListener("change", () => {
        let statusCheckAll = buttonCheckAll.checked;
        buttonCheckItems.forEach((button) => {
            button.checked = statusCheckAll;
        });
    });

    buttonCheckItems.forEach((button) => {
        button.addEventListener("click", () => {
            if (button.checked == false) {
                buttonCheckAll.checked = false;
            } else if ([...buttonCheckItems].every((item) => item.checked == true)) {
                buttonCheckAll.checked = true;
            }
        })
    })
}

let formApply = document.querySelector("#form-bulk-status");//lấy form
//console.log(formApply);
if (formApply) {
    formApply.addEventListener("submit", (e) => {
        e.preventDefault();
        let type = e.target.elements.status.value;
        
        if (type == "deleted"){
            const isConfirm = confirm("bạn có chắc là xóa sản phẩm này không");
            if (!isConfirm){
                return;
            }
        }
        if (type == "position") {
            let inputPosition = document.querySelector("[position-input]");
            let dataPosition = [...buttonCheckItems]
                .filter(item => item.checked)
                .map(item => {
                    let parent = item.parentNode.parentNode;
                    return parent.querySelector("[position-button]");
                })
                .map(item => item.value)
                .join(",");

            inputPosition.setAttribute("value", dataPosition);
        }


        let inputBox = document.querySelector(".input-data");//lấy thẻ input 
        let dataSubmit = [...buttonCheckItems]
            .filter(item => item.checked == true)
            .map(item => item.getAttribute("id"))
            .join(",");

        inputBox.setAttribute("value", dataSubmit);
        formApply.submit();
    })
}
// delete
let deleteButtons = document.querySelectorAll(".btn-delete");
let formDeleteProduct = document.querySelector("#form-delete-product")
if (deleteButtons.length > 0) {
    deleteButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.preventDefault();
            const isConfirm = confirm("bạn có chắc là xóa sản phẩm này không");
            if (isConfirm) {
                let id = button.getAttribute("id");
                let action = formDeleteProduct.getAttribute("path") + `/${id}?_method=DELETE`;
                formDeleteProduct.setAttribute("action", action);

                formDeleteProduct.submit();
            }
        })
    })
}

//show alert
let showAlert = document.querySelector(".message.info");
//console.log(showAlert);
if (showAlert) {
    const timeShow = parseInt(showAlert.getAttribute("time"));
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, timeShow)
}

//close alert
let closeAlert = document.querySelector("[close-alert]");
//console.log(closeAlert);
if (closeAlert) {
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    })
}

//upload image
let inputUploadImage = document.querySelector("#thumbnail");
let previewImage = document.querySelector("#upload-image");
let buttonRemovePreview = document.querySelector("#remove-preview");
if (inputUploadImage && previewImage && buttonRemovePreview) {
    inputUploadImage.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            previewImage.src = URL.createObjectURL(file);
            buttonRemovePreview.classList.remove("hidden-button");
        }
    })

    buttonRemovePreview.addEventListener("click", () => {
        previewImage.src = "";
        if (!buttonRemovePreview.classList.contains("hidden-button")) {
            buttonRemovePreview.classList.add("hidden-button")
            inputUploadImage.value = "";
        }
    })
}

