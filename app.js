require('dotenv').config();
const express = require('express');
// const mysql = require('mysql2');
// const db = require('./config/db.js')
// const blogRouter = require("./routes/blog-routes.js");
// const userRouter = require("./routes/user-routes.js");

// dotenv.config({path: './.env'});
const app = express();

app.use(express.json());
// app.use("/api/user", userRouter);
// app.use("/api/blog",blogRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`Sever Running on PORT ${PORT}`));

// db.connect((err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("MySQL Connected");
//     }
// })

// app.listen(4000, () => {
//     console.log("Server Started on port 4000");
// })