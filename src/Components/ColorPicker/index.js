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
            displayColorPicker: false,
        }
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ color: nextProps.color })  
    }

    handleOnClick() {
        this.setState({ displayColorPicker: !this.state.displayColorPicker })
    }

    handleOnChange(color) {
        this.setState({ color: color.rgb }, () => {
            if (this.props.isBackgroundColorPicker) {
                document.body.style.backgroundColor = `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`;
            }

            else {
                this.props.handleChangeColor(color)
            }
        })
    }

    handleClickOutside() {
        this.setState({ displayColorPicker: false })
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
                <div className={`${this.state.displayColorPicker ? "is-focused " : ""}ColorPicker__Swatch`} onClick={this.handleOnClick}>
                    <div className="ColorPicker__Color" style={this.__getStyleObject(this.props.isBackgroundColorPicker)}>
                        {!this.props.isBackgroundColorPicker && "A"}
                    </div>
                </div>
                {this.state.displayColorPicker ?
                    <div className="ColorPicker__Popover">
                        <SketchPicker color={this.state.color} onChange={this.handleOnChange} />
                    </div> :
                    null}

            </div>
        );
    }
}

ColorPicker.propTypes = {
    isBackgroundColorPicker: PropTypes.bool,
    handleChangeColor: PropTypes.func
};

export default enhanceWithClickOutside(ColorPicker);