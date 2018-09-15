import React from 'react';
import PropTypes from 'prop-types';
import './TextBoxContainer.css';
import TextBox from './../TextBox';

const TextBoxContainer = (props) => {
    return (
        <div className="TextBoxContainer">
            {props.textBoxes.map((item, index) => {
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

TextBoxContainer.propTypes = {
    textBoxes: PropTypes.array
};

export default TextBoxContainer;
