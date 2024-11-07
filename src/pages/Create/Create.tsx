import React from 'react';
// import "/Create.css"
import axios from 'axios';
import {useState} from 'react';


interface CreateProps {
    sessionID: string;
}


const Create: React.FC<CreateProps> = ({sessionID}) => {
    const [prompt, setPrompt] = useState('');
    const [imageURL, setImageURL] = useState('');
    // const [error, setError] = useState('');
    
    //Update the "prompt" state as the user types into the input field. 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }


    const handleSubmit = async(e: React.FormEvent) => {
        console.log("Prompt to be submitted:", prompt);
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/generate-image', {prompt});
        
           
            console.log("Response from server:", response);
            const generatedImageURL = response.data.imageURL;

            setImageURL(generatedImageURL);
            console.log('Image generated successfully:', generatedImageURL);
        
        } catch(error) {
            console.error("Error generating image:", error);
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
        <div>
              {/* Form for entering prompt */}
            <form onSubmit ={handleSubmit}>
                <label htmlFor = "prompt">Enter prompt: </label>
                {/* Input field for prompt */}
                <input 
                type='text'
                id = 'prompt'
                value = {prompt}
                onChange={handleInputChange}
                placeholder = "Enter prompt here"/>

                <div className = "create-buttons">
                        <button type = "submit">Create</button>
            
                </div>
            </form>


            {/* Only render img (or alt descpiption) and Add to library if image as been generated.*/}
            {imageURL && 
                <div className = "generated-image">
                    <img src={imageURL} alt="Generated image from prompt" />
                </div>
            
            }

            {/* Add prompt and image to database library.  */}
            {imageURL && 
                <div className = "add-to-lib-button">
                    <button onClick={addToLibrary}>Add to Library</button>
                    
            </div>}




        </div>

        
    );
 };

 export default Create;

