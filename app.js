const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;

const messages = require("./messages.json");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.render("index", { messages }));

app.get("/new", (req, res) => res.render("new"));

app.post("/new", (req, res) => {
  const { user, text } = req.body;

  if (!user || !text) {
    return res.status(400).send("Both name and message are required.");
  }

  const newMessage = {
    user,
    text,
    added: new Date(),
  };

  messages.push(newMessage);

  fs.writeFileSync(
    "./messages.json",
    JSON.stringify(messages, null, 2),
    "utf-8"
  );

  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
