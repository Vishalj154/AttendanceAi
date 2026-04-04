const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all teachers
router.get("/", (req, res) => {
  db.query("SELECT * FROM teachers", (err, result) => {
    if (err) return res.send(err);

    // Pretty JSON (formatted)
    res.setHeader("Content-Type", "application/json");
    res.send(JSON.stringify(result, null, 2));
  });
});


// ADD teacher
router.post("/", (req, res) => {
  const { name, subject, email, phone, password } = req.body;

  const sql = "INSERT INTO teachers (name, subject, email, phone, password) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [name, subject, email, phone, password], (err) => {
    if (err) return res.send(err);
    res.send("Teacher added");
  });
});

// DELETE teacher
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM teachers WHERE id=?", [req.params.id], () => {
    res.send("Deleted");
  });
});

// RESET password
router.put("/reset/:id", (req, res) => {
  db.query("UPDATE teachers SET password='1234' WHERE id=?", [req.params.id], () => {
    res.send("Reset done");
  });
});
router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql = "SELECT * FROM teachers WHERE email=? AND password=?";

  db.query(sql, [email, password], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ error: err });
    }

    if (result.length > 0) {
      res.json({
        success: true,
        user: result[0]
      });
    } else {
      res.json({
        success: false
      });
    }

  });
});

module.exports = router;