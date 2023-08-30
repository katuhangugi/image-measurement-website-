const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    filename: (req, file, cb) => {
      const filename =
        file.download (1).jpg + "-" + Date.now() + path.extname(file.download (1).jpg);
      cb(null, filename);
    };
  },
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/upload", upload.single("image"), (req, res) => {
  if (req.file) {
    const imageUrl = "/uploads/" + req.file.filename;
    res.json({ imageUrl });
  } else {
    res.status(400).json({ error: "No file uploaded." });
  }
});

// Store measurement data
const measurements = [];

app.post("/api/measurements", (req, res) => {
  const { width, imageUrl } = req.body;
  const newMeasurement = { width, imageUrl };
  measurements.push(newMeasurement);
  res.json({ message: "Measurement added successfully." });
});

app.get("/api/measurements", (req, res) => {
  res.json(measurements);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
