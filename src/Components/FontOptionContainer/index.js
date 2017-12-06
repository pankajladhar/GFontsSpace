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
            displayForeGroundColorPicker: false,
            displayBackGroundColorPicker: false,
            clearable: true,

            foreGroundColor: {
                r: '0',
                g: '0',
                b: '0',
                a: '1',
            },
            backGroundColor: {
                r: '255',
                g: '223',
                b: '1',
                a: '1',
            },
        }

        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
        this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);

        this.handleClickOnForeGroundColorPicker = this.handleClickOnForeGroundColorPicker.bind(this);
        this.handleCloseOnForeGroundColorPicker = this.handleCloseOnForeGroundColorPicker.bind(this);
        this.handleChangeOnForeGroundColorPicker = this.handleChangeOnForeGroundColorPicker.bind(this);

        this.handleClickOnBackGroundColorPicker = this.handleClickOnBackGroundColorPicker.bind(this);
        this.handleCloseOnBackGroundColorPicker = this.handleCloseOnBackGroundColorPicker.bind(this);
        this.handleChangeOnBackGroundColorPicker = this.handleChangeOnBackGroundColorPicker.bind(this);
    }

    handleChangeFontFamily = (selectedFontFamily) => {
        this.setState({ selectedFontFamily }, () => {
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

    handleClickOnForeGroundColorPicker = () => {
        this.setState({ displayForeGroundColorPicker: !this.state.displayForeGroundColorPicker })
    };

    handleCloseOnForeGroundColorPicker = () => {
        this.setState({ displayForeGroundColorPicker: false })
    };

    handleChangeOnForeGroundColorPicker = (color) => {
        this.setState({ foreGroundColor: color.rgb })
    };

    handleClickOnBackGroundColorPicker = () => {
        this.setState({ displayBackGroundColorPicker: !this.state.displayBackGroundColorPicker })
    };

    handleCloseOnBackGroundColorPicker = () => {
        this.setState({ displayBackGroundColorPicker: false })
    };

    handleChangeOnBackGroundColorPicker = (color) => {
        this.setState({ backGroundColor: color.rgb },()=>{
            document.body.style.backgroundColor = `rgba(${this.state.backGroundColor.r}, ${this.state.backGroundColor.g}, ${this.state.backGroundColor.b}, ${this.state.backGroundColor.a})`;
        })
    };

    render() {
        const styles = reactCSS({
            'default': {
                foreGroundColor: {
                    color: `rgba(${this.state.foreGroundColor.r}, ${this.state.foreGroundColor.g}, ${this.state.foreGroundColor.b}, ${this.state.backGroundColor.a})`,
                },
                backGroundColor: {
                    background: `rgba(${this.state.backGroundColor.r}, ${this.state.backGroundColor.g}, ${this.state.backGroundColor.b}, ${this.state.backGroundColor.a})`,
                }
            },
        });
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
                                <div className="ColorOption--Swatch" onClick={this.handleClickOnForeGroundColorPicker}>
                                    <div className="ColorOption--Color" style={styles.foreGroundColor}>
                                        A
                                    </div>
                                </div>
                                {this.state.displayForeGroundColorPicker ?
                                    <div className="ColorOption--Popover">
                                        <div className="ColorOption--Cover" onClick={this.handleCloseOnForeGroundColorPicker} />
                                        <SketchPicker color={this.state.foreGroundColor} onChange={this.handleChangeOnForeGroundColorPicker} />
                                    </div> :
                                    null}

                            </div>

                            <div className="ColorOption__BackGround">
                                <div className="ColorOption--Swatch" onClick={this.handleClickOnBackGroundColorPicker}>
                                    <div className="ColorOption--Color" style={styles.backGroundColor} />
                                </div>
                                {this.state.displayBackGroundColorPicker ?
                                    <div className="ColorOption--Popover">
                                        <div className="ColorOption--Cover" onClick={this.handleCloseOnBackGroundColorPicker} />
                                        <SketchPicker color={this.state.backGroundColor} onChange={this.handleChangeOnBackGroundColorPicker} />
                                    </div> :
                                    null}

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