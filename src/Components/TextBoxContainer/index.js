import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './TextBoxContainer.css';
import TextBox from './../TextBox';

class TextBoxContainer extends Component {
    render() { 
        return (
            <div className="TextBoxContainer">
                {this.props.textBoxes.map((item, index) => {
                    return (
                        <div key={`index-${index}`}>
                            <TextBox {...item}  
                                dataItem={index} />
                        </div>
                    )
                })}
            </div>
        );
    }
}

TextBoxContainer.propTypes = {

};

export default TextBoxContainer;