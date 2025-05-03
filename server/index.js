const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const db = require("./config/db");
const webConfig = require("./config/web-config");

dotenv.config();

const app = express();
const PORT = webConfig.server.port;

app.use(cors(webConfig.cors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, webConfig.upload.path)));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, webConfig.upload.path);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});
const upload = multer({ 
  storage,
  limits: webConfig.upload.limits,
  fileFilter: (req, file, cb) => {
    if (webConfig.upload.allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"), false);
    }
  }
});

const userRoutes = require("./routes/user-routes")(db, upload);
app.use(webConfig.routes.users, userRoutes);

const mediaRoutes = require("./routes/media-routes");
app.use(webConfig.routes.media, mediaRoutes(upload, db));

const interactionRoutes = require("./routes/interaction-routes");
app.use(webConfig.routes.interactions, interactionRoutes(db));

app.get("/", (req, res) => {
  res.send(`${webConfig.server.env} - ImageHub Backend API is Running`);
});

app.listen(PORT, () => {
  console.log(`✅ Server running at ${webConfig.server.baseUrl}`);
});