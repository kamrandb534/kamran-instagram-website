const express = require("express");

module.exports = (db) => {
  const router = express.Router();

  router.post("/comment", (req, res) => {
    const { user_id, media_id, content } = req.body;
    const query = "INSERT INTO comments (user_id, media_id, content) VALUES (?, ?, ?)";
    db.query(query, [user_id, media_id, content], (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to comment", error: err });
      res.json({ message: "Comment added" });
    });
  });

  router.post("/rating", (req, res) => {
    const { user_id, media_id, rating } = req.body;
    const query = `INSERT INTO ratings (user_id, media_id, rating) VALUES (?, ?, ?)`;
    db.query(query, [user_id, media_id, rating], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Failed to rate", error: err });
      }
      res.json({ message: "Rating submitted", rating_id: result.insertId });
    });
  });

  router.get("/comments/:media_id", (req, res) => {
    const mediaId = req.params.media_id;
    const query = `
      SELECT comments.*, users.name 
      FROM comments 
      JOIN users ON comments.user_id = users.id 
      WHERE media_id = ? 
      ORDER BY comments.created_at DESC
    `;
    db.query(query, [mediaId], (err, results) => {
      if (err) return res.status(500).json({ message: "Failed to fetch comments" });
      res.json(results);
    });
  });


  router.get("/rating/:media_id", (req, res) => {
    const mediaId = req.params.media_id;
    const query = "SELECT AVG(rating) as average_rating FROM ratings WHERE media_id = ?";
    db.query(query, [mediaId], (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to fetch rating" });
      res.json(result[0]);
    });
  });

  return router;
};
