const { app } = require("./configs/basic");
const { sql } = require("./configs/database");

const {
  getCategories,
  createCategory,
  updateOneCategory,
  deleteOneCategory,
} = require("./services/categoryService");
const { createTransaction } = require("./services/transactionService");

app.get("/categories", async (req, res) => {
  const list = await getCategories();
  res.json(list);
});
app.post("/categories", async (req, res) => {
  const input = req.body;
  const id = await createCategory(input);
  if (id) {
    res.status(201).json({ id });
  } else {
    res.sendStatus(400);
  }
});

app.get("/dbtest", async (req, res) => {
  const result = await sql`select version()`;
  console.log(result);
  res.json({ result });
});

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const input = req.body;
  // if (!name) {
  //   res.status(400).json({ message: "`Name` field is required" });
  //   return;
  // }
  await updateOneCategory(id, input);
  res.sendStatus(204);
});

app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  await deleteOneCategory(id);
  res.sendStatus(204);
});
app.post("/transactions", async (req, res) => {
  const input = req.body;
  const id = await createTransaction(input);
  if (id) {
    res.status(201).json({ id });
  } else {
    res.sendStatus(400);
  }
});
app.get("/transactions", async (req, res) => {
  const list = await getTransactions(req.query);
  res.json(list);
});