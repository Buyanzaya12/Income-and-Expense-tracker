const { v4: uuidv4 } = require("uuid");
const { sql } = require("../configs/database");

async function createTransaction() {
  const input = {
    id: uuidv4,
    amount: 10000,
    type: "EXPENSE",
    payee: "Sarnai",
    categoryId: "hhe",
  };

  await sql`insert into transaction ${sql(input, Object.keys(input))}`;

  return "";
}

async function getTransactions({ type, categoryId, before }) {
  let query = sql`select * from transaction where true`;

  if (type) {
    query = `${query} and type=${type}`;
  }
  if (categoryId) {
    query = `${query} and categoryId=${categoryId}`;
  }
  if (before) {
    query = `${query} and date>${before}`;
  }

  const list = await query;
  return list;
}

module.exports = {
  createTransaction,
};
