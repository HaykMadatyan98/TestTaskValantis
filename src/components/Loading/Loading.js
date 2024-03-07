import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="loading-container" role="status" aria-label="Loading">
            <div className="loading-spinner"></div>
        </div>
    );
};

export default Loading;
