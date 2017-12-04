import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import WebFont from 'webfontloader';
import './FontOptionContainer.css'

class FontOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFontFamily: '',
            selectedFontVariant: '',
            displayColorPicker: false,
        }

        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
        this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    }


    handleChangeFontFamily = (selectedFontFamily) => {
        this.setState({ selectedFontFamily });
        this.props.handleChangeFontFamily(selectedFontFamily)
    }

    handleChangeFontVariant = (selectedFontVariant) => {
        console.log(selectedFontVariant)
    }

    render() {
        return (
            <section className="FontOptionContainer">
                <section className="FontOptionContainer__Item">
                    <h4 className="FontOptionContainer__Title">Classification</h4>
                    <ul>
                        {this.props.categories.map((category, index) =>
                            <li key={`${category.name}-${index}`}
                                data-category={category.name}
                                className={`${category.isActive ? "active" : "inactive"}`}
                                onClick={category.handleClickOnCategory}>
                                {category.name}
                            </li>)
                        }
                    </ul>
                </section>
                <section className="FontOptionContainer__Item">
                    <h4 className="FontOptionContainer__Title">Propeties</h4>
                    <Select
                        name="form-field-name"
                        value={this.state.selectedFontFamily}
                        onChange={this.handleChangeFontFamily}
                        options={this.props.fontFamilies}
                        placeholder="Select Font Family"
                    />

                    <Select
                        name="form-field-name"
                        value={this.state.selectedFontVariant}
                        onChange={this.handleChangeFontVariant}
                        options={this.props.fontVariants}
                        placeholder="Select Font Variants"
                    />
                    {/* <select>
                        <option defaultValue="Select Font Family">Select Font Family</option>
                        {
                            this.props.fontFamilies.length > 0 &&
                            this.props.fontFamilies.map((fontFamily, index) => {
                                return <option key={`${fontFamily}-${index}`}
                                    value={fontFamily.family}>
                                    {fontFamily.family}
                                </option>
                            })
                        }
                    </select> */}
                    {/* <select>
                        <option defaultValue="Select Font Family">Select Font Variant</option>
                    </select> */}

                    {/* <div>
                        <div style={styles.swatch} onClick={this.handleClick}>
                            <div style={styles.color} />
                        </div>
                        {this.state.displayColorPicker ? <div style={styles.popover}>
                            <div style={styles.cover} onClick={this.handleClose} />
                            <SketchPicker color={this.state.color} onChange={this.handleChange} />
                        </div> : null}
                    </div>

                    <h1 style={styleObj}>
                        Pankaj
                    </h1> */}
                </section>
            </section>
        );
    }
}

FontOptionContainer.propTypes = {

};

export default FontOptionContainer;