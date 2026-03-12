import './Loader.css';

// Loading student in the starting
const Loader = () => {
    return (
        <div className="loader-overlay">
            <div className="loader-container">
                <p className='loader-text'>Loading Students....</p>
            </div>
        </div>
    );
}

export default Loader;
