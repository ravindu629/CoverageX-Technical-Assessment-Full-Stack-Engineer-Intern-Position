const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Management API is running!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
