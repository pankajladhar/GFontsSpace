import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css'

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
            clearable: true,
        }

        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
        this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    }

    handleChangeFontFamily = (selectedFontFamily) => {
        this.setState({ selectedFontFamily },()=>{
            selectedFontFamily && WebFont.load({
                google: {
                    families: [selectedFontFamily.value]
                }
            });
        });
        this.props.handleChangeFontFamily(selectedFontFamily)
    }

    handleChangeFontVariant = (selectedFontVariant) => {
        this.setState({ selectedFontVariant });
        this.props.handleChangeFontVariant(selectedFontVariant)
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
                    <div className="FontOptionContainer__Properties">
                        <Select
                            name="FontFamilySelectBox"
                            value={this.state.selectedFontFamily}
                            onChange={this.handleChangeFontFamily}
                            options={this.props.fontFamilies}
                            clearable={this.state.clearable}
                            placeholder="Select Font Family"
                        />

                        <Select
                            name="FontVariantSelectBox"
                            value={this.state.selectedFontVariant}
                            onChange={this.handleChangeFontVariant}
                            options={this.props.fontVariants}
                            clearable={this.state.clearable}
                            placeholder="Select Font Variants"
                        />
                        <div className="OtherProperties">
                            <div className="FontSize__Option">
                                <input type="number" name="quantity" min="6" max="248" value="16" />
                            </div>
                            <div className="ColorOption__ForeGround">
                                A
                            </div>

                            <div className="ColorOption__BackGround"></div>
                        </div>
                        
                    </div>
                </section>
            </section>
        );
    }
}

FontOptionContainer.propTypes = {

};

export default FontOptionContainer;