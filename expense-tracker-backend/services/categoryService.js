const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { sql } = require("../configs/database");

async function createCategory({ name }) {
    const id = uuidv4();
    await sql`insert into category(id, name) values (${id}, ${name})`;
    return id;
}

async function getCategories() {
    const list = await sql`select * from category`;

    const content = fs.readFileSync("data/categories.json", "utf-8");
    // const categories = JSON.parse(content);
    return list;
}

module.exports = {
    createCategory,
    getCategories,
}