const { v4: uuidv4 } = require("uuid");
const { sql } = require("../configs/database");

async function createCategory({ name, icon, color }) {
  if (name && icon && color) {
    const id = uuidv4();
    await sql`insert into category (id, name, icon, color) values (${id}, ${name}, ${icon}, ${color})`;
    return id;
  } else {
    return null;
  }
}
async function getCategories() {
  const list = await sql`select * from category order by name`;
  return list;
}
async function getOneCategory(id) {
  const list = await sql`select * from category where id = ${id}`;
  if (list.length) {
    return list[0];
  }
  return null;
}
async function deleteOneCategory(id) {
  await sql`delete from category where id = ${id}`;
}

async function updateOneCategory({ name, color, icon }) {
  await sql`update category set name = ${name}, color = ${color}, icon = ${icon} where id = ${id}`;
}

module.exports = {
  createCategory,
  getCategories,
  getOneCategory,
  updateOneCategory,
  deleteOneCategory,
};
