
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import "./Library.css";

interface LibraryProps {
    sessionID: string;
}

interface Image {
    imageURL: string;
    prompt: string;
    sessionID: string;
}

const Library: React.FC<LibraryProps> = ({ sessionID }) => {
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadImages = async () => {
            try {
                const fetchedImages = await fetchImages(sessionID);
                setImages(fetchedImages);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError("Could not fetch images");
                setLoading(false);
            }
        };

        loadImages();
    }, [sessionID]);

    const fetchImages = async (sessionID: string) => {
        if (!sessionID) {
            console.warn("sessionID is not available.");
            return [];
        }
        try {
            const response = await axios.get(`http://localhost:3000/fetch-images?sessionID=${sessionID}`);
            console.log("Library sessionID", sessionID);
            console.log("Fetched images response:", response);

            //If response is an array (ie the library db has images) then return the array
            if (Array.isArray(response.data)) {
                return response.data;
            } else {
                //Return empty array if no images in library db.
                return [];
                
            }
            
        } catch (error) {
            console.error("Error fetching images", error);
            throw new Error("Could not fetch images");
        }
    };

    if (loading) {
        return <div className="loading-message">Loading library...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="library-container">
            <h1 className="library-title">Library Page</h1>
            <div className="library-grid">
                {images.length === 0 ? (
                    <div className="no-images">
                        <p>No images have been added yet to the library</p>
                        <Link to="/create">
                            <button className="create-button">Create</button>
                        </Link>
                    </div>
                ) : (
                    images.map((image, index) => (
                        <div key={index} className="library-item">
                            <img src={image.imageURL} alt={`Generated for ${image.prompt}`} className="library-image" />
                            <p className="image-prompt">{image.prompt}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Library;