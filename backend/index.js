const cors = require("cors");
const express = require("express");

const productLists = require("./products");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Testing Home route");
});

app.get("/products", (req, res) => {
  res.send(productLists);
});

const port = process.env.PORT || 8000;

app.listen(port, console.log(`Server is listening on Port: ${port}`));
