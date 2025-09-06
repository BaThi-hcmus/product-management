module.exports = (query) => {
    let objectSearch = {
        value : "",
    }
    if (query.keyword) {
        objectSearch.value = query.keyword;
        let regex = new RegExp(objectSearch.value, "i");
        objectSearch.regex = regex;
    }
    return objectSearch;
}