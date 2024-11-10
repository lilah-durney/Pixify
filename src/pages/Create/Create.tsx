import React from 'react';
import "./Create.css"
import axios from 'axios';
import {useState} from 'react';


interface CreateProps {
    sessionID: string;
}


const Create: React.FC<CreateProps> = ({sessionID}) => {
    console.log("CreateSessionID:", sessionID);
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState('');
    
    //Update the "prompt" state as the user types into the input field. 
    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setPrompt(e.target.value);
    // }


    const handleSubmit = async(e: React.FormEvent) => {
        console.log("Prompt to be submitted:", prompt);
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/generate-image', {prompt});
            setLoading(false);
        
           
            console.log("Response from server:", response);
            const generatedImageURL = response.data.imageURL;

            setImageURL(generatedImageURL);
            console.log('Image generated successfully:', generatedImageURL);
        
        } catch(error) {
            console.error("Error generating image:", error);
            setLoading(false);
        }
    }

    const addToLibrary = async(e: React.FormEvent) => {
        console.log("Going to try saving image and prompt to library");
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/save-image', {imageURL, prompt, sessionID});
            console.log(response.data);
        } catch(error) {
            console.error("Error saving image", error);
        }


    }
    



    return (
        <div className="create-container">
            <textarea
                className="prompt-box"
                placeholder="Enter prompt here..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={5}
                cols={50}
            ></textarea>
    
            <button onClick={handleSubmit} className="generate-button">
                Create
            </button>
    
            {/* Show loading spinner if generating image */}
            {loading && <div className="loading-spinner"></div>}
    
            {/* Only show the generated image and 'Add to Library' button if imageURL exists */}
            {imageURL && !loading && (
                <div className="generated-image">
                    <img src={imageURL} alt="Generated image from prompt" />
                </div>
            )}
    
            {imageURL && !loading && (
                <div className="add-to-lib-button">
                    <button onClick={addToLibrary} className="add-to-library-button">
                        Add to Library
                    </button>
                </div>
            )}
        </div>
    );
    
    
    
 };

 export default Create;

