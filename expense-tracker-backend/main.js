const { app } = require("./configs/basic");
const { sql } = require("./configs/database");

const {
  getCategories,
  createCategory,
  updateOneCategory,
  deleteOneCategory,
} = require("./services/categoryService");

app.get("/categories", async (req, res) => {
  const list = await getCategories();
  res.json(list);
});
app.post("/categories", async (req, res) => {
  const { name } = req.body;
  const id = await createCategory({ name });
  res.status(201).json({ id });
});

app.get("/dbtest", async (req, res) => {
  const result = await sql`select version()`;
  console.log(result);
  res.json({ result });
});

app.put("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "`Name` field is required" });
    return;
  }

  await updateCategory(id, { name });
  res.sendStatus(204);
});

app.delete("/categories/:id", async (req, res) => {
  const { id } = req.params;
  const deleteIndex = categories.findIndex((cat) => cat.id === id);

  if (deleteIndex < 0) {
    res.sendStatus(404);
    return;
  }
  await deleteOneCategory(id);
  res.sendStatus(204);
});
