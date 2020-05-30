const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const todoList = [];

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.post("/todolist", (req, res) => {
  todoList.push({ ...req.body, id: uuidv4() });
  res.send(todoList);
});

app.delete("/todolist", (req, res) => {
  const index = todoList.findIndex((todo) => todo.id === req.body.id);
  todoList.splice(index, 1);
  res.send(todoList);
});

app.patch("/todolist", (req, res) => {
  const index = todoList.findIndex((todo) => todo.id === req.body.id);
  todoList.splice(index, 1, req.body);
  res.send(todoList);
});

app.get("", (req, res) => {
  res.send("Hello Express");
});

app.get("/todolist", (req, res) => {
  res.send(todoList);
});

app.listen(3001, () => {
  console.log("Server is up on port 3001.");
});
