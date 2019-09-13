const express = require("express");

const server = express();

server.get("/test/:id", (req, res) => {
  return res.json({ message: `Searching, ${req.params.id}` });
});

server.get("/test/", (req, res) => {
  return res.json({ message: `Hello, ${req.query.nome}` });
});

server.listen(3000);
