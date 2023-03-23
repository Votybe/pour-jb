const express = require("express");
const app = express();
const port = 3300;
const cors = require("cors");

const connectDB = require("./config/auth");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const userRouter = require("./routers/user.routes");

connectDB();

// Use the router
app.use("/user", userRouter);

app.listen(port, () => console.log(`l'app run sur le port ${port}`));
