import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import enhanceWithClickOutside from 'react-click-outside';
import './ColorPicker.css';

class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            displayColorPicker: false
        }
        this.handOnClick = this.handOnClick.bind(this);
        this.handOnChange = this.handOnChange.bind(this);
        this.handOnClose = this.handOnClose.bind(this);
    }

    handOnClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handOnChange(color) {
        this.setState({ color: color.rgb },()=>{
            if(this.props.isBackgroundColorPicker )
            document.body.style.backgroundColor = `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`;
        })
        // this.props.handOnChange()
    }

    handleClickOutside() {
        this.setState({ displayColorPicker: false })
    }

    handOnClose() {
    }

    __getStyleObject(isBackgroundColorPicker) {
        const colorObject = {
            color: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        };

        const backGroundObject = {
            backgroundColor: `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`,
        };

        return isBackgroundColorPicker ? backGroundObject : colorObject

    }

    render() {
        return (
            <div className="ColorPicker">
                <div className="ColorPicker__Swatch" onClick={this.handOnClick}>
                    <div className="ColorPicker__Color" style={this.__getStyleObject(this.props.isBackgroundColorPicker)}>
                        {!this.props.isBackgroundColorPicker && "A"}
                    </div>
                </div>
                {this.state.displayColorPicker ?
                    <div className="ColorPicker__Popover">
                        <SketchPicker color={this.state.color} onChange={this.handOnChange} />
                    </div> :
                    null}

            </div>
        );
    }
}

ColorPicker.propTypes = {

};

export default enhanceWithClickOutside(ColorPicker);