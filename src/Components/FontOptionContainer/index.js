import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css'

import WebFont from 'webfontloader';
import ColorPicker from './../ColorPicker'
import './FontOptionContainer.css'

class FontOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFontFamily: '',
            selectedFontVariant: 'regular',
            disabledFontVarians: true,
            displayForeGroundColorPicker: false,
            displayBackGroundColorPicker: false,
            backGroundColor: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
        }

        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
        this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    }

    handleChangeFontFamily = (selectedFontFamily) => {
        this.setState({ 
            selectedFontFamily,
            disabledFontVarians: selectedFontFamily ==null ? true : false,
            selectedFontVariant: 'regular',
        }, () => {
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
                            clearable={true}
                            placeholder="Select Font Family"
                        />

                        <Select
                            name="FontVariantSelectBox"
                            value={this.state.selectedFontVariant}
                            onChange={this.handleChangeFontVariant}
                            options={this.props.fontVariants}
                            disabled={this.state.disabledFontVarians}
                            clearable={false}
                            backspaceRemoves={false}
                            placeholder="Select Font Variants"
                        />
                        <div className="OtherProperties">
                            <div className="FontSize__Option">
                                <input type="number" name="quantity" min="6" max="248" value="16" />
                            </div>
                            <div className="ColorOption__ForeGround">
                                <ColorPicker color={this.props.color}
                                    handleChangeColor={this.props.handleChangeColor}
                                />
                            </div>
                            <div className="ColorOption__BackGround">
                                <ColorPicker color={this.props.bgColor}
                                    isBackgroundColorPicker
                                />
                            </div>
                        </div>

                    </div>
                </section>
            </section >
        );
    }
}

FontOptionContainer.propTypes = {

};

export default FontOptionContainer;