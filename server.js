import dotenv from 'dotenv';
import OpenAI from 'openai';
import express from 'express';
import mongoose from 'mongoose';
import Image from './models/Images.js'; 

dotenv.config();

const api = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apiKey: api});

const app = express();
const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



//Mongoose configuration
const mongoURI = "mongodb://localhost/pixifyDB";
mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.error("MongoDB connection error: ", err));


//Route to generate image based on user's prompt
app.post('/generate-image', async(req, res) => {
    const {prompt} = req.body;
    try {
        const image = await openai.images.generate({prompt});
        const imageURL = image.data[0].url;
        res.status(200).json({imageURL, prompt});
    } catch(error) {
        console.error("Error generating image:", error);
        res.status(500).json({error: "Error generating image"});
    }
})



// Function to add image to database
const addImageToDatabase = async (imageURL, prompt) => {
    const image = new Image({ imageURL, prompt });
    try {
        const savedImage = await image.save();
        console.log("Image saved to the database:", savedImage);
        return savedImage; 
    } catch (error) {
        console.error("Error saving image to database:", error);
    }
}

// Route handler using the helper function
app.post("/save-image", async (req, res) => {
    console.log("Received request to save image:", req.body);

    const { imageURL, prompt } = req.body;

    // Validate fields
    if (!imageURL || !prompt) {
        console.log("Missing imageURL or prompt");
        return res.status(400).json({ error: "Both 'imageURL' and 'prompt' are required." });
    }

    try {
        console.log("Calling addImageToDatabase...");
        const savedImage = await addImageToDatabase(imageURL, prompt); 
        console.log("Image saved successfully:", savedImage);
        res.status(200).json({ message: "Image saved!" });
    } catch (error) {
        console.error("Error in try/catch:", error);
        res.status(500).json({ error: "Error saving image." });
    }
});



