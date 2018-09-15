import React from 'react';
import './Loader.css';

const Loader = () => {
    return (
        <div className="Loader">
            <div className="Loader__Overlay"></div>
            <div className="Loader__Wrapper">
                <div className="Loader__section"></div>
                <div className="Loader__section"></div>
                <div className="Loader__section"></div>
                <div className="Loader__section"></div>
            </div>
        </div>
    );
}

export default Loader;
