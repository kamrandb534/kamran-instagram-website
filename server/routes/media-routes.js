const express = require("express");

module.exports = (upload, db) => {
  const router = express.Router();


  router.post("/upload", upload.single("media"), (req, res) => {
    const { title, caption, location, creator_id } = req.body;
    const filePath = req.file ? `/uploads/${req.file.filename}` : null;

    if (!filePath) return res.status(400).json({ message: "No file uploaded" });
    if (!creator_id) return res.status(400).json({ message: "Creator ID is required" });

    const insert = `INSERT INTO media (creator_id, file_path, title, caption, location) VALUES (?, ?, ?, ?, ?)`;

    db.query(insert, [creator_id, filePath, title, caption, location], (err, result) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json({ message: "Uploaded", media_id: result.insertId });
    });
  });

  router.get("/all", (req, res) => {
    const { search = "", location = "", type = "" } = req.query;
  
    let baseQuery = "SELECT * FROM media WHERE 1=1";
    const params = [];
  
    if (search) {
      baseQuery += " AND (title LIKE ? OR caption LIKE ? OR location LIKE ?)";
      const wildcard = `%${search}%`;
      params.push(wildcard, wildcard, wildcard);
    }
  
    if (location) {
      baseQuery += " AND location = ?";
      params.push(location);
    }
  
    if (type === "image") {
      baseQuery += " AND file_path LIKE '%.jpg%' OR file_path LIKE '%.png%'";
    } else if (type === "video") {
      baseQuery += " AND file_path LIKE '%.mp4%'";
    }
  
    baseQuery += " ORDER BY created_at DESC";
  
    db.query(baseQuery, params, (err, results) => {
      if (err) return res.status(500).json({ message: "DB error", error: err });
      res.json(results);
    });
  });
  

  router.get("/:id", (req, res) => {
    const mediaId = req.params.id;
    const query = `SELECT * FROM media WHERE id = ?`;
    db.query(query, [mediaId], (err, results) => {
      if (err || results.length === 0) return res.status(404).json({ message: "Not found" });
      res.json(results[0]);
    });
  });


router.get("/creator/:creator_id", (req, res) => {
  const creatorId = req.params.creator_id;
  const query = `SELECT * FROM media WHERE creator_id = ? ORDER BY created_at DESC`;

  db.query(query, [creatorId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", error: err });
    res.json(results);
  });
});


router.put("/update/:id", (req, res) => {
  const mediaId = req.params.id;
  const { title, caption, location } = req.body;

  const query = `UPDATE media SET title = ?, caption = ?, location = ? WHERE id = ?`;

  db.query(query, [title, caption, location, mediaId], (err, result) => {
    if (err) return res.status(500).json({ message: "Update failed", error: err });
    res.json({ message: "Media updated successfully" });
  });
});


  return router;
};
