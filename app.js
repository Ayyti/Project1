const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');

const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/userRouter");
const productsRouter = require("./routes/productRouter");

const db = require("./config/mongoose-connection");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up view engine
app.set('view engine', 'ejs');

app.use("/owner", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);


app.get("/", (req, res) => {
    res.send("hey");
});

app.listen(3000);