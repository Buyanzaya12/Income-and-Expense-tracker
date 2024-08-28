
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');


async function createNewCategory(form) {
    const id = uuidv4();
    form.id = id;
    categories.push(form);
    fs.writeFileSync("data/categories.json", JSON.stringify(categories));
    return id;
}

function getCategories() {
    const content = fs.readFileSync("data/categories.json", "utf-8");
    const categories = JSON.parse(content);
    return categories;
}
function getOneCategory(id) { }
function updateCategory(id, update) { }
function deleteCategory(id) { }


module.exports = {
    createNewCategory,
    getCategories,
    getOneCategory,
    updateCategory,
    deleteCategory,
}