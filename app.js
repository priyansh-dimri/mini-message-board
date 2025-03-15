const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

const messages = require("./messages.json");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.render("index", { messages }));

app.get("/new", (req, res) => res.render("new"));

// TODO: Add POST route to add a new message

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
