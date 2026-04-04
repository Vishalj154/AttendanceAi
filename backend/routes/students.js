const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all students
router.get("/", (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});
// add student API
router.post("/add", (req, res) => {
  const { name, email, password, department, year, roll_number } = req.body;

  const sql = "INSERT INTO students (name, email, password, department, year, roll_number) VALUES (?, ?, ?, ?, ?, ?)";

  db.query(sql, [name, email, password, department, year, roll_number], (err, result) => {
    if (err) return res.send(err);
    res.send("Student added");
  });
});
// delete student APi
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM students WHERE id = ?", [req.params.id], (err, result) => {
    if (err) return res.send(err);
    res.send("Student deleted");
  });
});

// LOGIN API
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM students WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (err) return res.send(err);

      if (result.length > 0) {
        res.json({
          success: true,
          student: result[0]
        });
      } else {
        res.json({ success: false });
      }
    }
  );
});

module.exports = router;