import dotenv from 'dotenv';
import OpenAI from 'openai';
import express from 'express';
import mongoose from 'mongoose';
import Image from "./models/Image.js";


dotenv.config();

const api = process.env.OPENAI_API_KEY;
const openai = new OpenAI({apiKey: api});

const app = express();
const PORT = 3000;

app.use(express.json());



//Mongoose configuration
const mongoURI = process.env.MONGO_URI;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(mongoURI, options)
    .then(() => console.log("MongoDB connected succesfully!"))
    .catch((err) => console.error("MongoDB connection error: ",err));



//Route to generate image based on user's prompt
app.post('/generate-image', async(req, res) => {
    const {prompt} = req.body;
    try {
        const image = await openai.images.generate({prompt});
        const imageURL = image.data[0].url;
        res.status(200).json({imageURL});
    } catch(error) {
        console.error("Error generating image:", error);
        res.status(500).json({error: "Error generating image"});
    }
})


//Function to add image to db
const addImageToDatabase = async (imageUrl, prompt) => {
    const image = new Image({imageUrl,prompt });
    try {
        const savedImage = await image.save();
        console.log("Image saved to the database:", savedImage);
    } catch (err) {
        console.error("Error saving image to databse:", savedImage);
    }
}


//Add post function for when user clicks add to library. 



