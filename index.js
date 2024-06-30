const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes/index.js");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = 3000;

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
