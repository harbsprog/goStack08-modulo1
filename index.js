const express = require("express");

const server = express();
server.use(express.json());

const users = ["Diego", "Claúdio", "Victor"];

//Middleware
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método: ${req.method} | URL : ${req.url}`);

  next();

  console.timeEnd("Request");
});

//Chek if the User Exists
function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "User name is required." });
  }

  next();
}

//Chek if the array index Exists
function checkUserInArray(req, res, next) {
  const { index } = req.params;
  const user = users[index];

  if (!user) {
    return res.status(400).json({ error: "User does not exists." });
  }

  req.user = user;

  next();
}

//User Create
server.post("/userCreate", checkUserExists, (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json({ message: `User ${name} has ben successfully created.` });
});

//User Update
server.put(
  "/userUpdate/:index",
  checkUserInArray,
  checkUserExists,
  (req, res) => {
    const { name } = req.body;
    const { index } = req.params;

    users[index] = name;

    return res.json({ message: `User ${name} has ben successfully updated.` });
  }
);

//User Delete
server.delete("/userDelete/:index", checkUserInArray, (req, res) => {
  const { index } = req.params;
  const userName = users[index];

  users.splice(index, 1);

  return res.json({
    message: `User ${userName} has ben successfully deleted.`
  });
});

//Users List
server.get("/users", (req, res) => {
  return res.json(users);
});

//User array index List
server.get("/test/arr/:index", checkUserInArray, (req, res) => {
  return res.json(req.user);
});

//Route Param
server.get("/test/:id", (req, res) => {
  return res.json({ message: `Searching, ${req.params.id}.` });
});

//Query Param
server.get("/test/", (req, res) => {
  return res.json({ message: `Hello, ${req.query.nome}.` });
});

server.listen(3000);
