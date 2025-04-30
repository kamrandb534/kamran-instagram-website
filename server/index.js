const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const db = require("./config/db");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ storage });

const userRoutes = require("./routes/user-routes")(db, upload);
app.use("/api/users", userRoutes);


const mediaRoutes = require("./routes/media-routes");
app.use("/api/media", mediaRoutes(upload, db));

const interactionRoutes = require("./routes/interaction-routes");
app.use("/api/interact", interactionRoutes(db));

app.get("/", (req, res) => {
  res.send("ImageHub Backend API is Running");
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
