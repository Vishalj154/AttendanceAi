const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const teacherRoutes = require("./routes/teachers");
const studentRoutes = require("./routes/students");  // 👈 ADD THIS

app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);                 // 👈 ADD THIS

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});