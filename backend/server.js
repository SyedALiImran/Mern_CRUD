const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./confiq/db");
const { errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./routes/userGoalRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`));
