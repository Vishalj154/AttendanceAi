const express = require("express");
const router = express.Router();
const db = require("../db");

// GET classes for teacher
router.get("/", (req, res) => {
    console.log("Classes API HIT"); // 👈 add this
    const teacher_id = req.query.teacher_id;

    db.query(
        "SELECT * FROM classes WHERE teacher_id = ?",
        [teacher_id],
        (err, result) => {
            if (err) return res.send(err);
            res.json(result);
        }
    );
});

module.exports = router;