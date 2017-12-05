import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import TabContainer from './../TabContainer';
import './TextBox.css';

class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHowToUseTabVisible: false
        }
        this.handleClickOnHowToUse = this.handleClickOnHowToUse.bind(this);
    }

    handleClickOnHowToUse() {
        let oldState = this.state.isHowToUseTabVisible
        this.setState({ isHowToUseTabVisible: !oldState })
    }

    handleClickOutside() {
        this.handleClickOnHowToUse();
    }

    render() {
        return (
            <div className="TextBox">
                <div className="TextBox__TextArea">
                    <ul className="Texbx__FontDetails">
                        <li className="FontsDetails__Item FontsDetails__Item--FontFamily">Roboto</li>
                        <li className="FontsDetails__Item FontsDetails__Item--FontVariant">Regular</li>
                        <li className="FontsDetails__Item FontsDetails__Item--FontSize">80px</li>
                    </ul>
                    <textarea placeholder="Write Something ..."></textarea>
                </div>
                <div className="TextBox__CTA">
                    <button type="button">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Compare
                    </button>
                    <button type="button" onClick={this.handleClickOnHowToUse}>
                        <i class="fa fa-code" aria-hidden="true"></i>
                        How to use
                    </button>
                </div>
                {this.state.isHowToUseTabVisible && <TabContainer fontName="Open+Sans" />}
            </div>
        );
    }
}

TextBox.propTypes = {

};

export default enhanceWithClickOutside(TextBox);