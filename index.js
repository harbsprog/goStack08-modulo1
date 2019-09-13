const express = require("express");

const server = express();
server.use(express.json());

const users = ["Diego", "Claúdio", "Victor"];

//User Create
server.post("/userCreate", (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json({ message: `User ${name} has ben successfully created.` });
});

//User Update
server.put("/userUpdate/:index", (req, res) => {
  const { name } = req.body;
  const { index } = req.params;

  users[index] = name;

  return res.json({ message: `User ${name} has ben successfully updated.` });
});

//User Delete
server.delete("/userDelete/:index", (req, res) => {
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
server.get("/test/arr/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
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
