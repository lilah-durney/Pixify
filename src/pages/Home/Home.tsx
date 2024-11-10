
import "./Home.css";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Pixify</h1>

            <div className="home-buttons">
                <Link to="/create" className="home-create-button">Create</Link>
                <Link to="/library" className="home-library-button">Library</Link>
            </div>
        </div>
    );
};

export default Home;
