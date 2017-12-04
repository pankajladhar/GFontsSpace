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
            selectedOption: '',
            displayColorPicker: false,
        }

        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
    }


    handleChangeFontFamily = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.handleChangeFontFamily(selectedOption)
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
                        value={this.state.selectedOption}
                        onChange={this.handleChangeFontFamily}
                        options={this.props.fontFamilies}
                        placeholder="Select Font Family"
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