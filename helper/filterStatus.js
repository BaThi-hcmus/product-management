module.exports= (query) => {
    let filterStatus = [
        {
            name : "Tấc cả",
            status : "",
            class : "on"
        },
        {
            name : "Hoạt động",
            status : "active",
            class : ""
        },
        {
            name : "Dừng hoạt động",
            status : "inactive",
            class : ""
        }
    ]

    if (query.status) {
        filterStatus.forEach((item) => {item.class = ""});

        const index = filterStatus.findIndex(item => item.status == query.status);
        filterStatus[index].class = "on";
    } else {
        filterStatus.forEach(item => item.class = "");

        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "on";
    }

    return filterStatus;
}