import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { fetchPublications } from "./scraper.js";

const app = express();
const PORT = 3000;

// __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public"))); // if you have a public folder
app.use("/images", express.static(path.join(__dirname, "images")));

// Serve index.html at root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Serve publication.html at /publications
app.get("/publications", (req, res) => {
  res.sendFile(path.join(__dirname, "publication.html"));
});

// API endpoint to get publications
app.get("/api/publications", async (req, res) => {
  let data;

  if (fs.existsSync("publications.json")) {
    data = JSON.parse(fs.readFileSync("publications.json", "utf-8"));
  } else {
    data = await fetchPublications();
  }

  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running → http://localhost:${PORT}`);
});
