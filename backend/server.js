const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

const teacherRoutes = require("./routes/teachers");
const studentRoutes = require("./routes/students");  // 👈 ADD THIS
const attendanceRoutes = require("./routes/attendance");

app.use("/teachers", teacherRoutes);
app.use("/students", studentRoutes);    
app.use("/attendance", attendanceRoutes);             // 👈 ADD THIS


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});