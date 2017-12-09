import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

class Loader extends Component {
    render() {
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
}

Loader.propTypes = {

};

export default Loader;