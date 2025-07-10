const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/kgen");
app.use(express.json());
app.use(cors());

const imageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  previewImage: { type: String, required: true }, // This will store the URL of the uploaded image
  tags: { type: [String], required: true },
  html: { type: String, default: "" },
});
const Image = mongoose.model("images", imageSchema);

app.post("/createimage", async (req, res) => {
  const { imageUrl, fileName, id } = req.body;
  console.log("imageUrl", imageUrl);
  try {
    if (!imageUrl || !fileName || !id) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const existingImage = await Image.findOne({ id: id });

    if (!existingImage) {
      return res.status(404).json({ error: "Image with given ID not found" });
    }
    existingImage.previewImage = imageUrl;
    console.log("existingImage", existingImage);
    await existingImage.save();
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(`Error uploading images: ${error}`);
    res.status(500).json({ error: error.message });
  }
});

app.post("/templates", async (req, res) => {
  try {
    const templates = await Image.find({});
    res.status(200).json(templates);
  } catch (error) {
    console.error(`Error fetching images: ${error}`);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
