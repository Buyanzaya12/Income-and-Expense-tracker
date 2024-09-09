const { v4: uuidv4 } = require("uuid");
const { sql } = require("../configs/database");

async function createTransaction({ name, icon, color }) {
  {
    const id = uuidv4();
    await sql`insert into transaction(id, name, icon, color) values (${id}, ${name}, ${icon}, ${color})`;
    return id;
  }
}

module.exports = {
  createTransaction,
};
