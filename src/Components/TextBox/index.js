import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextBox.css';

class TextBox extends Component {
    render() {
        return (
            <div className="TextBox">
                <ul className="Texbx__FontDetails">
                    <li className="FontsDetails__Item FontsDetails__Item--FontFamily">Roboto</li>
                    <li className="FontsDetails__Item FontsDetails__Item--FontVariant">Regular</li>
                    <li className="FontsDetails__Item FontsDetails__Item--FontSize">80px</li>
                </ul>
                <textarea>
                        Write Something ...
                </textarea>
            </div>
        );
    }
}

TextBox.propTypes = {

};

export default TextBox;