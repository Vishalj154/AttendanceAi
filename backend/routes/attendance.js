const express = require("express");
const router = express.Router();
const db = require("../db");

// subjects & labs
const subjects = ["OS", "CN", "AOA", "IOT", "Python"];
const labs = ["OS Lab", "CN Lab", "AOA Lab", "Python Lab"];

// shuffle
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

// 👉 GET TODAY SCHEDULE
router.get("/today", (req, res) => {

  const today = new Date().toISOString().split("T")[0];

  // check if schedule already exists
  db.query("SELECT * FROM schedule WHERE date = ?", [today], (err, result) => {

    if (result.length > 0) {
      // already generated → return same
      return res.json({
        schedule: JSON.parse(result[0].subjects)
      });
    }

    // else generate new
    let todaySchedule = [];
    const isLabDay = Math.random() > 0.5;

    if (isLabDay) {
      const lab = shuffle(labs)[0];
      const selectedSubjects = shuffle(subjects).slice(0, 4);
      todaySchedule = [lab, ...selectedSubjects];
    } else {
      todaySchedule = shuffle(subjects).slice(0, 5);
    }

    // save in DB
    db.query(
      "INSERT INTO schedule (date, subjects) VALUES (?, ?)",
      [today, JSON.stringify(todaySchedule)],
      (err2) => {
        if (err2) return res.send(err2);

        res.json({
          schedule: todaySchedule
        });
      }
    );

  });

});


// 👉 SAVE ATTENDANCE
router.post("/save", (req, res) => {

  const { student_id, attendance } = req.body;

  let queries = [];

  for (let subject in attendance) {
    for (let day in attendance[subject]) {

      const status = attendance[subject][day];
      const date = `2026-04-${String(day).padStart(2,'0')}`;

      const sql = `
        INSERT INTO attendance (student_id, subject, date, status)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE status=?
      `;

      queries.push(
        new Promise((resolve, reject) => {
          db.query(sql,
            [student_id, subject, date, status, status],
            (err) => err ? reject(err) : resolve()
          );
        })
      );
    }
  }

  Promise.all(queries)
    .then(() => res.send("Saved"))
    .catch(err => res.send(err));
});


// 👉 GET ATTENDANCE
router.get("/:student_id", (req, res) => {

  const student_id = req.params.student_id;

  db.query(
    "SELECT * FROM attendance WHERE student_id = ?",
    [student_id],
    (err, result) => {
      if (err) return res.send(err);
      res.json(result);
    }
  );
});

// GET REPORT
router.get("/report/:student_id", (req, res) => {

  const student_id = req.params.student_id;

  const sql = `
    SELECT subject,
    COUNT(*) as total,
    SUM(status) as present
    FROM attendance
    WHERE student_id = ?
    GROUP BY subject
  `;

  db.query(sql, [student_id], (err, result) => {
    if (err) return res.send(err);

    let report = {};
    let overallTotal = 0;
    let overallPresent = 0;

    result.forEach(row => {
      const percent = ((row.present / row.total) * 100).toFixed(1);

      report[row.subject] = {
        total: row.total,
        present: row.present,
        percent: percent
      };

      overallTotal += row.total;
      overallPresent += row.present;
    });

    const overallPercent = overallTotal > 0
      ? ((overallPresent / overallTotal) * 100).toFixed(1)
      : 0;

    res.json({
      subjects: report,
      overall: overallPercent
    });
  });
});

module.exports = router;