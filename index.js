
const express = require("express");
const cors = require("cors");
require("./db/mongoose");
const bodyParser = require("body-parser");
const userRouter = require("./routes/user");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(userRouter);
const port = 4005;

app.listen(port, () => {
    console.log("Server is up and running on port " + port);
});
