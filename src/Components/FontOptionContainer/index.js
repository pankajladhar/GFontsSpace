import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import _map from 'lodash/map';
import 'react-select/dist/react-select.css'

import WebFont from 'webfontloader';
import ColorPicker from './../ColorPicker'
import './FontOptionContainer.css'

class FontOptionContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedFontFamily: '',
            selectedFontVariant: '',
            selectedFontSize: '',
            disabledFontVarians: true,
            displayForeGroundColorPicker: false,
            displayBackGroundColorPicker: false,
            color: "",
            backGroundColor: {
                r: '255',
                g: '255',
                b: '255',
                a: '1',
            },
        }

        this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
        this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
        this.handleChangeFontSize = this.handleChangeFontSize.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            color: nextProps.color,
            selectedFontSize: nextProps.fontSize
        })
    }

    componentDidMount(){
        this.setState({
            color: this.props.color,
            selectedFontSize: this.props.fontSize
        })
    }

    handleChangeFontFamily(selectedFontFamily) {
        this.setState({
            selectedFontFamily,
            disabledFontVarians: selectedFontFamily == null ? true : false,
            selectedFontVariant: 'regular',
        });
        this.props.handleChangeFontFamily(selectedFontFamily);


        setTimeout(() => {
            let fontToBeLoader =  `${selectedFontFamily.value}:${_map(this.props.fontVariants, "label").toString()}`
            selectedFontFamily && WebFont.load({
                google: {
                    families: [fontToBeLoader]
                }
            });
        }, 0);
    }

    handleChangeFontVariant(selectedFontVariant) {
        this.setState({ selectedFontVariant });
        this.props.handleChangeFontVariant(selectedFontVariant)
    }

    handleChangeFontSize(event) {
        this.props.handleChangeFontSize(event.target.value)
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
                            <div className="FontSize__Option OtherProperties__Option">
                                <label>Font size</label>
                                <input type="number"
                                    name="quantity"
                                    min="9"
                                    max="248"
                                    onChange={this.handleChangeFontSize}
                                    value={this.state.selectedFontSize} />
                            </div>
                            <div className="ColorOption__ForeGround OtherProperties__Option">
                                <label>Text Color</label>
                                <ColorPicker color={this.state.color}
                                    handleChangeColor={this.props.handleChangeColor}
                                />
                            </div>
                            <div className="ColorOption__BackGround OtherProperties__Option">
                                <label>Background Color</label>
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