import React, { Component } from 'react';
import _map from 'lodash/map';
import _uniq from 'lodash/uniq';
import _cloneDeep from 'lodash/cloneDeep';
import { fetchGoolgeFonts } from './../../Mapper';
import FontOptionContainer from './../FontOptionContainer';
import TextBox from './../TextBox';
import Loader from './../Loader';
import Header from './../Header';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      googleFonts: [],
      availableCategories: [],
      availableFontFamilies: [],
      availableFontVariants: [],
      selectedFontFamily: "Oswald",
      selectedFontVariant: "Regular",
      selectedFontSize: "40",
      isHideControl: false,
      foreGroundColor: {
        r: '0',
        g: '0',
        b: '0',
        a: '1',
      },
      backGroundColor: {
        r: '255',
        g: '255',
        b: '255',
        a: '1',
      },
    }

    this.handleClickOnCategory = this.handleClickOnCategory.bind(this);
    this.handleChangeFontFamily = this.handleChangeFontFamily.bind(this);
    this.handleChangeFontVariant = this.handleChangeFontVariant.bind(this);
    this.handleChangeFontSize = this.handleChangeFontSize.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleClickOnControlBtn = this.handleClickOnControlBtn.bind(this);
  }

  componentDidMount() {
    fetchGoolgeFonts().then((res) => {
      this.setState({
        googleFonts: res.fonts,
        availableCategories: this.__mappedCategoryArray(res.categories),
        availableFontFamilies: res.fonts["All"]
      })
    });
  }

  __mappedCategoryArray(arr) {
    return arr.map((val) => {
      return ({
        name: val,
        isActive: val === "All" ? true : false,
        handleClickOnCategory: this.handleClickOnCategory,
      })
    })
  }

  handleClickOnCategory(event) {
    let categoryName = event.target.dataset.category;
    let availableCategories = _cloneDeep(this.state.availableCategories);

    availableCategories.map((category) => {
      category.isActive = category.name === categoryName ? true : false;
    });

    this.setState({
      availableCategories,
      availableFontFamilies: this.state.googleFonts[categoryName]
    })
  }

  handleChangeFontFamily(selectedFontFamily) {
    this.setState({
      selectedFontFamily: (selectedFontFamily && selectedFontFamily.value) || "Oswald",
      availableFontVariants: (selectedFontFamily && this.__getVariantsFamilySpecific(selectedFontFamily.value)) || ""
    })
  }

  __getVariantsFamilySpecific(family) {
    let availableFontVariants = _cloneDeep(this.state.availableFontFamilies);
    return availableFontVariants.filter(x => x.value === family)[0].variants;
  }

  handleChangeFontVariant(selectedFontVariant) {
    this.setState({
      selectedFontVariant: selectedFontVariant.value,
    })
  }

  handleChangeColor(color) {
    this.setState({ foreGroundColor: color.rgb })
  }

  handleChangeFontSize(selectedFontSize) {
    this.setState({ selectedFontSize })
  }

  handleClickOnControlBtn() {
    this.setState({ isHideControl: !this.state.isHideControl });
  }

  render() {
    return (
      <div>
        {this.state.googleFonts.length == 0 ? <Loader /> :
          <div className="App">
            <Header className={this.state.isHideControl ? "HideControl" : "ShowControl"} />
            <section className="Wrapper">
              <FontOptionContainer
                categories={this.state.availableCategories}
                fontFamilies={this.state.availableFontFamilies}
                handleChangeFontFamily={this.handleChangeFontFamily}
                fontVariants={this.state.availableFontVariants}
                handleChangeFontVariant={this.handleChangeFontVariant}
                handleChangeFontSize={this.handleChangeFontSize}
                color={this.state.foreGroundColor}
                handleChangeColor={this.handleChangeColor}
                bgColor={this.state.backGroundColor}
                className={this.state.isHideControl ? "HideControl" : "ShowControl"}
              />
              <div className="TexBoxContainer">
                <TextBox fontName={this.state.selectedFontFamily}
                  fontVariant={this.state.selectedFontVariant}
                  fontSize={this.state.selectedFontSize}
                  className={this.state.isHideControl ? "HideControl" : "ShowControl"}
                  color={this.state.foreGroundColor} />
                {/* <TextBox /> */}
              </div>
              <button type="button"
                onClick={this.handleClickOnControlBtn}
                className="App__Btn">
                {this.state.isHideControl ? "Show Control" : "Hide Control"}
              </button>
            </section>
          </div>
        }
      </div>
    );
  }
}

export default App;
