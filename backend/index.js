const express = require("express");
const config = require("./db.config");

const db = require("knex")({
  client: "mysql2",
  connection: {
    host: config.HOST,
    port: config.PORT,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE,
  },
});

const cors = require("cors");
const app = express();

const port = 4001;
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.send("ca marche");
});

app.get("/todos", async (req, res) => {
  try {
    const results = await db.select("*").from("todos");
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/todos", async (req, res) => {
  const todo = { name: req.body.name, description: req.body.description };
  try {
    const [id] = await db("todos").insert(todo);
    res.json({ id, ...todo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const deleteTodo = await db("todos").where("id", req.params.id).del();
    res.json({ message: "delete the todo", deleteTodo });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
