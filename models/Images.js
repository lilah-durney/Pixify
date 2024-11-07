import mongoose from 'mongoose';


const imageSchema = new mongoose.Schema({
    imageURL: { type: String, required: true },
    prompt: { type: String, required: true },
    sessionID: {type: String, required: true}
  });

const Image = mongoose.model('Image', imageSchema);

export default Image;

