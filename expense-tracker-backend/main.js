
const { startApp } = require("./configs/basic");
const { getOneCategory, updateCategory } = require("./services/categoryService");
const app = startApp();


app.get("/categories", async (req, res) => {
  const categories = await getCategories();
  res.json(categories);
});

app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const one = getOneCategory(id);
  res.json(one);
});

app.post("/categories", async (req, res) => {
  const { name } = req.body;
  const id = await createNewCategory({ name });
  res.status(201).json({ id });
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

  await deleteCategory(id);
  res.sendStatus(204);
});