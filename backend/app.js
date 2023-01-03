const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const ErrorHandle = require("./middleware/error");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");

//Route imports
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const cart = require("./routes/CartRoute");

const routes = [product, user, payment, order, cart];

app.use([
    cors(),
    express.json({ limit: "50mb" }),
    cookieParser(),
    bodyParser.urlencoded({ extended: true, limit: "50mb" }),
    express.urlencoded({ extended: true, limit: "50mb" }),
    fileUpload({ useTempFiles: true }),
]);
app.get("/", (req, res) => {
    res.send("SERVER ON");
});

app.use("/api/v2", routes);

app.use(ErrorHandle);

module.exports = app;