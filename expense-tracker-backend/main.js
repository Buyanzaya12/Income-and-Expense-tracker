const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const { startApp } = require("./configs/basic");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const content = fs.readFileSync("data/categories.json", "utf-8");

let categories = JSON.parse(content);

async function createNewCategory(form) {
  const id = uuidv4();
  form.id = id;
  categories.push(form);
  fs.writeFileSync("data/categories.json", JSON.stringify(categories));
  return id;
}
app.get("/categories", (req, res) => {
  res.json(categories);
});
app.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const category = categories.find(cat.id === id);
  res.json(category); 
});

app.post("/categories", async (req, res) => {
  const { name } = req.body;
  const id = await createNewCategory({ name });
  res.status(201).json({ id });
});
app.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: "`Name` field is required" });
    return;
  }

  const index = categories.findIndex((cat) => cat.id === id);
  categories[index].name = name;
  fs.writeFileSync("categories.json", JSON.stringigy(categories));
  res.json(["Success"]);
});

app.delete("/categories/:id", (req, res) => {
  const { id } = req.params;
  const deleteIndex = categories.findIndex((cat) => cat.id === id);

  if (deleteIndex < 0) {
    res.sendStatus(404);
    return;
  }
  categories = categories.filter((cat) => cat.id !== id);
  fs.writeFileSync("categories.json", JSON.stringify(categories));
  res.sendStatus(204);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// const { app } = require("./configs/basic");
// const { sql } = require("./configs/database");

// const { getCategories, createCategory } = require("./services/categoryService");

// app.get("/categories", async (req, res) => {
//   const list = await getCategories();
//   res.json(list);
// });

// app.post("/categories", async (req, res) => {
//   const input = req.body;
//   const id = await createCategory(input);
//   res.status(201).json({ id });
// });

// app.get("/dbtest", async (req, res) => {
//   const result = await sql`select version()`;
//   console.log(result);
//   res.json({ result });
// });
// app.put("/categories/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name } = req.body;

//   if (!name) {
//     res.status(400).json({ message: "`Name` field is required" });
//     return;
//   }

//   await updateCategory(id, { name });
//   res.sendStatus(204);
// });

// app.delete("/categories/:id", async (req, res) => {
//   const { id } = req.params;
//   const deleteIndex = categories.findIndex((cat) => cat.id === id);
//   if (deleteIndex < 0) {
//     res.sendStatus(404);
//     return;
//   }

//   await deleteCategory(id);
//   res.sendStatus(204);
// });