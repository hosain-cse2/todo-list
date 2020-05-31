const express = require("express");
const { v4: uuidv4 } = require("uuid");
const app = express();

const todoList = [];
const sessions = [];

const credentials = [
  { userName: "alice", password: "Abcd@1234" },
  { userName: "bob", password: "Abcd@1234" },
  { userName: "clara", password: "Abcd@1234" },
  { userName: "john", password: "Abcd@1234" },
  { userName: "martin", password: "Abcd@1234" },
];

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

app.post("/login", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  console.log({ userName, password });

  const index = credentials.findIndex((credential) => {
    return credential.userName === userName && credential.password === password;
  });

  if (index > -1) {
    const searchedSession = sessions.find((session) => {
      return session.userName === userName;
    });

    if (searchedSession) {
      console.log("Already logged in...");
      res.status(200).send({ userName, sessionId: searchedSession.sessionId });
    } else {
      console.log("Login successfull...");
      const sessionId = uuidv4();
      sessions.push({ userName, sessionId, startTime: new Date() });
      res.status(200).send({ userName, sessionId });
    }
  } else {
    console.log("Wrong user name or password...");
    res.status(401).send("Wrong user name or password");
  }
});

app.post("/logout", (req, res) => {
  const currentSession = req.body.session;
  const index = sessions.findIndex((session) => {
    return (
      session.userName === currentSession.userName &&
      session.sessionId === currentSession.sessionId
    );
  });
  if (index > -1) {
    console.log("Logout successfull...");
    sessions.splice(index, 1);
    res.status(200).send("Successfully logged out");
  } else {
    console.log("Logout with warning...");
    res.status(440).send("Logout with warning...");
  }
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
