const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/authRoutes"));
app.use("/chat", require("./routes/chatRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
