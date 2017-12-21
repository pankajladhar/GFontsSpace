import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';
import GFontsAction from './../../Containers/Actions';
import TabContainer from './../TabContainer';
import { getFontWeightAndSyle } from './../../Helper';
import './TextBox.css';

export class TextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHowToUseTabVisible: false
        }
        this.handleClickOnHowToUse = this.handleClickOnHowToUse.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleClickOnCompareBtn = this.handleClickOnCompareBtn.bind(this);
    }

    handleClickOnCompareBtn(e) {
        e.stopPropagation();
        this.props.addTextBox(this.props.userSelectedTextBox)
    }

    handleClickOnHowToUse() {
        let oldState = this.state.isHowToUseTabVisible
        this.setState({ isHowToUseTabVisible: !oldState })
    }

    handleClickOutside() {
        this.setState({ isHowToUseTabVisible: false })
    }

    handleClick() {
        this.props.changeTextBox(this.props.dataItem)
    }


    render() {
        const textAreaStyle = {
            fontFamily: `'${this.props.fontFamily || "Oswald"}', sans-serif`,
            fontSize: `${this.props.fontSize}px`,
            fontWeight: getFontWeightAndSyle(this.props.fontVariant).fontWeight,
            fontStyle: getFontWeightAndSyle(this.props.fontVariant).fontStyle,
            color: `rgba(${this.props.color.r}, ${this.props.color.g}, ${this.props.color.b}, ${this.props.color.a})`,
        }
        return (

            <div className={`${this.props.isActive && "isActive"} TextBox`}
                onClick={this.handleClick} >
                <div className="TextBox__TextArea">
                    <ul className="Texbx__FontDetails">
                        <li className="FontsDetails__Item FontsDetails__Item--FontFamily">{this.props.fontFamily  || "Oswald"}</li>
                        <li className="FontsDetails__Item FontsDetails__Item--FontVariant">{this.props.fontVariant || "Regular"}</li>
                        <li className="FontsDetails__Item FontsDetails__Item--FontSize">{this.props.fontSize}px</li>
                    </ul>
                    <textarea style={textAreaStyle}
                        autoFocus={this.props.isActive}
                        // onFocus={this.handleClick}
                        placeholder="Write Something ..."></textarea>
                </div>
                <div className="TextBox__CTA">
                    <button type="button" onClick={this.handleClickOnCompareBtn}>
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        Compare
                    </button>
                    <button className="HowToUse" type="button" onClick={this.handleClickOnHowToUse}>
                        <i className="fa fa-code" aria-hidden="true"></i>
                        How to use
                    </button>
                </div>
                {this.state.isHowToUseTabVisible &&
                    <TabContainer fontName={this.props.fontFamily} />}
            </div>
        );
    }
}

TextBox.propTypes = {

};


function mapStateToProps(state) {
    return {
        userSelectedTextBox: state.GFontsReducer.userSelectedTextBox,
        textBoxOption: state.GFontsReducer.textBoxOption,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeTextBox: (activeTextBox) => {
            dispatch(GFontsAction.changeTextBox(dispatch, activeTextBox))
        },
        addTextBox: (activeTextBox) => {
            dispatch(GFontsAction.addTextBox(dispatch, activeTextBox))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(enhanceWithClickOutside(TextBox))
