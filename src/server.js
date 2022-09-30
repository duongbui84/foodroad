const express = require("express");
var cors = require("cors");

import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connectDB from "./config/connecttoDB";

require("dotenv").config();

let app = express();

//config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server started on port ${port}`));
