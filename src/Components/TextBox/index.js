import React, { Component } from 'react';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import TabContainer from './../TabContainer';
import { getFontWeightAndSyle }from './../../Helper';
import './TextBox.css';

class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHowToUseTabVisible: false
        }
        this.handleClickOnHowToUse = this.handleClickOnHowToUse.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClickOnHowToUse() {
        let oldState = this.state.isHowToUseTabVisible
        this.setState({ isHowToUseTabVisible: !oldState })
    }

    handleClickOutside() {
        this.setState({ isHowToUseTabVisible: false })
    }

    handleClick(){
        this.props.onClick(this.props.dataItem)
    }


    render() {
        const textAreaStyle = {
            fontFamily: `'${this.props.fontName}', sans-serif`,
            fontSize: `${this.props.fontSize}px`,
            fontWeight: getFontWeightAndSyle(this.props.fontVariant).fontWeight,
            fontStyle: getFontWeightAndSyle(this.props.fontVariant).fontStyle,
            color: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`,
        }
        return (
            
            <div className={`${this.props.isActive && "isActive"} TextBox`}>
                <div className="TextBox__TextArea">
                    <ul className="Texbx__FontDetails">
                        <li className="FontsDetails__Item FontsDetails__Item--FontFamily">{this.props.fontFamily}</li>
                        <li className="FontsDetails__Item FontsDetails__Item--FontVariant">{this.props.fontVariant}</li>
                        <li className="FontsDetails__Item FontsDetails__Item--FontSize">{this.props.fontSize}px</li>
                    </ul>
                    <textarea style={textAreaStyle}
                        onClick={this.handleClick}
                        autoFocus={this.props.isActive}
                        placeholder="Write Something ..."></textarea>
                </div>
                <div className="TextBox__CTA">
                    <button type="button" onClick={this.props.handleClickOnCompareBtn}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        Compare
                    </button>
                    <button className="HowToUse" type="button" onClick={this.handleClickOnHowToUse}>
                        <i className="fa fa-code" aria-hidden="true"></i>
                        How to use
                    </button>
                </div>
                {this.state.isHowToUseTabVisible && <TabContainer fontName={this.props.fontName} />}
            </div>
        );
    }
}

TextBox.propTypes = {

};

export default enhanceWithClickOutside(TextBox);