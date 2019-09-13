const express = require("express");

const server = express();

const users = ["Diego", "Claúdio", "Victor"];

server.get("/test/arr/:index", (req, res) => {
  const { index } = req.params;
  return res.json(users[index]);
});

server.get("/test/:id", (req, res) => {
  return res.json({ message: `Searching, ${req.params.id}` });
});

server.get("/test/", (req, res) => {
  return res.json({ message: `Hello, ${req.query.nome}` });
});

server.listen(3000);
