let buttons = document.querySelectorAll("[button-status]")

if (buttons.length > 0) {
    buttons.forEach((button) => {

        button.addEventListener("click", () => {
            //xử lí url
            let url = new URL(window.location.href)

            let status = button.getAttribute("button-status")
            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }

            window.location.href = url

        })
    })
}

let searchBox = document.querySelector(".search-box");
if (searchBox) {
    searchBox.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.elements.keyword.value;
        
        let url = new URL(window.location.href);

        if (value) {
            url.searchParams.set("keyword", value);
        } else {
            url.searchParams.delete("keyword");
        }

        window.location.href = url;
    })
}

//pagination
let buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination.length > 0) {
    buttonPagination.forEach((button) => {
        button.addEventListener("click" , () => {
            let buttonValue = button.getAttribute("button-pagination");

            let url = new URL(window.location.href);

            url.searchParams.set("page", buttonValue);

            window.location.href = url;
        })
    })
}

